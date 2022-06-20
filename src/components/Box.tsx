import styled from 'styled-components';
import {
  typography,
  space,
  color,
  layout,
  LayoutProps,
  SpaceProps,
  ColorProps,
  TypographyProps
} from 'styled-system';

interface BoxProps
  extends SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps {}

export const Box = styled.div<BoxProps>`
  ${typography};
  ${space};
  ${color};
  ${layout}
`;
