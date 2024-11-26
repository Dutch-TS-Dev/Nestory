//probably not necessary :)
const apiUrl = import.meta.env.VITE_API_URL;
export const getUser = async () => {
    try {
        const response = await fetch(`${apiUrl}/account/user`, {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to get user");
            //return;
        }
        const data = await response.json();
        // console.log("user", data);
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};
