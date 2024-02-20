import React, { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen items-center justify-center">
      {props.children}
    </main>
  );
};

export default Layout;
