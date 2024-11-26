import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";

const DashboardAddProduct = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const handleImageSelection = (event) => {
        const filePath = event.target.value; // 读取文件路径
        const relativePath = filePath.replace(/^.*[\\\/]/, ""); // 提取文件名
        setImageUrl(`/images/test/${relativePath}`); // 构造相对路径 URL
    };

    const onSubmit = async (data) => {
        // console.log("Form Data:", data);
        if (!imageUrl) {
            alert("Please select an image!");
            return;
        }

        const payload = { ...data, image: imageUrl }; // 合并图片 URL 和表单数据

        // Post Form Data to API
        try {
            const response = await fetch(
                "http://localhost:3000/api/products/admin",
                {
                    method: "POST",
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
        <div className="bg-colorPrimary p-5 rounded-lg mt-5 flex gap-10 min-h-screen">
            {/* Left: Image */}
            <div className="w-[33%] flex flex-col items-center mt-16 ">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Uploaded Preview"
                        className="w-full rounded-lg mb-5"
                    />
                ) : (
                    <div className="flex flex-col items-center w-full">
                        <Package size={250} className="text-gray-400 mb-10" />
                        <p className="text-gray-400 text-center mb-16">
                            Choose an image and Preview it
                        </p>
                    </div>
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
                className="flex flex-wrap justify-evenly  basis-2/3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="text-gray-200 text-left w-[80%] block -mb-10  text-3xl">
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
                    } rounded-md  w-[80%]`}
                />
                {errors.name && (
                    <p className="text-red-500 text-xl w-[80%]">
                        {errors.name.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[80%] block -mb-10 text-3xl">
                    Price
                </label>
                <input
                    {...register("price", {
                        required: "price is required",
                    })}
                    type="number"
                    placeholder="Price"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.price ? "border-red-500" : "border-gray-700"
                    } rounded-md  w-[80%]`}
                />
                {errors.price && (
                    <p className="text-red-500 text-xl w-[80%]">
                        {errors.price.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[80%] block -mb-10 text-3xl">
                    Discount
                </label>
                <input
                    {...register("percentage", {
                        required: "percentage is required",
                    })}
                    type="number"
                    placeholder="Discount"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.percentage ? "border-red-500" : "border-gray-700"
                    } rounded-md  w-[80%]`}
                />
                {errors.percentage && (
                    <p className="text-red-500 text-xl w-[80%]">
                        {errors.percentage.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[80%] block -mb-10 text-3xl">
                    Quantity in Stock
                </label>
                <input
                    {...register("countInStock", {
                        required: "countInStock is required",
                    })}
                    type="number"
                    placeholder="Quantity in Stock"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.countInStock
                            ? "border-red-500"
                            : "border-gray-700"
                    } rounded-md  w-[80%]`}
                />
                {errors.countInStock && (
                    <p className="text-red-500 text-xl w-[80%]">
                        {errors.countInStock.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[80%] block -mb-10 text-3xl">
                    Category
                </label>
                <select
                    {...register("category", {
                        required: "Category is required",
                    })}
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.role ? "border-red-500" : "border-gray-700"
                    } rounded-md  w-[80%]`}
                >
                    <option value="">Select a Category</option>
                    <option value="sofas">Sofas</option>
                    <option value="beds">Beds</option>
                    <option value="chairs">Chairs</option>
                    <option value="tables">Tables</option>
                    <option value="desks">Desks</option>
                </select>
                {errors.category && (
                    <p className="text-red-500 text-xl w-[80%]">
                        {errors.category.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[80%] block -mb-10 text-3xl">
                    Description
                </label>
                <textarea
                    {...register("description", {
                        required: "description is required",
                    })}
                    rows="4"
                    placeholder="Description, minimum 10 characters"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.description
                            ? "border-red-500"
                            : "border-gray-700"
                    } rounded-md  w-[80%]`}
                ></textarea>
                {errors.description && (
                    <p className="text-red-500 text-xl w-[80%]">
                        {errors.description.message}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-[80%] p-3 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                    Add New Product
                </button>
            </form>
        </div>
    );
};

export default DashboardAddProduct;
