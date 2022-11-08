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
  FlexGrowProps,
  FlexProps
} from 'styled-system';

interface BoxProps
  extends SpaceProps,
    ColorProps,
    TypographyProps,
    LayoutProps,
    FlexProps,
    FlexGrowProps,
    BorderProps {}

export const Box = styled.div<BoxProps>`
  ${typography};
  ${space};
  ${color};
  ${layout}
  ${border}
  ${flexbox}
`;
