import {
    Grid,
    User,
    ShoppingBag,
    DollarSign,
    Briefcase,
    BarChart,
    Users,
    Settings,
    HelpCircle,
    LogOut,
} from "lucide-react";
import MenuLink from "../DashboardMenuLink/DashboardMenuLink";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <Grid />,
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <User />,
            },
            {
                title: "Products",
                path: "/dashboard/products",
                icon: <ShoppingBag />,
            },
            {
                title: "Transactions",
                path: "/dashboard/transactions",
                icon: <DollarSign />,
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Revenue",
                path: "/dashboard/revenue",
                icon: <Briefcase />,
            },
            {
                title: "Reports",
                path: "/dashboard/reports",
                icon: <BarChart />,
            },
            {
                title: "Teams",
                path: "/dashboard/teams",
                icon: <Users />,
            },
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <Settings />,
            },
            {
                title: "Help",
                path: "/dashboard/help",
                icon: <HelpCircle />,
            },
        ],
    },
];

const DashboardSidebar = () => {
    const { user, handleLogout } = useContext(AppContext);

    return (
        <div className="sticky top-0 p-5 bg-colorPrimary text-gray-200 min-h-screen">
            <div className="flex items-center gap-4 mb-6">
                <User size={50} />
                <div className="flex flex-col">
                    <span className="font-semibold">
                        {user.firstName + " " + user.lastName}
                    </span>
                    <span className="text-xl text-[#b7bac1]">
                        Administrator
                    </span>
                </div>
            </div>
            <ul className="space-y-10">
                {menuItems.map((catalog, index) => (
                    <li key={index}>
                        <span className="block text-gray-400 font-semibold text-xl mb-4">
                            {catalog.title}
                        </span>
                        {catalog.list.map((item, index) => (
                            <MenuLink key={index} item={item} />
                        ))}
                    </li>
                ))}
            </ul>
            <button
                onClick={handleLogout}
                className="w-full mt-4 flex items-center gap-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
                <LogOut />
                Logout
            </button>
        </div>
    );
};

export default DashboardSidebar;
