export const getAllAreas = async () => {
    let data = await fetch("http://localhost:5002/areas");
    let areas = await data.json();
    return areas;
} 