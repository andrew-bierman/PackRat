import { FC } from 'react';
import { Heading, HeadingProps } from 'tamagui';

type RHeaderProps = {};
type RHeaderPropsBase = RHeaderProps & HeadingProps;

const RHeader: FC<RHeaderPropsBase> = (props) => {
  return <Heading {...props}>{props.children}</Heading>;
};

export default RHeader;
