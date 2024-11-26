import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchItems from "../../components/SearchItem/SearchItems";
import { AppContext } from "../../context/AppProvider";
const SearchList = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { searchKeyword } = useContext(AppContext);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                //const response = await fetch(`http://localhost:3000/api/products/search/?query=beds`);
                const response = await fetch(
                    `http://localhost:3000/api/products/search/?query=${searchKeyword}`
                );
                const data = await response.json();
                // console.log(data);
                setSearchResults(data.products || []);
                // console.log(data.products);
            } catch (error) {
                console.error("Failed to fetch search results:", error);
            } finally {
                setLoading(false);
            }
        };
        if (searchKeyword) {
            fetchSearchResults();
        }
    }, [searchKeyword]);

    return (
        <div className="w-full mx-auto flex flex-col items-center justify-center ">
            <div className="w-full justify-center ">
                <h1 className="text-[2.4rem] md:text-[4.2rem] font-bold text-colorPrimary p-5 mx-auto flex flex-col items-center justify-center">
                    {searchResults.length} results found for: {searchKeyword}
                </h1>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : searchResults.length ? (
                <div className="mx-auto flex flex-col items-center justify-center p-10">
                    {searchResults.map((item) => (
                        <SearchItems key={item._id} SearchItem={item} />
                    ))}
                </div>
            ) : (
                <div className="h-[80%] w-[80%] mx-auto flex flex-col items-center justify-center">
                    <h3 className="text-[3.2rem] font-bold mb-[1.5rem]">
                        No items found
                    </h3>
                    <p className="bg-[#FFB128] py-[1.5rem] px-[3.5rem] text-[1.4rem] text-white font-bold rounded-[8rem]">
                        <Link to={"/"}>Go Shopping</Link>
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchList;
//----------------------------------------------
