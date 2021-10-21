export const findShipmentsByArea = async (area) => {
    let data = await fetch("http://localhost:5002/shipment?area="+area);
    let shipments = await data.json();
    return shipments;
}
export const editShipment = async (id, ShipmentDetails) => {
            await fetch("http://localhost:5002/shipment/"+id, {
                method: "PUT",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(ShipmentDetails),
            });
        };

export const findShipmentsById = async (id) => {
    let data = await fetch("http://localhost:5002/shipment?id="+id);
    let shipments = await data.json();
    return shipments;
}