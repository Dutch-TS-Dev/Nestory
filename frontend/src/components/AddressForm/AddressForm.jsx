/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

const AddressForm = ({
    setShowAddressForm,
    setEditAddressForm,
    setNewAddressForm,
    addressData,
    noAddress,
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues: addressData || {} });

    useEffect(() => {
        if (addressData) {
            Object.keys(addressData).forEach((key) => {
                setValue(key, addressData[key]);
            });
        }
    }, [addressData, setValue]);

    const onSubmit = (data) => {
        const method =
            // addressData && Object.keys(addressData).length > 0
            noAddress ? "POST" : "PATCH";

        const res = fetch(`http://localhost:3000/address`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        // console.log(data);
        setShowAddressForm(false);
        setEditAddressForm(false);
        setNewAddressForm(false);
    };

    return (
        <div className="relative w-[50%] h-[80%] flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8 shadow-lg">
            <X
                size={26}
                onClick={() => {
                    setShowAddressForm(false);
                    setEditAddressForm(false);
                    setNewAddressForm(false);
                }}
                className="absolute top-4 right-4 cursor-pointer transition-transform duration-300
                    ease-in-out transform hover:rotate-180 text-gray-400
                    hover:text-gray-900"
            />
            {/* </div> */}
            <h2 className="text-5xl font-semibold mb-[8%]">
                Set Your Shipping Address
            </h2>
            <form
                className="flex flex-col gap-6 w-full items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* House Number */}
                <div className="flex flex-col w-2/3">
                    <label className="text-gray-700">House Number</label>
                    <input
                        className="h-16 px-3 border rounded"
                        {...register("house", { required: true })}
                        placeholder="House number"
                    />
                    {errors.house && (
                        <span className="text-red-500 text-sm">
                            This field is required
                        </span>
                    )}
                </div>

                {/* Street Name */}
                <div className="flex flex-col w-2/3">
                    <label className="text-gray-700">
                        Street Name and Number
                    </label>
                    <input
                        className="h-16 px-3 border rounded"
                        {...register("street", { required: true })}
                        placeholder="Street name and number"
                    />
                    {errors.street && (
                        <span className="text-red-500 text-sm">
                            This field is required
                        </span>
                    )}
                </div>

                {/* City */}
                <div className="flex flex-col w-2/3">
                    <label className="text-gray-700">City</label>
                    <input
                        className="h-16 px-3 border rounded"
                        {...register("city", { required: true })}
                        placeholder="City"
                    />
                    {errors.city && (
                        <span className="text-red-500 text-sm">
                            This field is required
                        </span>
                    )}
                </div>

                {/* Zip Code */}
                <div className="flex flex-col w-2/3">
                    <label className="text-gray-700">Zip Code</label>
                    <input
                        className="h-16 px-3 border rounded"
                        {...register("zip", { required: true })}
                        placeholder="Zip code"
                    />
                    {errors.zip && (
                        <span className="text-red-500 text-sm">
                            This field is required
                        </span>
                    )}
                </div>

                {/* Country */}
                <div className="flex flex-col w-2/3">
                    <label className="text-gray-700">Country</label>
                    <input
                        className="h-16 px-3 border rounded"
                        {...register("country", { required: true })}
                        placeholder="Country"
                    />
                    {errors.country && (
                        <span className="text-red-500 text-sm">
                            This field is required
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-1/3 h-16 mt-4 bg-colorPrimary text-white font-semibold py-2 px-6 rounded-lg hover:bg-colorSecondary"
                >
                    {noAddress ? "Add New Address" : "Update/Save Address"}
                </button>
            </form>
        </div>
    );
};

export default AddressForm;
