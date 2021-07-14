// Define if it's day or night
const getHour = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 7 ? "night" : "day";
}

// Export
export default getHour;





