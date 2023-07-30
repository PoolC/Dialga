import React, { PropsWithChildren } from "react";
import { Block, WhiteBlock } from "../../../styles/common/Block.styles"

export const RoomSchedules = (props: PropsWithChildren<unknown> ) => {
  const { children } = props;

  return (
    <Block>
      <WhiteBlock>
        {children}
      </WhiteBlock>
    </Block>
  )
}