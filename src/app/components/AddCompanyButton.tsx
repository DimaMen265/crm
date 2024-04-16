"use client";

import React, { useState } from "react";
import Button from "./Button";
import dynamic from "next/dynamic";

const CompanyFormModal = dynamic(() => import("./CompanyFormModal"), {
    ssr: false
});

export default function AddCompanyButton() {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button onClick={() => setShow(true)}>Add company</Button>
            <CompanyFormModal
                onSubmit={console.log}
                show={show}
                onClose={() => setShow(false)}
            />
        </>
    )
}
