import { BadgeDollarSign } from "lucide-react";
import { useEffect, useState } from "react";

export const fetchTransactions = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/order/admin", {
            credentials: "include",
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error fetching transactions", error);
        return [];
    }
};
const DashboardTransactions = () => {
    // const [allOrders, setAllOrders] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const getAllOrders = async () => {
            const data = await fetchTransactions();
            setTransactions(data.filteredOrders);
            // setAllOrders(data.allOrders);
        };

        getAllOrders();
    }, []);

    return (
        <div className="bg-colorPrimary p-5 rounded-lg">
            <h2 className="mb-5 text-4xl font-semibold text-gray-200">
                Latest Transactions
            </h2>
            <table className="w-full">
                <thead>
                    <tr className="text-left text-gray-200">
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map((transaction, index) => (
                        <tr key={index} className="border-t">
                            <td className=" p-3 text-gray-200">
                                <BadgeDollarSign className="mr-2 inline-block" />
                                {transaction.userId.firstName +
                                    " " +
                                    transaction.userId.lastName}
                            </td>
                            <td className="p-3 text-gray-200">
                                {transaction.userId.email}
                            </td>
                            <td className="p-3 text-gray-200">
                                {transaction.status}
                            </td>
                            <td className="p-3 text-gray-200">
                                {transaction.updatedAt}
                            </td>
                            <td className="p-3 text-gray-200">
                                ${transaction.total}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardTransactions;
