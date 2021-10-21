export const addOrder = async (orderDestails) => {
            await fetch("http://localhost:5002/orders", {
                method: "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(orderDestails),
            });
        };