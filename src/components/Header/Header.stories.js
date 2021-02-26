import React from 'react';
import  Header  from './Header.template';

export default {
    title: "Header",
    component: Header
}


const Template = (args) => <Header {...args} />;

export const  HeaderStory = Template.bind({})

HeaderStory.args = {}