import { useEffect, useState } from "react";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import DashboardChart from "../../components/DashboardChart/DashboardChart";
import DashboardTransactions, {
    fetchTransactions,
} from "../../components/DashboardTransactions/DashboardTransactions";

import { fetchProducts } from "../DashboardProducts/DashboardProducts";
import { fetchUsers } from "../DashboardUsers/DashboardUsers";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
const Dashboard = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    // const [allOrders, setAllOrders] = useState([]);
    const [saleProducts, setSaleProducts] = useState(0);
    const [revenues, setRevenues] = useState(0);

    useEffect(() => {
        const getAllUsers = async () => {
            const data = await fetchUsers();
            setAllUsers(data);
        };
        const getAllProducts = async () => {
            const data = await fetchProducts();
            setAllProducts(data);
        };
        const getAllOrders = async () => {
            const data = await fetchTransactions();
            const saleProducts = data.allOrders.reduce(
                (totalQuantity, order) => {
                    const orderQuantity = order.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                    );
                    return totalQuantity + orderQuantity;
                },
                0
            );
            const revenues = data.allOrders.reduce(
                (acc, order) => acc + order.total,
                0
            );
            // setAllOrders(data.allOrders); // 更新产品状态
            setRevenues(revenues);
            setSaleProducts(saleProducts);
        };

        getAllUsers();
        getAllProducts();
        getAllOrders();
    }, []);

    return (
        <div className="flex justify-between p-5">
            {/* Main content */}
            <div className="flex flex-col w-full  space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <DashboardCard
                        title="Total Users"
                        value={allUsers?.length}
                        icon={Users}
                    />
                    <DashboardCard
                        title="Total Products"
                        value={allProducts?.length}
                        icon={Package}
                    />
                    <DashboardCard
                        title="Total Sales"
                        value={saleProducts}
                        icon={ShoppingCart}
                    />
                    <DashboardCard
                        title="Total Revenues"
                        value={`$ ${revenues}`}
                        icon={DollarSign}
                    />
                </div>

                <DashboardTransactions />

                <DashboardChart />
            </div>
        </div>
    );
};

export default Dashboard;
