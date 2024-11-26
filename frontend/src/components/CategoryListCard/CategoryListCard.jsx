/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const CategoryListCard = ({ title, img, className }) => (
    // <div className={`bg-gray-100 rounded-3xl ${className} relative`}>
    <Link
        className={` rounded-3xl ${className} relative`}
        to={`/category/${title}`}
        onClick={() => {
            window.scrollTo(0, 0);
        }}
    >
        <img
            src={img}
            alt="hero-pic1"
            className="mx-auto w-full aspect-[4/3] object-cover rounded-3xl hover:scale-95 duration-300 ease-in-out"
        />
        <span className="text-5xl pl-6 absolute bottom-15 left-10 text-white">
            {title}
        </span>
    </Link>
    // </div>
);

export default CategoryListCard;
