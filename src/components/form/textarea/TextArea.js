import React from 'react';
import styled from 'styled-components';

const TextAreaWrapper = styled.textarea`
  padding: 5px;
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

const TextArea = ({ input, labelText, placeholder }) => (
  <div>
    {
      labelText &&
        <Label>
          {labelText}
        </Label>
    }
    <TextAreaWrapper {...input} placeholder={placeholder} />
  </div>
)

export default TextArea;
