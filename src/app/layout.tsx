import React from "react";
import {Providers} from "./providers";

export default function Layout({children}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Providers>
        {children}
      </Providers>
    </>
  )
}

// export default dynamic(() => Promise.resolve(RootLayout), {ssr: false});
