import React, { PropsWithChildren } from "react";

const layout = (props: PropsWithChildren) => {
  return <main>{props.children}</main>;
};

export default layout;
