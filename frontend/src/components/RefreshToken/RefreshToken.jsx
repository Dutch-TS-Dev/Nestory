import { useEffect } from "react";
const useRefreshToken = () => {
  const refreshToken = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/refresh", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
      });

      const data = await response.json();

      if (data.newAccessToken) {
        console.log("Access token refreshed:", data.newAccessToken);

        // Update the access token in the application state or memory
        // Example: Storing the token in a global state (context, redux, or local variable)
        localStorage.setItem("accessToken", data.newAccessToken);
      } else {
        console.error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    // Set an interval to refresh the token periodically
    // const interval = setInterval(refreshToken, 55 * 1000);
    const interval = setInterval(() => {
      refreshToken();
    }, 60 * 60 * 1000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
};

export default useRefreshToken;
