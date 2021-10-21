//getAllProducts

export const getAllProducts = async () => {
    let data = await fetch("http://localhost:5002/products");
    let products = await data.json();
    return products;
} 
export const addProduct = async (product) => {
            await fetch("http://localhost:5002/products/", {
                method: "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
        };

export const editProduct = async (id, product) => {
            await fetch("http://localhost:5002/products/"+id, {
                method: "PUT",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
        };

        //findProductById
export const findProductById = async (id) => {
    let data = await fetch("http://localhost:5002/products?id="+id);
    let product = await data.json();
    return product;
}