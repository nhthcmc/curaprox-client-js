import React, { useEffect } from "react";

export default function BackHome() {
    useEffect(() => {
        window.location.href = '/'
    }, [])
    return (
        <div>BackHome</div>
    )
}