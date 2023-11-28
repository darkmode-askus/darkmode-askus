import React from "react";

// Basic page with text
const BasicPage = ({ text }) => (
    <div className={"d-flex justify-content-center"}>
        <h1 className={"p-5"}>{text}</h1>
    </div>
);

export default BasicPage;