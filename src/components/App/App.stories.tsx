
import React from 'react';
import App from "./App";

export default {
    title: 'UI/App',
    component: App,
}

const Template = (arg) => {
    return <App {...arg}/>;
};

export const Default = Template.bind({});

