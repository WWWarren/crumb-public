import styled from 'styled-components';

const Row = styled.div`
  background: ${props => props.background || "none"};
  display: ${props => props.display || "flex"};
  flex-direction: ${props => props.flexDirection || "row"};
  justify-content: ${props => props.justifyContent || "space-between"};
  width: ${props => props.width || "auto"};
`;

export default Row;
