// import * as React from 'react';
import path from 'path';
import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import manifestHelpers from 'express-manifest-helpers';
import bodyParser from 'body-parser';
import paths from '../../config/paths';
// import { configureStore } from '../shared/store';
import errorHandler from './middleware/errorHandler';
import serverRenderer from './middleware/serverRenderer';
import addStore from './middleware/addStore';
import webhookVerification from './middleware/webhookVerification';
import { i18nextXhr, refreshTranslations } from './middleware/i18n';
const { default: ParseServer, ParseGraphQLServer } = require('parse-server');

require('dotenv').config();

const app = express();
// const app = express.default();

// Use Nginx or Apache to serve static assets in production or remove the if() around the following
// lines to use the express.static middleware to serve assets for production (not recommended!)
// if (process.env.NODE_ENV === 'development') {
app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)));
// }

app.use(cors());

const parseServer = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
    cloud: './src/server/cloud/main.js', // Absolute path to your Cloud Code
    appId: 'myAppId',
    restApiKey: 'myRestApiKey',
    masterKey: 'myMasterKey', // Keep this key secret!
    fileKey: 'optionalFileKey',
    graphQLSchema: './src/server/cloud/schema.graphql',
    serverURL: 'http://localhost:1337/parse', // Don't forget to change to https if needed
});

app.use(bodyParser.json());

// Serve the Parse API on the /parse URL prefix
const parseGraphQLServer = new ParseGraphQLServer(parseServer, {
    graphQLPath: '/graphql',
    playgroundPath: '/playground',
});

app.use('/parse', parseServer.app); // (Optional) Mounts the REST API
parseGraphQLServer.applyGraphQL(app); // Mounts the GraphQL API
parseGraphQLServer.applyPlayground(app); // (Optional) Mounts the GraphQL Playground - do NOT use in Production

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/locales/refresh', webhookVerification, refreshTranslations);

// It's probably a good idea to serve these static assets with Nginx or Apache as well:
app.get('/locales/:locale/:ns.json', i18nextXhr);

app.use(addStore);

const manifestPath = path.join(paths.clientBuild, paths.publicPath);

app.use(
    manifestHelpers({
        manifestPath: `${manifestPath}/manifest.json`,
    })
);

// Serve SSR pages
app.use(serverRenderer());

app.use(errorHandler);

app.listen(process.env.PORT || 1337, () => {
    console.log(
        `[${new Date().toISOString()}]`,
        chalk.blue(`App is running: http://localhost:${process.env.PORT || 1337}`)
    );
});

export default app;
