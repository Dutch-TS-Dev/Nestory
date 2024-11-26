// Function to format the date as "17.11.2024"
export const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-EN", options);
};

// Function to format the date as "17 November 2024"
export const formatDateLong = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-EN", options);
};
