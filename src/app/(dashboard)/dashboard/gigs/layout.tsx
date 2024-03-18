import React, { PropsWithChildren } from "react";
import MaxWidthWrapper from "../_components/max-width-wrapper";

type Props = {};

const layout = (props: PropsWithChildren) => {
  return <MaxWidthWrapper>{props.children}</MaxWidthWrapper>;
};

export default layout;
