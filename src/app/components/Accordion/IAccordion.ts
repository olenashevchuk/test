import React from 'react';

interface IAccordion {
  id:string;
  title: string;
  subtitle: string;
  extraInfo: string;
  tabIndex: number;
  onClick: any;
  isCollapsed:boolean;
  children: React.ReactElement | React.ReactElement[] | string;
}

export default IAccordion;
