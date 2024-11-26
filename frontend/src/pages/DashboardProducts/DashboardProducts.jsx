import { ArrowDownUp, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Pagination from "../../components/Pagination/Pagination";

import debounce from "lodash/debounce";

export const fetchProducts = async () => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/products/admin",
            {
                credentials: "include",
            }
        );
        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error fetching products", error);
        return [];
    }
};
const DashboardProducts = () => {
    // const { allProducts, setAllProducts } = useContext(AppContext);
    const { register, handleSubmit } = useForm();
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortColumn, setSortColumn] = useState("");

    const [paginatedProducts, setPaginatedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 当前页码

    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts(); // 获取产品数据
            setAllProducts(data); // 更新产品状态
            setSortedProducts(data); // 初始化排序后的产品
        };

        getProducts(); // 调用异步函数
    }, []);

    // 搜索功能：防抖搜索逻辑
    const debouncedSearch = debounce((data) => {
        const searchKeyword = data.search?.toLowerCase() || "";
        const filteredProducts = allProducts.filter((product) =>
            product.name.toLowerCase().includes(searchKeyword)
        );
        setSortedProducts(filteredProducts);
        setCurrentPage(1); // 搜索时重置为第一页
    }, 300);

    const onSearch = (data) => {
        debouncedSearch(data);
    };

    const handleSort = (column) => {
        const isAsc = column === sortColumn && sortOrder === "asc";
        const newSortOrder = isAsc ? "desc" : "asc";
        setSortColumn(column);
        setSortOrder(newSortOrder);
        const sorted = [...allProducts].sort((a, b) => {
            if (newSortOrder === "asc") {
                return a[column] > b[column] ? 1 : -1;
            } else {
                return a[column] < b[column] ? 1 : -1;
            }
        });
        setSortedProducts(sorted);
    };

    // 根据当前页和每页数据数更新分页内容
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedProducts(sortedProducts.slice(startIndex, endIndex));
    }, [sortedProducts, currentPage, itemsPerPage]);

    // 分页切换逻辑
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/products/admin/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            setAllProducts(allProducts.filter((product) => product._id !== id));
            setSortedProducts(
                sortedProducts.filter((product) => product._id !== id)
            );
        } catch (error) {
            console.log("Error deleting product", error);
        }
    };

    return (
        <div className="bg-colorPrimary p-6 rounded-lg mt-6">
            {/* Top Section */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <Search color="white" size={20} />
                    <form
                        onSubmit={handleSubmit(onSearch)}
                        className="w-full max-w-md"
                    >
                        <input
                            {...register("search")}
                            placeholder="Search for a Product..."
                            className="w-full p-3  rounded-lg bg-[#2e374a] focus:ring focus:ring-teal-500 text-gray-200"
                        />
                    </form>
                </div>
                <button
                    onClick={() => navigate("/dashboard/products/add")}
                    className="p-3 bg-teal-600 text-gray-200 rounded-lg hover:bg-teal-700"
                >
                    Add New
                </button>
            </div>

            {/* Table Section */}
            {/* <Pagination /> */}
            {allProducts?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-colorPrimary text-left text-gray-200">
                        <thead>
                            <tr className="bg-colorPrimary ">
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2  ">
                                    Price
                                    <ArrowDownUp
                                        onClick={() => {
                                            handleSort("price");
                                        }}
                                        size={20}
                                        className="cursor-pointer inline-block ml-4"
                                    />
                                </th>
                                <th className="px-4 py-2 ">
                                    Discount
                                    <ArrowDownUp
                                        onClick={() => handleSort("percentage")}
                                        size={20}
                                        className="cursor-pointer inline-block ml-4"
                                    />
                                </th>
                                <th className="px-4 py-2">Create</th>
                                <th className="px-4 py-2 ">
                                    Stock
                                    <ArrowDownUp
                                        onClick={() =>
                                            handleSort("countInStock")
                                        }
                                        size={20}
                                        className="cursor-pointer inline-block ml-4"
                                    />
                                </th>
                                <th className="px-4 py-2">Category</th>
                                {/* <th className="px-4 py-2">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProducts?.map((product) => (
                                <tr
                                    key={product._id}
                                    className="border-t border-colorPrimary text-gray-200"
                                >
                                    <td className="px-4 py-2 flex items-center gap-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        {product.name}
                                    </td>

                                    <td className="px-4 py-2">
                                        {product.price}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.percentage}%
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.createdAt}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.countInStock}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.category}
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                navigate(
                                                    `/dashboard/products/update/${product._id}`,
                                                    { state: { product } }
                                                );
                                            }}
                                            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-200">No products found</p>
            )}

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                hasPrev={currentPage > 1}
                hasNext={
                    currentPage <
                    Math.ceil(sortedProducts.length / itemsPerPage)
                }
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default DashboardProducts;
