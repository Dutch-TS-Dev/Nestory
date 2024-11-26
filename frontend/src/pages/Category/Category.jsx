import { useParams } from "react-router-dom";
import PagesBanner from "../../components/PagesBanner/PagesBanner";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import Pagination from "../../components/Pagination/Pagination";

const Category = () => {
    const [products, setProducts] = useState([]);
    const { sortOption } = useContext(AppContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);

    const limit = 3;
    const { categoryName } = useParams();

    useEffect(() => {
        // 每次切换category时重置到第一页
        setCurrentPage(1);
    }, [categoryName]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/products/?sort=${sortOption}&page=${currentPage}&limit=${limit}&category=${categoryName}`
                );
                const data = await response.json();
                setProducts(data.products);
                setTotalProducts(data.total);
                setHasNextPage(data.hasNextPage);
            } catch (error) {
                console.error("Error fetching deals:", error);
            }
        };
        fetchProducts();
    }, [sortOption, currentPage, categoryName]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div>
                <PagesBanner
                    title={categoryName}
                    quantity={`${limit} / ${totalProducts}`}
                />
            </div>
            <div className="w-full flex flex-wrap justify-start gap-11 mt-16">
                {products.map((product, index) => (
                    <div
                        className="w-full sm:basis-[45%] lg:basis-[31%] "
                        key={index}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            {totalProducts > limit && (
                <Pagination
                    currentPage={currentPage}
                    hasPrev={currentPage > 1}
                    hasNext={hasNextPage}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
};

export default Category;
