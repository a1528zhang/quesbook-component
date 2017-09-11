export let QB_COMPONENT_API_URL = 'https://stg.quesbook.com';
export let QB_COMPONENT_GQL_URL = `${QB_COMPONENT_API_URL}/graphql`;
// export const GQL_URL = 'http://localhost:8080/graphql';
export const TOKEN_KEY = 'jwt';

export const NAV_ITEM_LIST = [
    {
        label: 'Getting started',
        href: '/start'
    }, {
        label: 'Study plan',
        href: '/studyplan',
    }, {
        label: 'Practice questions',
        href: '/practicequestions'
    }, {
        label: 'Articles',
        href: '/articles'
    }, {
        label: 'Simulation',
        href: '/simulation'
    }
];
