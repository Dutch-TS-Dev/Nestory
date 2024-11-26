import { useContext, useEffect, useState } from "react";
import PagesBanner from "../../components/PagesBanner/PagesBanner";
import ProductCard from "../../components/ProductCard/ProductCard";
import { AppContext } from "../../context/AppProvider";
import Pagination from "../../components/Pagination/Pagination";

const ShopList = () => {
    const [products, setProducts] = useState([]);
    const { sortOption } = useContext(AppContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);

    const limit = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/products/?sort=${sortOption}&page=${currentPage}&limit=${limit}`
                );
                const data = await response.json();

                setProducts(data.products);
                setHasNextPage(data.hasNextPage);
                setTotalProducts(data.total);
            } catch (error) {
                console.error("Error fetching deals:", error);
            }
        };

        fetchProducts();
    }, [sortOption, currentPage]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        // setIsFirstLoad(false); // 仅在按按钮时更新为 false
    };

    return (
        <>
            <div
            // ref={targetDivRef}
            >
                <PagesBanner
                    title={"SHOP"}
                    quantity={`${limit} / ${totalProducts}`}
                />
            </div>
            <div
                // ref={targetDivRef}
                className="w-full flex flex-wrap justify-between gap-10 mt-16"
            >
                {products?.map((product, index) => (
                    <div className="w-full sm:w-[45%] lg:w-[31%]" key={index}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                hasPrev={currentPage > 1}
                hasNext={hasNextPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default ShopList;
