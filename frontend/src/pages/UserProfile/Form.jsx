/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Input from "./Input";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../components/Button/Button";
import { formatKey } from "../../utils/formatKey";
import { updateUserAddress } from "../../utils/addressUtils/updateUserAddress";
import { addAddress } from "../../utils/addressUtils/addAddres";
import { updateUser } from "../../utils/userUtils/updateUser";
import { AppContext } from "../../context/AppProvider.jsx";

const Form = ({ sectionId, fields, formData, dispatchSectionForm }) => {
    const [showPassword, setShowPassword] = useState({});
    const [sectionFormData, setSectionFormData] = useState(formData);
    const [editMode, setEditMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { fetchUser } = useContext(AppContext);
    //console.log("formData", formData);
    //console.log("sectionFormData", sectionFormData);

    // update formData once user, address fetches responcies recieved and updated in UserProfileInfo
    useEffect(() => {
        setSectionFormData(formData);
    }, [formData]);

    const toggleShowPassword = (fieldName) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [fieldName]: !prevState[fieldName],
        }));
    };

    const handleInputChange = (field, value) => {
        setSectionFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <>
            {!editMode && formData.valid ? (
                <div className="flex flex-col gap-2 py-4">
                    {Object.entries(formData)
                        .filter(
                            ([field /* , _ */]) =>
                                field !== "valid" && field !== "errors"
                        )
                        // eslint-disable-next-line no-unused-vars
                        .every(([_, value]) => !value) ? (
                        <p className="text-pageBannerBGC  pl-6">No data</p>
                    ) : (
                        Object.entries(formData)
                            .filter(
                                ([field /* , _ */]) =>
                                    !["id", "valid", "errors"].includes(field)
                            )
                            .map(([key, value]) => (
                                <div key={key}>
                                    <div className=" pl-6">
                                        {key === "password" ||
                                        key === "confirmPassword" ? (
                                            ""
                                        ) : (
                                            <div className="flex">
                                                <span className="text-pageBannerBGC w-[10rem]">
                                                    {formatKey(key)}
                                                </span>
                                                <span>{value}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                    )}
                    <Button
                        text="Edit"
                        width="100px"
                        height="3rem"
                        onClickHandler={() => setEditMode((prev) => !prev)}
                    />
                </div>
            ) : (
                <div>
                    {fields.map((field) => (
                        <div key={field.name} className="mb-4">
                            <Input
                                label={field.label}
                                type={
                                    field.name === "password" ||
                                    field.name === "confirmPassword"
                                        ? showPassword[field.name]
                                            ? "text"
                                            : "password"
                                        : field.type || "text"
                                }
                                value={sectionFormData[field.name]}
                                onChange={(e) =>
                                    handleInputChange(
                                        field.name,
                                        e.target.value
                                    )
                                }
                                /* name={field.name} */
                            />

                            {(field.name === "password" ||
                                field.name === "confirmPassword") && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        toggleShowPassword(field.name)
                                    }
                                    className="text-m mt-1"
                                >
                                    {showPassword[field.name] ? (
                                        <div className="flex gap-2">
                                            <EyeOff size={20} />
                                            <p>Hide Password</p>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Eye size={20} />
                                            <p>Show Password</p>
                                        </div>
                                    )}
                                </button>
                            )}
                        </div>
                    ))}
                    <div className="flex gap-5">
                        <Button
                            text="Cancel"
                            width="100px"
                            height="3rem"
                            onClickHandler={() => {
                                setEditMode(() => false);
                                setSectionFormData(formData);
                            }}
                        />
                        <Button
                            text="Save"
                            width="100px"
                            height="3rem"
                            onClickHandler={async () => {
                                if (!sectionFormData) {
                                    console.error(
                                        "sectionFormData is undefined"
                                    );
                                    return;
                                }
                                switch (sectionId) {
                                    case "address":
                                        if (
                                            sectionFormData.street === "" ||
                                            sectionFormData.house === "" ||
                                            sectionFormData.city === "" ||
                                            sectionFormData.zip === "" ||
                                            sectionFormData.country === ""
                                        ) {
                                            setErrorMessage(
                                                "Please fill in all fields"
                                            );
                                            return;
                                        } else if (
                                            isNaN(
                                                Number(sectionFormData.house)
                                            ) ||
                                            Number(sectionFormData.house) < 1
                                        ) {
                                            setErrorMessage(
                                                "House number must be a positive number."
                                            );
                                            return;
                                        } else if (
                                            isNaN(
                                                Number(sectionFormData.zip)
                                            ) ||
                                            Number(sectionFormData.zip) < 100
                                        ) {
                                            setErrorMessage(
                                                "Zip must be a positive number > 100"
                                            );
                                            return;
                                        } else if (
                                            formData.street === "" &&
                                            formData.house === "" &&
                                            formData.city === "" &&
                                            formData.zip === "" &&
                                            formData.country === ""
                                        ) {
                                            await addAddress(sectionFormData);
                                            setErrorMessage("");
                                        } else {
                                            try {
                                                await updateUserAddress(
                                                    /* sectionFormData.id, */
                                                    sectionFormData
                                                );
                                                setErrorMessage("");
                                                /* console.log(
                                                    "editAddress completed successfully to: ",
                                                    sectionFormData
                                                ); */
                                            } catch (error) {
                                                console.error(
                                                    "Error editing address:",
                                                    error
                                                );
                                            }
                                        }
                                        break;
                                    case "personalData":
                                        if (
                                            sectionFormData.firstName === "" ||
                                            sectionFormData.lastName === ""
                                        ) {
                                            setErrorMessage(
                                                "Please fill in all fields"
                                            );
                                            return;
                                        } else {
                                            try {
                                                await updateUser(
                                                    sectionFormData
                                                );
                                                setErrorMessage("");
                                                /* console.log(
                                                    "updateUser completed successfully to: ",
                                                    sectionFormData
                                                ); */
                                                await fetchUser();
                                            } catch (error) {
                                                console.error(
                                                    "Error editing user:",
                                                    error
                                                );
                                            }
                                        }
                                        break;
                                    case "accessData":
                                        console.log("Coming soon...");
                                        break;
                                    default:
                                        console.log("Invalid sectionId");
                                }

                                setEditMode(() => false);
                                dispatchSectionForm({
                                    type: "submit_" + sectionId,
                                    sectionId,
                                    formData: sectionFormData,
                                });
                            }}
                        />
                        {!formData.valid && formData.errors.confirmPassword && (
                            <p className="text-colorTertiary flex items-center">
                                {formData.errors.confirmPassword}
                            </p>
                        )}
                        {errorMessage && (
                            <p className="text-red-600">{errorMessage}</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Form;
