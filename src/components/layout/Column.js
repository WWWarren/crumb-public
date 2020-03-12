import styled from 'styled-components';

const Column = styled.div`
  display: flex;
  flex: ${props => props.flex || "1"}; 
`;

export default Column;
