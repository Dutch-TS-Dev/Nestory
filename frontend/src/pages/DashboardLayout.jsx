import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => (
    <>
        <div className="flex bg-[#151c2c] min-h-screen">
            <div className="basis-1/4 p-5 ">
                <DashboardSidebar />
            </div>
            <div className="basis-3/4 p-5">
                <DashboardNavbar />
                <Outlet /> {/* 子路由内容将显示在这里 */}
            </div>
        </div>
    </>
);

export default DashboardLayout;
