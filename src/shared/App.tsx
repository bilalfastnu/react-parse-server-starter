// import React, { Suspense } from 'react';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import favicon from '../shared/assets/favicon.png';
import { ReactComponent as ReactLogo } from './assets/react.svg';
import { ReactComponent as ParseLogo } from './assets/parse-server.svg';
import Home from './pages/Home';
import Login from './pages/Login';
import Page2 from './pages/Page-2';
import routes from './routes';
import css from './App.module.css';

// Does not yet work with server side rendering:
// const Home = React.lazy(() => import('./pages/Home'));
// const Page1 = React.lazy(() => import('./pages/Page-1'));
// const Page2 = React.lazy(() => import('./pages/Page-2'));

const App: React.FC<any> = () => {
    // const { t } = useTranslation();
    const title = 'React SSR - ParseServer - Starter';
    return (
        // <Suspense fallback={<div>Loading</div>}>
        <div className={css.wrapper}>
            <Helmet
                defaultTitle={title}
                titleTemplate={title}
                link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
            />

            <div className={css.headerLogos}>
                <ReactLogo className={css.reactLogo} />
                <span> + </span>
                <ParseLogo className={css.parseLogo} />
            </div>
            <h1 className={css.title}>React SSR and Parse Server Setup</h1>

            <Switch>
                <Route exact path={routes.home} component={Home} />
                <Route exact path={routes.login} component={Login} />
                <Route exact path={routes.page2} component={Page2} />
                <Route render={() => '404!'} />
            </Switch>
        </div>
        // </Suspense>
    );
};

export default App;
