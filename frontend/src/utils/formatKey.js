// Converts a key like "firstName" to "First name". Used for rendering section and field names
export const formatKey = (key) => {
    return key
        .replace(/([A-Z])/g, " $1") // Adds a space before each uppercase letter
        .replace(/^./, (str) => str.toUpperCase()) // Capitalizes the first letter
        .replace(/ (.)/, (str) => str.toLowerCase()); // Lowercases the second letter if it follows a space
};
