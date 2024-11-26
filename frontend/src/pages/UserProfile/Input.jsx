import React from "react";

const Input = ({ label, type = "text", value, onChange, name }) => (
    <div className="mb-2">
        <label className="block mb-1 text-pageBannerBGC">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="border p-2 w-full"
            /* required={
                name === "password" || name === "confirmPassword" ? true : false
            } */
        />
    </div>
);

export default Input;
