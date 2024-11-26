import { useContext, useEffect, useReducer } from "react";
import UserProfileSection from "./UserProfileSection";
import { AppContext } from "../../context/AppProvider";
import { getUserAddress } from "../../utils/addressUtils/getUserAddress";

const UserProfileInfo = () => {
    const { user } = useContext(AppContext);
    //console.log("user._id", user._id);

    const defaultFormData = {
        personalData: {
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            valid: true,
            errors: {},
        },
        accessData: {
            email: user.email ?? "",
            password: "",
            confirmPassword: "",
            valid: true,
            errors: {},
        },
        address: {
            street: "",
            house: "",
            city: "",
            zip: "",
            country: "",
            valid: true,
            errors: {},
        },
    };

    const reducer = (prevState, action) => {
        switch (action.type) {
            // Reset the specified section to default values and mark it as valid
            /* case "cancelChange":
                return {
                    ...prevState,
                    [action.sectionId]: {
                        ...defaultFormData[action.sectionId],
                        valid: true,
                        errors: {},
                    },
                }; */

            // Check if passwords do not match
            case "submit_accessData":
                if (
                    action.formData.password !== action.formData.confirmPassword
                ) {
                    return {
                        ...prevState,
                        [action.sectionId]: {
                            ...action.formData,
                            valid: false,
                            errors: {
                                ...prevState.errors,
                                confirmPassword:
                                    "Passwords do not match. Please try again",
                            },
                        },
                    };
                }
                // Check if password field is empty
                if (
                    prevState.accessData.password === "" &&
                    prevState.accessData.password === action.formData.password
                ) {
                    return {
                        ...prevState,
                        [action.sectionId]: {
                            ...action.formData,
                            valid: false,
                            errors: {
                                ...prevState.errors,
                                confirmPassword:
                                    "Please enter your new password.",
                            },
                        },
                    };
                }
                // If no errors, mark the section as valid
                return {
                    ...prevState,
                    [action.sectionId]: {
                        ...action.formData,
                        valid: true,
                        errors: {},
                    },
                };

            // Set the state to the provided user information
            case "setUserInfo":
                return {
                    ...action.userInfo,
                };

            // Update the address in the state
            case "setUserAddress":
                return {
                    ...prevState,
                    address: {
                        ...action.address,
                        valid: true,
                        errors: {},
                    },
                };

            // Default action to update the specified section and mark it as valid
            default:
                //   fetch patch usercollection => formDate. NB Password hash!
                return {
                    ...prevState,
                    [action.sectionId]: {
                        ...action.formData,
                        valid: true,
                        errors: {},
                    },
                };
        }
    };
    const [formData, dispatchSectionForm] = useReducer(
        reducer,
        defaultFormData
    );

    useEffect(() => {
        const fetchAddress = async () => {
            if (user._id) {
                const address = await getUserAddress();
                //console.log("Fetched address:", address);
                dispatchSectionForm({
                    type: "setUserAddress",
                    address: {
                        //id: address?._id,
                        street: address?.street ?? "",
                        house: address?.house ?? "",
                        city: address?.city ?? "",
                        zip: address?.zip ?? "",
                        country: address?.country ?? "",
                    },
                });
                return;
            } else {
                return null;
            }
        };
        if (user._id) {
            fetchAddress(user._id);

            dispatchSectionForm({
                type: "setUserInfo",
                userInfo: defaultFormData,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user._id]);

    const fieldDefinitions = {
        personalData: [
            { name: "firstName", label: "First name" },
            { name: "lastName", label: "Last name" },
            /* { name: "email", label: "Email", type: "email" }, */
        ],
        accessData: [
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
            {
                name: "confirmPassword",
                label: "Confirm password",
                type: "password",
            },
        ],
        address: [
            { name: "street", label: "Street" },
            { name: "house", label: "House" },
            { name: "city", label: "City" },
            { name: "zip", label: "Zip Code" },
            { name: "country", label: "Country" },
        ],
    };

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-center text-[3rem] md:text-[4rem] mb-[1rem]">
                Your profile
            </h2>
            <div>
                {Object.keys(fieldDefinitions).map((sectionId) => (
                    <UserProfileSection
                        key={sectionId}
                        sectionId={sectionId}
                        title={sectionId}
                        formData={formData[sectionId]}
                        fields={fieldDefinitions[sectionId]}
                        dispatchSectionForm={dispatchSectionForm}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserProfileInfo;
