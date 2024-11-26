import React from "react";
import { ChevronDown } from "lucide-react";
import Form from "./Form";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { formatKey } from "../../utils/formatKey";

const UserProfileSection = ({
    sectionId,
    title,
    formData,
    fields,
    dispatchSectionForm,
}) => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <div>
            <div
                className={`flex justify-between bg-[#F6F6F6] my-4 p-6 ${
                    dropdown ? "border-b-2" : ""
                }`}
            >
                <p>{formatKey(title)}</p>
                <div className="flex gap-2">
                    <p>Show details</p>
                    <button onClick={() => setDropdown((prev) => !prev)}>
                        <ChevronDown />
                    </button>
                </div>
            </div>
            <div className={`${dropdown ? "" : "hidden"}`}>
                <Form
                    sectionId={sectionId}
                    fields={fields}
                    formData={formData}
                    dispatchSectionForm={dispatchSectionForm}
                />
            </div>
        </div>
    );
};

export default UserProfileSection;
