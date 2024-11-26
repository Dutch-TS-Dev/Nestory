import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardUpdateProduct = () => {
    const { state } = useLocation();
    const { product } = state;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [imageUrl, setImageUrl] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setValue("name", product.name);
            setValue("description", product.description);
            setValue("price", product.price);
            setValue("category", product.category);
            setValue("image", product.image);
            setValue("countInStock", product.countInStock);
            setValue("percentage", product.percentage);
            setImageUrl(product.image);
        }
    }, [product, setValue]);

    // 处理图片选择
    const handleImageSelection = (event) => {
        const filePath = event.target.value; // 获取本地文件路径
        const relativePath = filePath.replace(/^.*[\\\/]/, ""); // 提取文件名
        const newImageUrl = `/images/test/${relativePath}`; // 构造相对路径 URL

        setImageUrl(newImageUrl); // 更新图片预览
        // setValue("image", newImageUrl); // 更新表单字段
    };

    const onSubmit = async (data) => {
        // console.log("Form Data:", data);
        const payload = { ...data, image: imageUrl };

        try {
            const response = await fetch(
                `http://localhost:3000/api/products/admin/${product._id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                    credentials: "include",
                }
            );

            if (response.ok) {
                // console.log("Product added successfully");
                navigate("/dashboard/products");
            } else {
                const errorData = await response.json();
                console.error(
                    "Error:",
                    errorData.message || "Failed to add product"
                );
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <div className="bg-colorPrimary p-5 rounded-lg mt-5 flex  min-h-screen">
            {/* Left: Image */}
            <div className="w-[33%] flex flex-col items-center">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Uploaded Preview"
                        className="w-full rounded-lg mb-5"
                    />
                ) : (
                    <p className="text-gray-400 text-center mb-5">
                        Choose an image and Preview it
                    </p>
                )}
                <input
                    {...register("image", {
                        required: "Product image is required",
                    })}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelection}
                    className="p-3 bg-[#2e374a] text-gray-200 border border-gray-700 rounded-md w-full"
                />
            </div>

            {/* Right: Form */}
            <form
                className="flex flex-wrap justify-evenly basis-2/3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="text-gray-200 text-left w-[60%] block mb-[-1.2rem]  text-3xl">
                    Product Name
                </label>
                <input
                    {...register("name", {
                        required: "Product Name is required",
                    })}
                    type="text"
                    placeholder="Name"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.name ? "border-red-500" : "border-gray-700"
                    } rounded-md mb-5 w-[60%]`}
                />
                {errors.name && (
                    <p className="text-red-500 text-xl w-[60%]">
                        {errors.name.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[60%] block mb-[-1.2rem] text-3xl">
                    Price
                </label>
                <input
                    {...register("price", {
                        required: "Last name is required",
                    })}
                    type="number"
                    placeholder="Price"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.price ? "border-red-500" : "border-gray-700"
                    } rounded-md mb-5 w-[60%]`}
                />
                {errors.price && (
                    <p className="text-red-500 text-xl w-[60%]">
                        {errors.price.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[60%] block mb-[-1.2rem] text-3xl">
                    Discount
                </label>
                <input
                    {...register("percentage", {
                        required: "Last name is required",
                    })}
                    type="number"
                    placeholder="Discount"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.percentage ? "border-red-500" : "border-gray-700"
                    } rounded-md mb-5 w-[60%]`}
                />
                {errors.percentage && (
                    <p className="text-red-500 text-xl w-[60%]">
                        {errors.percentage.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[60%] block mb-[-1.2rem] text-3xl">
                    Quantity in Stock
                </label>
                <input
                    {...register("countInStock", {
                        required: "Last name is required",
                    })}
                    type="number"
                    placeholder="Quantity in Stock"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.countInStock
                            ? "border-red-500"
                            : "border-gray-700"
                    } rounded-md mb-5 w-[60%]`}
                />
                {errors.countInStock && (
                    <p className="text-red-500 text-xl w-[60%]">
                        {errors.countInStock.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[60%] block mb-[-1.2rem] text-3xl">
                    Category
                </label>
                <select
                    {...register("category", {
                        required: "Category is required",
                    })}
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.role ? "border-red-500" : "border-gray-700"
                    } rounded-md mb-5 w-[60%]`}
                >
                    <option value="">Select a Category</option>
                    <option value="sofas">Sofas</option>
                    <option value="beds">Beds</option>
                    <option value="chairs">Chairs</option>
                    <option value="tables">Tables</option>
                    <option value="desks">Desks</option>
                </select>
                {errors.category && (
                    <p className="text-red-500 text-xl w-[60%]">
                        {errors.category.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[60%] block mb-[-1.2rem] text-3xl">
                    Description
                </label>
                <textarea
                    {...register("description", {
                        required: "Address is required",
                    })}
                    rows="4"
                    placeholder="Description"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.address ? "border-red-500" : "border-gray-700"
                    } rounded-md mb-5 w-[60%]`}
                ></textarea>
                {errors.description && (
                    <p className="text-red-500 text-xl w-[60%]">
                        {errors.description.message}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-[60%] p-3 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default DashboardUpdateProduct;
