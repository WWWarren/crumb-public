import React from 'react';
import styled from 'styled-components';

const RadioWrapper = styled.input`
  display: flex;
  padding: 10px;
  height: ${props => props.height || 'auto'};
  width: ${props => props.width || 'auto'};
`;

const RadioLabel = styled.h3`
  font-size: 1rem;
`;

const Radio = ({ input, label }) => (
  <>
    <RadioLabel>
      {label}
    </RadioLabel>
    <RadioWrapper
      type="radio"
      {...input}
    />
  </>
)

export default Radio;
