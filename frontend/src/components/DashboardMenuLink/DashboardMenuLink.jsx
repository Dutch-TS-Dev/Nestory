/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

const MenuLink = ({ item }) => {
    const { pathname } = useLocation(); // useLocation to get the current path

    return (
        <Link
            to={item.path}
            className={`flex items-center gap-4 p-8 my-4 rounded-xl transition-colors 
        ${pathname === item.path ? "bg-[#2e374a]" : "hover:bg-[#2e374a]"}`}
        >
            {item.icon}
            {item.title}
        </Link>
    );
};

export default MenuLink;
