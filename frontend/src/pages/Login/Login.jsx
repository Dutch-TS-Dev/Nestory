import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import styles from "./login.module.css";
// import Button from "../../components/Button/Button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
// import LogoLine from "../../components/LogoLine/LogoLine";

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
            rememberMe: false,
        },
    });

    //jian
    const { setLoginSuccess, setUser } = useContext(AppContext);
    //////

    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    //   const onSubmit = (data) => {
    //     console.log("Signing in", data);
    //   };

    useEffect(() => {
        if (isSignUp) {
            navigate("/register");
        } else {
            navigate("/login");
        }
    }, [isSignUp, navigate]);

    const onSubmit = async (data) => {
        console.log("Data being sent:", data);
        try {
            const endpoint = isSignUp
                ? "http://localhost:3000/api/users/register"
                : "http://localhost:3000/api/users/login";
            const response = await fetch(endpoint, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Send cookies and other credentials with the request

                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    firstName: isSignUp ? data.firstName : undefined,
                    lastName: isSignUp ? data.lastName : undefined,
                }),
            });

            const result = await response.json();

            //jian
            setLoginSuccess(result.success);
            setUser(result.user);
            ///////

            if (response.ok) {
                console.log("Success:", result);
                navigate("/cart");
            } else {
                console.error("Error:", result.message || "An error occurred");
                alert(result.message || "An error occurred");
            }
        } catch (error) {
            console.error("Request failed:", error);
            alert("Request failed. Please try again.");
        }
    };
    // const onSubmit = (data) => {
    //   if (!data.firstName || !data.lastName || !data.email || !data.password) {
    //     setError("form"), { type: "manual", message: "This is required" };
    //   }
    // };

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
                            type="password"
                            placeholder="Password"
                            // {...register("password", { required: "Password is required" })}
                            {...register("password", {
                                // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                pattern: /^.{8,}$/,
                            })}
                            required
                        />
                    </div>
                    {/* {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )} */}
                    {isSignUp && (
                        <div className={styles.inputContainer}>
                            <RiLockPasswordFill className={styles.icon} />
                            <input
                                type="password"
                                placeholder="Repeat Password"
                                // {...register("Repeat Password", {
                                //   required: "Please repeat the Password",
                                // })}
                                {...register("password")}
                                required
                            />
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
            <div className={styles.imageContainer}>
                <img
                    src="/images/logo/logo.png"
                    alt="Logo or decorative image"
                    className="logo"
                    style={{
                        width: "400px",
                        height: "auto",
                        borderRadius: "23px",
                    }}
                />
            </div>
        </div>
    );
};

export default App;
