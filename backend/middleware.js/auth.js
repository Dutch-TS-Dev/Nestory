import { verifyJwt } from "../controllers/authControllers.js";
import dotenv from "dotenv";
dotenv.config();

//ovaa funkcija ima uloga samo da go zacuva user id
//**funcionira 1*/
export const authorize = async (req, res, next) => {
  let token = req.cookies.jwt; //go zimam nadvor od cookie kutija
  //***funcionira1 */
  //   if (!token) {
  //     return res.status(401).json({ message: "Unauthorized, token not found" });
  //   }

  //   try {
  //     const decodedToken = verifyJwt(token);
  //     //se zacuvuva vo req.user, ne kako do sega req.body

  //     // req.user = decodedToken; // attach user to request object
  //     req.user = { id: decodedToken.id };
  //   } catch (error) {
  //     console.log("Token verification failed:", error);
  //     return res
  //       .status(401)
  //       .json({ message: "Unauthorized, verification fails" });
  //   }

  //   next();
  // };
  //****funcionira2 */
  if (!token) {
    try {
      const response = await fetch("/refresh-token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refreshToken=${req.cookies.refreshToken}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      token = data.newAccessToken;
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  try {
    const decodedToken = verifyJwt(token);
    req.user = { id: decodedToken.id };
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
//****funcionira2 */
