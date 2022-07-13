import styled from 'styled-components';
import {
  typography,
  space,
  color,
  layout,
  flexbox,
  border,
  BorderProps,
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
    FlexProps,
    BorderProps {}

export const Box = styled.div<BoxProps>`
  ${typography};
  ${space};
  ${color};
  ${layout}
  ${border}
  ${flexbox}
`;
