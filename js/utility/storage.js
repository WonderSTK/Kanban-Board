// Simple wrapper for localStorage with JSON parsing
export const storage = {
    // Get and parse stored data
    get(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    },

    // Stringify and store data
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};