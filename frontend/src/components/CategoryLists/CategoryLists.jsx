import CategoryListCard from "../CategoryListCard/CategoryListCard";
import { Category3D } from "../Category3D/Category3D";

const categoryLists = [
    {
        title: "BEDS",
        img: "/images/categories/pic2.webp",
    },
    {
        title: "SOFAS",
        img: "/images/categories/pic1.webp",
    },
    {
        title: "DESKS",
        img: "/images/categories/pic3.webp",
    },
    {
        title: "CHAIRS",
        img: "/images/categories/pic4.webp",
    },
    {
        title: "TABLES",
        img: "/images/categories/pic5.webp",
    },
];
const CategoryLists = () => {
    return (
        <div className="w-full mt-[10rem]  md:mt-[16rem] lg:mt-[25rem] ">
            <h2 className="font-bold mb-[2rem] lg:mb-[5rem] text-center">
                NESTORY CATEGORIES
            </h2>
            {/* MOBILE */}
            {/* <div className="w-full grid grid-cols-4 grid-rows-2 h-[600px] gap-4 "> */}
            <div className="md:hidden w-full aspect-[4/3] flex flex-col mx-auto gap-10 ">
                {categoryLists.map((item, index) => (
                    <CategoryListCard
                        key={index}
                        title={item.title}
                        img={item.img}
                    />
                ))}
                {/* TABLET */}
            </div>

            <div
                className="hidden md:grid lg:hidden w-full gap-4"
                style={{
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridTemplateRows: "auto auto auto",
                    gridTemplateAreas: `
            "img1 img1"
            "img2 img3"
            "img4 img5"
         `,
                }}
            >
                {categoryLists.map((item, index) => (
                    <CategoryListCard
                        key={index}
                        title={item.title}
                        img={item.img}
                        className={`${
                            index === 0 ? "col-span-2" : "col-span-1"
                        }`}
                        style={{ gridArea: `img${index + 1}` }}
                    />
                ))}
            </div>
            {/* DESKTOP */}
            <div className="hidden lg:block w-full mx-auto h-screen rounded-3xl my-[-10rem] cursor-pointer">
                <Category3D />
            </div>
        </div>
    );
};

export default CategoryLists;
