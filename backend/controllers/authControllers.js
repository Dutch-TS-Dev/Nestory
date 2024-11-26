import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

export function verifyJwt(token) {
    if (!token) return;

    return jwt.verify(token, JWT_SECRET);
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// function isStrongPassword(password) {
//   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
//   return regex.test(password);
// }

function isStrongPassword(password) {
    return password.length >= 8;
}

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, rememberMe } = req.body;
    // if (password !== repeatPassword) {
    //   return res.status(400).json({ message: "Passwords do not match!" });
    // }
    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // if (!isStrongPassword(password)) {
        //   return res.status(400).json({
        //     message:
        //       "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a number.",
        //   });
        // }

        if (!isStrongPassword(password)) {
            return res
                .status(400)
                .json({ message: "Password must be 8 characters or longer" });
        }

        const hashedPassword = await bcrypt.hash(password, 13);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET
        );
        //*****novo */
        // const refreshToken = jwt.sign(
        //   { id: user._id, email: user.email },
        //   process.env.JWT_SECRET
        // );
        //*****bis hier */

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 60 * 60 * 1000,
            sameSite: "strict",
        });

        // res.cookie("rememberMe", rememberMe, {
        // res.cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   secure: process.env.NODE_ENV === "production",
        //   maxAge: 5 * 60 * 60 * 1000,
        //   sameSite: "strict",
        // });

        // console.log("Register successful");

        //dali ovde vo ovoj res treba da dadam pveke podatoci za userot?
        //token ne e potreben, vaka koga se zacuvuva vo local storage
        //od tuka go brisam token
        res.status(201).json({
            message: "User registered",
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        // Проверка дали корисникот постои , ovoj user ima so wie so id nummer
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Генерирање на JWT токен , so jwt go pretvoram mojot id , tokenot mi e ist so mojot id
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: rememberMe ? "5d" : "1h",
            }
        );

        const refreshToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: rememberMe ? "5d" : "7d",
            }
        );

        //   const accessToken = createAccessToken(user._id);
        //   const refreshToken = createRefreshToken(user._id);

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 60 * 60 * 1000,
            sameSite: "strict",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 5 * 60 * 60 * 1000,
            sameSite: "strict",
        });

        console.log("Login successful");

        res.status(200).json({
            message: "Login successful",
            success: true,
            user,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// export const refreshToken = async (req, res) => {
//   const { refreshToken } = req.cookies;

//   if (!refreshToken) {
//     return res.status(401).json({ message: "No refresh token provided" });
//   }

//   try {
//     const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
//     const newAccessToken = createAccessToken(decoded.id);

//     res.cookie("jwt", newAccessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 1 * 60 * 60 * 1000,
//       sameSite: "strict",
//     });

//     console.log("Token refreshed successfully");
//     res.status(200).json({ newAccessToken });
//   } catch (error) {
//     console.error("Token refresh error:", error);
//     res.status(403).json({ message: "Invalid refresh token" });
//   }
// };

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const newAccessToken = jwt.sign(
            { id: decoded.id, email: decoded.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("jwt", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1 * 60 * 60 * 1000,
            sameSite: "strict",
        });

        console.log("Token refreshed successfully");
        res.status(200).json({ newAccessToken });
    } catch (error) {
        console.error("Token refresh error:", error);
        res.status(403).json({ message: "Invalid refresh token" });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
        });

        console.log("Logout successful");
        res.status(200).json({ message: "Logout successful", success: true });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
