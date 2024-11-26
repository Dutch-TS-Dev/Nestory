import {
    Heart,
    LayoutGrid,
    LogOut,
    Search,
    ShoppingBag,
    User,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";
import HamburgMenu from "../HamburgMenu/HamburgMenu";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import "../../css/App.css";
import { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../../context/AppProvider";

const Navbar = () => {
    const [search, setSearch] = useState(false);
    //julijana : handleLogout hinzugefügt
    const {
        loginSuccess,
        searchKeyword,
        setSearchKeyword,
        wishlist,
        cartItems,
        bagIconRef,
        handleLogout,
        user,
    } = useContext(AppContext);
    const [clickUser, setClickUser] = useState(false);
    const userMenuRefMobile = useRef(null);
    const userMenuRef = useRef(null);

    // console.log("cartItems in navbar", cartItems);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userMenuRefMobile.current &&
                !userMenuRefMobile.current.contains(event.target) &&
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target)
            ) {
                setClickUser(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userMenuRefMobile, userMenuRef]);

    const handleSearch = (e) => {
        setSearchKeyword(e.target.value);
    };

    return (
        <div className="px-20 md:px-20 lg:px-40 xl:px-80 w-full h-[6rem] xl:h-[14rem] flex flex-col bg-white fixed z-20 shadow-sm shadow-gray-200  ">
            <div className="h-full xl:h-[50%] flex justify-between w-full ">
                {/* MOBILE */}

                <div className="w-full flex justify-between items-center md:hidden relative">
                    <div>
                        <Link
                            to={"/"}
                            onClick={() => {
                                window.scrollTo(0, 0);
                            }}
                        >
                            <img
                                src="/images/logo/nestoryFull.png"
                                alt="neSTory Logo"
                                style={{ width: "90px", height: "auto" }}
                            />
                        </Link>
                    </div>
                    <div className="flex justify-between items-center gap-2 ">
                        <HamburgMenu />
                        {!search && (
                            <Search
                                onClick={() => setSearch(!search)}
                                className="hover:text-colorSecondary"
                            />
                        )}
                    </div>
                    {search && (
                        <div className="w-full flex absolute top-28 left-0 justify-center items-center gap-2 z-10 bg-white">
                            <input
                                type="text"
                                placeholder="Search"
                                className=" bg-slate-100 rounded-md w-[80%]  h-[4rem] focus:outline-none relative"
                            />
                            <Link
                                className="absolute right-[7rem]"
                                to={"/search"}
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                }}
                            >
                                <Search className="hover:text-colorSecondary" />
                            </Link>
                            <X
                                onClick={() => setSearch(!search)}
                                className="cursor-pointer transition-transform duration-300
                  ease-in-out transform hover:rotate-180 text-gray-400
                  hover:text-gray-900"
                            />
                        </div>
                    )}
                </div>
                <div className="w-full flex justify-around items-center md:hidden fixed bottom-0 left-0 z-20 h-[8rem] bg-white shadow-sm shadow-gray-200">
                    <div>
                        <Link
                            to={"/shop"}
                            onClick={() => {
                                window.scrollTo(0, 0);
                            }}
                        >
                            <LayoutGrid
                                size={26}
                                className="hover:text-colorSecondary"
                            />
                        </Link>
                    </div>

                    <div ref={bagIconRef} className="relative">
                        <Link
                            to={user._id ? "/cart" : "/login"}
                            onClick={() => {
                                window.scrollTo(0, 0);
                            }}
                        >
                            {user._id && (
                                <span className="number">
                                    {/* {cartCount} */}
                                    {cartItems.length}
                                </span>
                            )}
                            {/* <span className="number">{cartCount}</span> */}
                            <ShoppingBag
                                size={26}
                                className="hover:text-colorSecondary"
                            />
                        </Link>
                    </div>
                    <div className="relative">
                        <Link
                            to={user._id ? "/wishlist" : "/login"}
                            onClick={() => {
                                window.scrollTo(0, 0);
                            }}
                        >
                            {user._id && (
                                <span className="number">
                                    {wishlist.length}
                                </span>
                            )}
                            <Heart
                                size={26}
                                className="hover:text-colorSecondary"
                            />
                        </Link>
                    </div>
                    <div>
                        {loginSuccess ? (
                            <div>
                                <div onClick={() => setClickUser(!clickUser)}>
                                    <User className="hover:text-colorSecondary" />
                                </div>
                                {clickUser && (
                                    <div
                                        ref={userMenuRefMobile}
                                        className="absolute  top-[-6rem] right-[4rem] p-2 w-max flex flex-col justify-center  border-gray-200 bg-white rounded-lg shadow-[0px_8px_15px_rgba(0,0,0,0.2)]"
                                    >
                                        <Link
                                            to={"/user"}
                                            onClick={() => {
                                                setClickUser(false);
                                                window.scrollTo(0, 0);
                                            }}
                                            className="hover:text-colorSecondary"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setClickUser(false);
                                            }}
                                        >
                                            <div className="flex gap-2 mt-6 w-fit hover:text-colorSecondary">
                                                <span>Log out</span>
                                                <LogOut />
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to={"/login"}
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                }}
                            >
                                <User
                                    size={26}
                                    className="hover:text-colorSecondary"
                                />
                            </Link>
                        )}
                    </div>
                </div>
                {/* TABLET */}
                <div className="hidden md:flex justify-between items-center w-full gap-10">
                    {/* LEFT */}
                    <div className="w-2/3 flex justify-between items-center lg:gap-8">
                        <div className="flex justify-center items-center">
                            <Link
                                to={"/"}
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                }}
                            >
                                <img
                                    src="/images/logo/nestoryFull.png"
                                    alt="neSTory Logo"
                                    style={{ width: "100px", height: "auto" }}
                                />
                            </Link>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <input
                                onChange={handleSearch}
                                value={searchKeyword}
                                type="text"
                                placeholder="Search"
                                className=" bg-slate-100 rounded-md px-2 py-1 md:w-[30rem] lg:w-[40rem] xl:w-[58rem] h-[4rem] focus:outline-none"
                            />

                            <Link
                                to={"/search"}
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                }}
                            >
                                <Search className="hover:text-colorSecondary" />
                            </Link>
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div className="w-1/3 flex justify-end items-center gap-16">
                        <div ref={bagIconRef} className="relative">
                            <Link
                                to={user._id ? "/cart" : "/login"}
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                }}
                            >
                                {user._id && (
                                    <span className="number">
                                        {cartItems.length}
                                    </span>
                                )}
                                <ShoppingBag
                                    size={26}
                                    className="hover:text-colorSecondary"
                                />
                            </Link>
                        </div>
                        <div className="relative">
                            <Link
                                to={user._id ? "/wishlist" : "/login"}
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                }}
                            >
                                {user._id && (
                                    <span className="number">
                                        {wishlist.length}
                                    </span>
                                )}
                                <Heart
                                    size={26}
                                    className="hover:text-colorSecondary"
                                />
                            </Link>
                        </div>
                        <div>
                            {loginSuccess ? (
                                <div className="relative cursor-pointer ">
                                    <div
                                        onClick={() => setClickUser(!clickUser)}
                                    >
                                        <User className="hover:text-colorSecondary" />
                                    </div>
                                    {clickUser && (
                                        <div
                                            ref={userMenuRef}
                                            className="absolute flex flex-col top-16 right-[-5rem] w-max p-4 border-gray-200 bg-white rounded-lg shadow-[0px_8px_15px_rgba(0,0,0,0.2)]"
                                        >
                                            <Link
                                                to={"/user"}
                                                onClick={() => {
                                                    setClickUser(false);
                                                    window.scrollTo(0, 0);
                                                }}
                                                className="hover:text-colorSecondary"
                                            >
                                                Profile
                                            </Link>
                                            {/* julijana: button + onClick */}
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setClickUser(false);
                                                }}
                                            >
                                                <div className="flex gap-2 mt-6 w-fit hover:text-colorSecondary">
                                                    <span>Log out</span>
                                                    <LogOut />
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to={"/login"}
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    <User
                                        size={26}
                                        className="hover:text-colorSecondary"
                                    />
                                </Link>
                            )}
                        </div>
                        <HamburgMenu className="xl:hidden" />
                    </div>
                </div>
            </div>

            <div className="hidden xl:h-[50%] xl:flex  w-full">
                <CategoryMenu className=" hover:text-colorSecondary" />
            </div>
        </div>
    );
};

export default Navbar;
