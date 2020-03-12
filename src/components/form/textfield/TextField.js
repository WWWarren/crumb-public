import React from 'react';
import styled from 'styled-components';

const TextFieldWrapper = styled.input`
  padding: 5px;
  margin-bottom: 5px;
  height: ${props => props.height || 'auto'};
  width: 100%;
  border: 2px solid grey;
  background: #f3f3f3;
  color: #333;
`;

const Label = styled.span`
  font-size: 10px;
  color: #333;
`;

const TextField = ({
  input,
  labelText,
  placeholder,
  type,
  min,
  max,
  required,
  showRequiredField
}) => (
  <div>
    {
      labelText &&
        <Label>
          {labelText}
          {showRequiredField ? '*' : ''}
        </Label>
    }
    {
      type === 'email' &&
      <TextFieldWrapper
        {...input}
        type='email'
        placeholder={placeholder}
        required={required}
      />
    }
    {
      type === 'password' &&
      <TextFieldWrapper
        {...input}
        type='password'
        placeholder={placeholder}
        required={required}
      />
    }
    {
      type === 'number' &&
      <TextFieldWrapper
        {...input}
        type='number'
        min={min}
        max={max}
        placeholder={placeholder}
        required={required}
      />
    }
    {
      !type &&
      <TextFieldWrapper
        {...input}
        placeholder={placeholder}
        required={required}
      />
    }
  </div>
)

export default TextField;
