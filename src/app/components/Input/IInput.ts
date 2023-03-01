import React from 'react';

interface IInput {
  value?: string;
  onChange?:any;
  onBlur?:any;
  clickBeforeInput?:boolean;
  clickBeforeInputText?:string;
  placeholder:string;
  insideButton?:boolean;
  insideButtonText?:string;
  insideButtonClick?: React.MouseEventHandler;
}

export default IInput;
