import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardUpdateUser = () => {
    const { state } = useLocation();

    const user = state?.user;
    const userId = user?._id;

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // 预填充表单
    useEffect(() => {
        if (user) {
            setValue("firstName", user.firstName);
            setValue("lastName", user.lastName);
            setValue("password", user.password);
            setValue("email", user.email);
            setValue("role", user.role);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        // console.log("Form Data:", data);

        try {
            const response = await fetch(
                `http://localhost:3000/account/user/admin/${userId}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                    credentials: "include",
                }
            );

            if (response.ok) {
                // console.log("User updated successfully");
                navigate("/dashboard/users"); // 在成功提交后导航
            } else {
                const errorData = await response.json();
                console.error(
                    "Error:",
                    errorData.message || "Failed to update user"
                );
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    return (
        <div className="bg-colorPrimary p-5 rounded-lg mt-5">
            <form
                className="flex flex-wrap justify-between gap-10"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="text-gray-200 text-left w-[60%] block mb-[-1.2rem]  text-3xl">
                    First Name
                </label>
                <input
                    {...register("firstName", {
                        required: "First name is required",
                    })}
                    type="text"
                    placeholder="First Name"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.firstName ? "border-red-500" : "border-gray-700"
                    } rounded-md mb-5 w-[60%]`}
                />
                {errors.firstName && (
                    <p className="text-red-500 text-xl w-[60%]">
                        {errors.firstName.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[60%] block mb-[-1.2rem] text-3xl">
                    Last Name
                </label>
                <input
                    {...register("lastName", {
                        required: "Last name is required",
                    })}
                    type="text"
                    placeholder="Last Name"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.lastName ? "border-red-500" : "border-gray-700"
                    } rounded-md mb-5 w-[60%]`}
                />
                {errors.lastName && (
                    <p className="text-red-500 text-xl w-[60%]">
                        {errors.lastName.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[60%] block mb-[-1.2rem] text-3xl">
                    Email
                </label>
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Enter a valid email address",
                        },
                    })}
                    type="email"
                    placeholder="Email"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.email ? "border-red-500" : "border-gray-700"
                    } rounded-md mb-5 w-[60%]`}
                />
                {errors.email && (
                    <p className="text-red-500 text-xl w-[60%]">
                        {errors.email.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[60%] block mb-[-1.2rem] text-3xl">
                    Password
                </label>
                <input
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message:
                                "Password must be at least 6 characters long",
                        },
                    })}
                    type="password"
                    placeholder="Password"
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.password ? "border-red-500" : "border-gray-700"
                    } rounded-md mb-5 w-[60%]`}
                />
                {errors.password && (
                    <p className="text-red-500 text-xl w-[60%]">
                        {errors.password.message}
                    </p>
                )}

                <label className="text-gray-200 text-left w-[60%] block mb-[-1.2rem] text-3xl">
                    Role
                </label>
                <select
                    {...register("role", { required: "Role is required" })}
                    className={`p-3 bg-[#2e374a] text-gray-200 border ${
                        errors.role ? "border-red-500" : "border-gray-700"
                    } rounded-md mb-5 w-[60%]`}
                >
                    <option value="">Select a Role</option>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>
                {errors.role && (
                    <p className="text-red-500 text-xl w-[60%]">
                        {errors.role.message}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-[60%] p-3 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                    Update User
                </button>
            </form>
        </div>
    );
};

export default DashboardUpdateUser;
