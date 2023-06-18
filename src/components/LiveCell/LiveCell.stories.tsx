
import React from 'react';
import LiveCell from "./LiveCell";

export default {
    title: 'UI/LiveCell',
    component: LiveCell,
}

const Template = (arg) => {
	return <LiveCell {...arg}/>;
};

export const Default = Template.bind({});

Default.args = {
	x: 2,
	y: 2,
	status: false
};
