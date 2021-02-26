import React from 'react';
import { Button } from './index.js';


export default {
    title: "Button",
    component: Button
}

const Template = (args) => <Button  {...args} />;


export const  ButtonStory = Template.bind({})

ButtonStory.args = {
    label: 'Hello',
    type: "primary"
}