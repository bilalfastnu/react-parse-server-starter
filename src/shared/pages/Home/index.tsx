import React from 'react';
import Features from 'components/Features';
// import { useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import { setLocale } from 'store/app/actions';
// import { Locale } from 'store/app/types';

const App: React.FC<any> = () => {
    // const { t } = useTranslation();
    // const dispatch = useDispatch();
    // const handleLocaleChange = useCallback(
    //     (e: React.FormEvent<HTMLButtonElement>) => {
    //         dispatch(setLocale(e.currentTarget.value as Locale));
    //     },
    //     [dispatch]
    // );

    return (
        <React.Fragment>
            {/*<h2>{t('i18n-example')}</h2>*/}
            <Features />
        </React.Fragment>
    );
};

export default App;
