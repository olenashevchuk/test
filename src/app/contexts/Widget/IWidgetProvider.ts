import React from 'react';

interface IWidgetProvider {
  children: React.ReactElement | React.ReactElement[] | string;
  initialScreen: string
}

export default IWidgetProvider;
