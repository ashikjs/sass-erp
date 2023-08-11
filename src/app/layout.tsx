import React from "react";
import dynamic from "next/dynamic";

export default function Layout({children}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}

// export default dynamic(() => Promise.resolve(RootLayout), {ssr: false});
