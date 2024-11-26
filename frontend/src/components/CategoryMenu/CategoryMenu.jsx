/* eslint-disable react/jsx-key */
import { Armchair, BedDouble, Sofa } from "lucide-react";
import { useState } from "react";
import { MdTableRestaurant } from "react-icons/md";
import { TbDesk } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CategoryMenu = ({ categoryName }) => {
    //const [activeIndex, setActiveIndex] = useState("");
    const categories = ["Sofas", "Chairs", "Tables", "Beds", "Desks"];
    const categoriesIcon = [
        <Sofa size={32} />,
        <Armchair size={32} />,
        <MdTableRestaurant size={32} />,
        <BedDouble size={32} />,
        <TbDesk size={32} />,
    ];
    const location = useLocation();
    return (
        <div className="flex  justify-evenly items-center  mt-5 w-full ">
            {categories.map((category, index) => (
                <div
                    key={category}
                    className={`h-full w-[12%] flex justify-center items-center ${
                        /* index === activeIndex */
                        location.pathname === `/category/${category}`
                            ? "text-white  bg-colorSecondary hover:text-colorPrimary rounded-tl-[10px] rounded-tr-[10px]"
                            : "hover:text-colorSecondary"
                    }`}
                >
                    <Link
                        className={"flex items-center gap-2 "}
                        to={`/category/${category}`}
                        onClick={() => {
                            //setActiveIndex(index);
                            window.scrollTo(0, 0);
                        }}
                    >
                        {categoriesIcon[index]}
                        <span className="text-3xl">{category}</span>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CategoryMenu;
