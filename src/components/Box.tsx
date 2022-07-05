import styled from 'styled-components';
import {
  typography,
  space,
  color,
  layout,
  flexbox,
  LayoutProps,
  SpaceProps,
  ColorProps,
  TypographyProps,
  FlexProps
} from 'styled-system';

interface BoxProps
  extends SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps,
    FlexProps {}

export const Box = styled.div<BoxProps>`
  ${typography};
  ${space};
  ${color};
  ${layout}
  ${flexbox}
`;
