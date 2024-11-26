/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Button from "../Button/Button";
import { loadStripe } from "@stripe/stripe-js";
import { AppContext } from "../../context/AppProvider";
import AddressForm from "../AddressForm/AddressForm";

const stripePromise = loadStripe(
    "pk_test_51QJFIqB6FGkciLDVFadGaB60QdwzTdDz9gmQ5p8ZpdUIAe2Eyu9JRIwi8PTGngffBKhXJT55h7Rjb0Gs3AJAZ9O1003CvjfwGl"
);
const CheckOut = ({ totalPrice }) => {
    const { cartItems = [] } = useContext(AppContext);
    const [editAddressForm, setEditAddressForm] = useState(false);
    const [newAddressForm, setNewAddressForm] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addressChecked, setAddressChecked] = useState(false);
    const [addressData, setAddressData] = useState({});
    const [noAddress, setNoAddress] = useState(true);

    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const response = await fetch(
                "http://localhost:3000/api/payments/create-checkout-session",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ items: cartItems }),
                    credentials: "include",
                }
            );
            const session = await response.json();
            // console.log("session", session);
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
        }
    };

    const handleAddressChange = async () => {
        const res = await fetch(`http://localhost:3000/address`, {
            credentials: "include",
        });
        if (res.status === 404) {
            setNewAddressForm(true);
            setNoAddress(true);
            return {};
        }
        const data = await res.json();
        // console.log("Address data", data);
        setAddressData(data);
        // if (!data.noAddress) setShowAddressForm(true);
        setShowAddressForm(true);
        setNoAddress(false);
        // setNewAddressForm(true);
    };

    return (
        <>
            {showAddressForm && (
                <div className="w-full h-screen absolute top-0 left-0 bg-colorPrimary bg-opacity-50 flex items-center justify-center z-[30]">
                    <AddressForm
                        setShowAddressForm={setShowAddressForm}
                        setEditAddressForm={setEditAddressForm}
                        setNewAddressForm={setNewAddressForm}
                        addressData={addressData}
                        noAddress={noAddress}
                    />
                </div>
            )}

            <div className="border-t-[1rem] border-colorPrimary border-opacity-85 pay w-[70%] md:w-[60%] lg:w-[50%] xl:w-[90%] px-15 mx-auto py-15 mt-20 md:space-y-12 bg-white shadow-[0px_8px_15px_rgba(0,0,0,0.2)] rounded-lg h-fit">
                <h2 className="text-3xl font-semibold mb-7 border-b border-colorPrimary pb-10">
                    Order Summary
                </h2>
                <div className="">
                    <div className="flex justify-between">
                        <span>Total Value:</span>
                        <span>$ {totalPrice.toFixed(2)} </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Shipping Costs:</span>
                        <span>$ 50.00 </span>
                    </div>
                    <div className="line border-t border-colorPrimary my-10"></div>
                    <div className="flex  justify-between font-semibold md:text-3xl mb-2">
                        <span>Total amount:</span>
                        <span>
                            $ {(parseFloat(totalPrice) + 50.0).toFixed(2)}{" "}
                        </span>
                    </div>
                    <span className="text-md text-gray-500 mt-8">
                        incl. applicable VAT.
                    </span>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-4 border-t border-colorPrimary pt-10">
                        <input
                            disabled={noAddress}
                            type="checkbox"
                            checked={addressChecked}
                            onChange={(e) =>
                                setAddressChecked(e.target.checked)
                            }
                            className="w-6 h-6 border-2 rounded-sm text-colorPrimary focus:ring-0 focus:outline-none cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300 peer"
                        />
                        <span>use my shipping address</span>
                        <span
                            className=" text-colorTertiary ml-2 hover:underline cursor-pointer"
                            onClick={handleAddressChange}
                        >
                            Show it
                        </span>
                    </div>

                    {newAddressForm ? (
                        <div>
                            <span className="text-colorTertiary">
                                You haven&apos;t set your address yet. Please
                                click here to set it:
                            </span>
                            <div
                                className=" text-colorPrimary ml-2 hover:underline cursor-pointer"
                                onClick={() => setShowAddressForm(true)}
                            >
                                Add a new shipping address
                            </div>
                        </div>
                    ) : (
                        <div>
                            <span className="text-gray-500 pt-4">
                                Don&apos;t have an address?
                            </span>
                            <div
                                className=" text-colorTertiary hover:underline cursor-pointer"
                                onClick={() => setShowAddressForm(true)}
                            >
                                Add a new shipping address
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-12">
                    <Button
                        disabled={!addressChecked}
                        onClickHandler={handlePayment}
                        text="Checkout"
                        width="100%"
                    />
                </div>
            </div>
        </>
    );
};

export default CheckOut;
