import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserProfileMenu from "../../components/UserProfile/UserProfileMenu";
import SubscribeBox from "../../components/UserProfile/SubscribeBox/SubscribeBox";
import { AppContext } from "../../context/AppProvider";

const UserProfile = () => {
    const location = useLocation();
    const { user } = useContext(AppContext);
    return (
        <>
            <div className="mt-[3rem] flex justify-between flex-col lg:flex-row">
                <div className="basis-[80%] order-2 lg:min-h-[53rem]">
                    {location.pathname === "/user" && (
                        <>
                            <h2 className="text-[3rem] md:text-[4rem] text-center">
                                Hello, {user.firstName}!
                            </h2>
                            <h3 className="text-center lg:text-[2.5rem]">
                                Welcome to your account. Here you can view your
                                current orders and manage your personal
                                information
                            </h3>
                        </>
                    )}
                    <Outlet />
                </div>
                <UserProfileMenu />
            </div>
            <SubscribeBox />
        </>
    );
};

export default UserProfile;
