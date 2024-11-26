import { useLocation } from "react-router-dom"; // 从 react-router-dom 导入 useLocation
import { Bell, MessageCircle, Globe, Search } from "lucide-react";

const DashboardNavbar = () => {
    const location = useLocation(); // 使用 useLocation 获取当前路径
    const pathname = location.pathname; // 提取路径名

    return (
        <div className="p-5 rounded-lg bg-colorPrimary flex items-center justify-between">
            <div className="text-gray-200 font-bold capitalize">
                {pathname.split("/").pop()}
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2 bg-[#2e374a] p-2 rounded-lg">
                    <Search className="text-gray-200" size={16} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none text-text"
                    />
                </div>
                <div className="flex gap-5">
                    <MessageCircle className="text-gray-200" size={20} />
                    <Bell className="text-gray-200" size={20} />
                    <Globe className="text-gray-200" size={20} />
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;
