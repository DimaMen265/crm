import { headers } from "next/headers";
import React from "react";

export interface ServerComponentCopyProps {
    children?: React.ReactNode;
};

export default function ServerComponentCopy({ children }: ServerComponentCopyProps) {
    console.log("Server Component Copy");
    console.log(headers());
    return (
        <div>
            <span>Server Component Copy</span>
            {children}
        </div>
    );
};
