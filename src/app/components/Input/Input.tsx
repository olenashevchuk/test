import Button from '../Button';
import IInput from './IInput';
import React from 'react';
import Title from '../Title';

// How to use this component :
// <Input
//   clickBeforeInput - create cover label on input if needed (without it - common input)
//   clickBeforeInputText="Call me back" - text on input cover label
//   placeholder="Type yours number here..."
//   insideButton - add action button inside input
//   insideButtonText="Call me" - text on action button
//   insideButtonClick={() => console.log('click')} - action on action button inside input
// />

const Input: React.FC<IInput> = ({
  value,
  onChange,
  onBlur,
  clickBeforeInput,
  clickBeforeInputText = 'Input inside',
  insideButton,
  insideButtonText = 'click',
  insideButtonClick,
  placeholder = 'Please input info here...',
}) => (
  <div>
    <input className="c-checkbox" type="checkbox" id="checkbox" />
    <div className="c-formContainer">
      <form className="c-form relative w100">
        <input
          onBlur={onBlur}
          className="c-form__input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {insideButton ? (<Button onClick={insideButtonClick}>{insideButtonText}</Button>) : null}
        {clickBeforeInput ? (
          <label className="c-form__toggle fw-title w100" htmlFor="checkbox">
            <Title size="h6">{clickBeforeInputText}</Title>
          </label>
        ) : null}

      </form>
    </div>
  </div>
);
export default Input;
