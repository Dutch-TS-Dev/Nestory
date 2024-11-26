/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Armchair, BedDouble, Sofa } from "lucide-react";
import { MdTableRestaurant } from "react-icons/md";
import { TbDesk } from "react-icons/tb";

const HamburgMenu = ({ className }) => {
    const [open, setOpen] = useState(false);
    const categories = ["Sofas", "Chairs", "Tables", "Beds", "Desks"];
    const categoriesIcon = [
        <Sofa size={26} />,
        <Armchair size={26} />,
        <MdTableRestaurant size={26} />,
        <BedDouble size={26} />,
        <TbDesk size={26} />,
    ];
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // 如果点击的目标不在 menuRef 里，则关闭菜单
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        // 添加事件监听器
        document.addEventListener("mousedown", handleClickOutside);

        // 清除监听器
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setOpen]);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div className={`relative ${className}`}>
            {/* 这里合并传入的 className */}
            {/* Menu Icon - Always visible, even when menu opens */}
            <Menu
                size={36}
                onClick={handleClick}
                className={`hover:text-colorSecondary cursor-pointer z-10 transition-transform duration-500 ease-in-out ${
                    open ? "opacity-0" : "opacity-100"
                }`}
            />
            {/* Sliding Menu */}
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-[100vh] w-80 space-y-4 bg-white shadow-lg transform transition-transform duration-500 ease-in-out z-20 ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Close Icon inside Menu */}
                <div className="flex justify-end p-4">
                    <X
                        size={26}
                        onClick={handleClick}
                        className="cursor-pointer transition-transform duration-300
                    ease-in-out transform hover:rotate-180 text-gray-400
                    hover:text-gray-900"
                    />
                </div>

                {/* Menu Links */}
                <div
                    className="flex flex-col pl-14 p-8 gap-4 space-y-6 "
                    onClick={handleClick}
                >
                    {categories.map((category, index) => (
                        <Link
                            className="flex gap-2 hover:text-colorSecondary"
                            key={category}
                            to={`/category/${category}`}
                            onClick={() => {
                                window.scrollTo(0, 0);
                            }}
                        >
                            {categoriesIcon[index]}
                            {category}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HamburgMenu;
