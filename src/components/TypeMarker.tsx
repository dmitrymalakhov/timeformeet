import styled from 'styled-components';
import { TMarkerProps } from '../types';

export const TypeMarker = styled.div<TMarkerProps>`
  background: ${(props) => props.color || '#b2b2b2'};
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background-clip: padding-box;
  border: solid 2px #fff;
  border-radius: 50%;
`;
