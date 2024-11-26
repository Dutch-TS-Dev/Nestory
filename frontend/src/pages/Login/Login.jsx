import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import styles from "./login.module.css";
// import Button from "../../components/Button/Button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
// import LogoLine from "../../components/LogoLine/LogoLine";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const {
        register,
        handleSubmit,
        reset,
        // formState: { errors },
        // setError,
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
            rememberMe: false,
        },
    });

    const { setLoginSuccess, setUser } = useContext(AppContext);
    const [isSignUp, setIsSignUp] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
    const [passwordPage, setPasswordPage] = useState("login");

    const navigate = useNavigate();

    useEffect(() => {
        navigate(isSignUp ? "/register" : "/login");
    }, [isSignUp, navigate]);

    const onSubmit = async (data) => {
        if (isSignUp && data.password !== data.repeatPassword) {
            toast.error("Passwords do not match!", {
                hideProgressBar: true,
            });
            return;
        }

        // console.log("Data being sent:", data);
        try {
            const endpoint = isSignUp
                ? "http://localhost:3000/api/users/register"
                : "http://localhost:3000/api/users/login";
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    firstName: isSignUp ? data.firstName : undefined,
                    lastName: isSignUp ? data.lastName : undefined,
                    rememberMe: data.rememberMe,
                }),
            });

            if (!response.ok) {
                console.error("Error:", result.message || "An error occurred.");
                toast.error(
                    result.message || "Something went wrong. Please try again.",
                    {
                        hideProgressBar: true,
                    }
                );
                return;
            }
            const result = await response.json();

            // console.log("was bekomme ich", result);

            if (isSignUp) {
                setIsSignUp(false);
                const toastId = toast.success(
                    "Your account has been created successfully!",
                    {
                        hideProgressBar: true,
                    }
                );
                setTimeout(() => {
                    toast.dismiss(toastId);
                    navigate("/login");
                }, 2000);
                return;
            }
            if (result.success) {
                setLoginSuccess(result.success);
                setUser(result.user);
                // toast.success("Login successful!");
                // navigate("/");

                const toastId = toast.success("Login successful", {
                    hideProgressBar: true,
                    // position: "top-center",
                });

                const targetPath =
                    result.user.role === "admin" ? "/dashboard" : "/";
                setTimeout(() => {
                    toast.dismiss(toastId);
                    navigate(targetPath);
                }, 2000);
                return;
            }
        } catch (error) {
            console.error("Request failed:", error);
            toast.error("An error occurred. Please try again.", {
                hideProgressBar: true,
            });
        }
    };

    const toggleForm = () => {
        setIsSignUp((prev) => !prev);
        reset();
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2>{isSignUp ? "Sign up with" : "Sign in with"}</h2>

                <div className={styles.socialButtons}>
                    <button className={styles.buttonGithub}>
                        <FaGithub /> GitHub
                    </button>
                    <button className={styles.buttonGoogle}>
                        <FaGoogle /> Google
                    </button>
                </div>
                {/* <LogoLine /> */}
                <p>
                    {isSignUp
                        ? "Or sign up with credentials"
                        : "Or sign in with credentials"}
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {isSignUp && (
                        <>
                            <div className={styles.inputContainer}>
                                <FaUser className={styles.icon} />
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    // {...register("firstName", {
                                    //   required: "First name is required",
                                    // })}
                                    {...register("firstName")}
                                    required
                                />
                                {/* {errors.firstName && (

                  <p className={styles.error}>{errors.firstName.message}</p>
                )} */}
                            </div>
                            <div className={styles.inputContainer}>
                                <FaUser className={styles.icon} />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    // {...register("lastName", {
                                    //   required: "Last name is required",
                                    // })}
                                    {...register("lastName")}
                                    required
                                />
                                {/* {errors.lastName && (
                  <p className={styles.error}>{errors.lastName.message}</p>
                )} */}
                            </div>
                        </>
                    )}
                    <div className={styles.inputContainer}>
                        <MdEmail className={styles.icon} />
                        <input
                            type="email"
                            placeholder="Email"
                            // {...register("email", { required: "Email is required" })}
                            {...register("email", {
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            })}
                            required
                        />
                        {/* {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )} */}
                    </div>
                    <div className={styles.inputContainer}>
                        <RiLockPasswordFill className={styles.icon} />
                        <input
                            //   type="password"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            // {...register("password", { required: "Password is required" })}
                            {...register("password", {
                                // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                pattern: /^.{8,}$/,
                            })}
                            required
                        />
                        <div
                            className={
                                passwordPage === "register"
                                    ? styles.eyeIcon2
                                    : styles.eyeIcon1
                            }
                            onClick={() => setPasswordVisible((prev) => !prev)}
                        >
                            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>

                    {/* {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )} */}
                    {isSignUp && (
                        <div className={styles.inputContainer}>
                            <RiLockPasswordFill className={styles.icon} />
                            <input
                                // type="password"
                                type={
                                    repeatPasswordVisible ? "text" : "password"
                                }
                                placeholder="Repeat Password"
                                // {...register("Repeat Password", {
                                //   required: "Please repeat the Password",
                                // })}
                                {...register("repeatPassword", {
                                    required: "Please repeat the password",
                                })}
                                required
                            />
                            <div
                                className={styles.eyeIcon3}
                                onClick={() =>
                                    setRepeatPasswordVisible((prev) => !prev)
                                }
                            >
                                {repeatPasswordVisible ? (
                                    <FaEye />
                                ) : (
                                    <FaEyeSlash />
                                )}
                            </div>
                            {/* {errors.repeatPassword && (
                <p className={styles.error}>{errors.repeatPassword.message}</p>
              )} */}
                        </div>
                    )}
                    <div className={styles.remember}>
                        <label htmlFor="rememberMe">Remember me</label>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                {...register("rememberMe")}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    <button className={styles.signInButton} type="submit">
                        {isSignUp ? "Create account" : "Sign in"}
                    </button>
                </form>

                <p className={styles.changeButton}>
                    {isSignUp
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                    <a href="#" onClick={toggleForm}>
                        {isSignUp ? "Sign in" : "Sign up"}
                    </a>
                </p>
            </div>
            {/* <div className={styles.imageContainer}>
         <img
          src="/images/logo/cozy.webp"
          alt="Logo or decorative image"
          className="logo"
          style={{
            width: "400px",
            height: "auto",
            borderRadius: "23px",
          }}
        /> 
      </div>  */}
            <ToastContainer />
        </div>
    );
};

export default App;
