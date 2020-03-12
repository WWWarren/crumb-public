import styled from 'styled-components';

const PrimaryButton = styled.button`
  display: flex;
  padding: 10px 15px;
  height: ${props => props.height || 'auto'};
  width: ${props => props.width || 'auto'};
  background: none;
  border: ${props => props.border || '2px solid #C5C5C5'};
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.2s;
  align-items: center;

  &:hover {
    cursor: pointer;
    color: #C5C5C5;
    background: #242331;
  }
`;

export const SecondaryButton = styled.button`
  display: flex;
  padding: 10px 15px;
  height: ${props => props.height || 'auto'};
  width: ${props => props.width || 'auto'};
  background: #242331;
  color: #C5C5C5;
  border: 2px solid #C5C5C5;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.2s;
  align-items: center;

  &:hover {
    cursor: pointer;
    color: #242331;
    background: #C5C5C5;
  }
`;

export default PrimaryButton;
