import styled from 'styled-components';

const Block = styled.div`
  display: ${props => props.display || 'flex'};
  justify-content: ${props => props.justifyContent || 'center'};
  align-items: ${props => props.alignItems || 'center'};

  height: ${props => props.height || 'auto'};
  width: ${props => props.width || 'auto'};

  margin: ${props => props.margin || '0'};
  padding: ${props => props.padding || '0'};

  background: ${props => props.background || 'auto'};
  color: ${props => props.color || '#333'};
`;

export default Block;
