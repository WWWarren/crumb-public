import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || "row"};
  justify-content: ${props => props.justifyContent || "flex-start"};
  align-items: ${props => props.alignItems || "initial"};
  width: 100%;
  height: ${props => props.height || "auto"};
`;

export default Container;
