
import React from 'react';
import LiveField from "./LiveField";

export default {
    title: 'UI/LiveField',
    component: LiveField,
}

const Template = (arg) => {
	return <LiveField {...arg}/>;
};

export const Default = Template.bind({});

Default.args = {
	width: 20,
	height: 10,
	status: "start"
};
