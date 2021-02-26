import React from 'react';
import  Content from './Content.template';

export default {
    title: "Content",
    component: Content
}


const Template = (args) => <Content {...args} />;


export const  ContentStory = Template.bind({})

ContentStory.args = {}