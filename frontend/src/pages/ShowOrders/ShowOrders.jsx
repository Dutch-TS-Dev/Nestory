import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppProvider";

const apiUrl = import.meta.env.VITE_API_URL;
const ShowOrders = () => {
    const [order, setOrder] = useState(null);
    const { sessionId } = useContext(AppContext);

    useEffect(() => {
        const fetchUserOrder = async () => {
            try {
                const response = await fetch(
                    `${apiUrl}/api/order/?sessionId=${sessionId}`,
                    {
                        credentials: "include",
                    }
                );
                const data = await response.json();
                console.log(data);
                setOrder(data);
            } catch (error) {
                console.log("Error fetching user order", error);
            }
        };
        fetchUserOrder();
    }, []);

    return (
        <div className="relative max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg border p-8">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-colorPrimary mb-6">
                        Order Form
                    </h1>
                </div>
                <div className="w-36">
                    <img src="/images/logo/nestoryFull.png" alt="logo-photo" />
                </div>
            </div>

            {order ? (
                <div>
                    <div className="border-b border-b-colorPrimary pb-4 mb-4">
                        <h2 className="text-xl font-semibold mb-1">
                            Customer Details
                        </h2>
                        <p className="text-gray-500">
                            Name: {order.userId.email || "N/A"}
                        </p>
                        <p className="text-gray-500">
                            Email: {order.userId.email || "N/A"}
                        </p>
                    </div>

                    <div className="border-b border-b-colorPrimary pb-4 mb-4">
                        <h2 className="text-xl font-semibold mb-1">
                            Order Information
                        </h2>
                        <p className="text-gray-500">Order ID: {order._id}</p>
                        <p className="text-gray-500">
                            Created at:{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500">Status: {order.status}</p>
                    </div>

                    <div className="border-b border-b-colorPrimary pb-4 mb-4">
                        <h2 className="text-xl font-semibold mb-1">
                            Delivery Information
                        </h2>
                        <div className="space-y-1 text-gray-500">
                            <p>
                                Street: {order.shippingAddress?.street || "N/A"}
                            </p>
                            <p>
                                House: {order.shippingAddress?.house || "N/A"}
                            </p>
                            <p>City: {order.shippingAddress?.city || "N/A"}</p>
                            <p>Zip: {order.shippingAddress?.zip || "N/A"}</p>
                            <p>
                                Country:{" "}
                                {order.shippingAddress?.country || "N/A"}
                            </p>
                            <p>Shipping Fee: ${order.shippingFee || "N/A"}</p>
                        </div>
                    </div>

                    <div className="border-b border-b-colorPrimary pb-4 mb-4">
                        <h2 className="text-xl font-semibold mb-1">Items</h2>
                        {order.items?.map((item) => (
                            <div
                                key={item.productId}
                                className="flex justify-between py-2"
                            >
                                <p className="font-medium text-gray-500">
                                    {item.productId.name || "Unknown Product"}
                                </p>
                                <div className="flex items-center justify-end">
                                    <p className="text-colorPrimary font-semibold">
                                        <span>
                                            {" "}
                                            ${item.price?.toFixed(2) || "N/A"}
                                        </span>
                                    </p>
                                </div>
                                <p className="text-gray-500">
                                    Qty:{" "}
                                    <span className="text-colorPrimary text-left">
                                        {" "}
                                        {item.quantity}{" "}
                                    </span>{" "}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-right font-semibold text-[1.5rem]">
                        <p>Total: ${order.total?.toFixed(2) || "N/A"}</p>
                    </div>

                    <p className="text-center text-sm px-15 text-gray-500 mt-6">
                        Thank you for your order! If you have any questions,
                        please contact us at support@nestory.com.
                    </p>
                </div>
            ) : (
                <p className="text-center text-gray-500">Order not found.</p>
            )}
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-colorPrimary"></div>
        </div>
    );
};

export default ShowOrders;
