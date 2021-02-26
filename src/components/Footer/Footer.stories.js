import React from 'react';
import  Footer  from './Footer.template';


export default {
    title: "Footer",
    component: Footer
}


const Template = (args) => <Footer {...args} />;

export const  FooterStory = Template.bind({})

FooterStory.args = {}