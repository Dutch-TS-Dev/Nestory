import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const SharedLayout = () => {
    return (
        <>
            <Navbar />

            <main className="px-10 md:px-20 lg:px-40 xl:px-80 w-full pt-[13rem]">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default SharedLayout;
