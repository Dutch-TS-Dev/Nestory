import { Link } from "react-router-dom";
import { PackageCheck, Truck, PackageOpen } from "lucide-react";

const OrderItem = ({ orderItem }) => {
    return (
        <>
            <div>
                <div className="mt-[2rem]">
                    <p className="font-bold">Order from {orderItem.date}</p>
                </div>
                <div className="h-fit md:h-[30rem] py-[3rem] flex flex-col md:flex-row justify-around border-t">
                    <div className="basis-[50%] md:basis-[25%] flex md:flex-col justify-between md:justify-center md:mx-8">
                        <div>
                            <Link to={`/product/${orderItem._id}`}>
                                <img
                                    src={orderItem.imgUrl}
                                    alt="order item photo"
                                    className="w-[20rem] h-[20rem] mx-auto"
                                />
                            </Link>
                        </div>
                        <div className="basis-[40%] md:hidden">
                            <div className="w-full h-full mt-auto flex flex-col justify-center items-center">
                                {orderItem.status === "delivered" ? (
                                    <PackageCheck size={40} />
                                ) : orderItem.status === "assembling" ? (
                                    <PackageOpen size={40} />
                                ) : (
                                    <Truck size={40} />
                                )}
                                <p>{orderItem.status}</p>
                            </div>
                        </div>
                    </div>
                    <div className="basis-[60%] flex flex-col justify-center md:mx-8">
                        <p className="pt-8 md:pt-0">{orderItem.name}</p>
                        <p className="pt-8 hidden md:block">
                            {orderItem.description}
                        </p>
                        <div className="flex  justify-between mt-4">
                            <div className="flex gap-20">
                                <div className="flex flex-col justify-between">
                                    <p>Price: </p>
                                    <p className="md:text-[2rem]">
                                        {orderItem.priceByOrder.toFixed(2)}€
                                    </p>
                                </div>
                                <div>
                                    <p>Quantity: </p>
                                    <p className="md:text-[2rem]">
                                        {orderItem.quantity}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p>Total price: </p>
                                <p className="md:text-[2rem] text-colorTertiary">
                                    {(
                                        orderItem.priceByOrder *
                                        orderItem.quantity
                                    ).toFixed(2)}
                                    €
                                </p>
                            </div>
                        </div>
                        <p className="mt-auto pt-4">
                            <Link
                                to={`/product/${orderItem._id}`}
                                className="underline"
                            >
                                Details
                            </Link>
                        </p>
                    </div>
                    <div className="basis-[18%]">
                        <div className="hidden md:flex w-full h-full mt-auto  flex-col justify-center items-center gap-2">
                            {orderItem.status === "delivered" ? (
                                <PackageCheck size={35} />
                            ) : orderItem.status === "assembling" ? (
                                <PackageOpen size={35} />
                            ) : (
                                <Truck size={35} />
                            )}
                            <p>{orderItem.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderItem;
