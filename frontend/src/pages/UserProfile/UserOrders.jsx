import { useContext, useEffect, useState } from "react";
import OrderItem from "../../components/UserProfile/OrderItem/OrderItem";
import { fetchUsersOrders } from "../../utils/ordersUtils/fetchUsersOrders";
import { AppContext } from "../../context/AppProvider";
import { Link } from "react-router-dom";

const filterOrders = (orders) => {
    const filteredData = [];
    for (let i = 0; i < orders.length; i++) {
        if (
            !filteredData.some(
                (item) => item.stripeSessionId === orders[i].stripeSessionId
            )
        ) {
            filteredData.push(orders[i]);
        }
    }
    return filteredData;
};

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AppContext);

    useEffect(() => {
        const getUsersOrders = async () => {
            const orders = await fetchUsersOrders();
            const filteredOrders = filterOrders(orders);
            // Sort by date
            const sortedOrders = filteredOrders.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setOrders(sortedOrders);
        };
        if (user._id) {
            getUsersOrders();
        }
    }, [user._id]);

    return (
        <div>
            <div className="flex flex-col h-full">
                <h2 className="text-center text-[3rem] md:text-[4rem]">
                    Orders
                </h2>
            </div>
            {orders.length ? (
                <div className="flex flex-col items-center justify-center">
                    <h3 className=" w-[100%] lg:text-[2.5rem] text-center border-b">
                        {user.firstName}, here are your orders
                    </h3>
                    {orders.map((order, orderIndex) => (
                        <div key={orderIndex} className="w-[100%]">
                            {order.items.map((item, itemIndex) => (
                                <OrderItem
                                    key={itemIndex}
                                    orderItem={{
                                        ...item,
                                        createdAt: order.createdAt,
                                        status: order.status,
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-[2.5rem] mb-[1.5rem]">
                        {user.firstName}, you have no orders yet
                    </h3>
                    <p className="bg-[#FFB128] py-[1.5rem] px-[3.5rem] text-[1.4rem] text-white  font-bold rounded-[8rem]">
                        <Link to={"/shop"}>Go Shopping</Link>
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserOrders;
