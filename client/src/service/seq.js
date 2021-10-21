export const getSeq = async () => {
    let data = await fetch("http://localhost:5002/seq");
    let seq = await data.json();
    return seq;
} 
export const editSeq = async ( seq) => {
            await fetch("http://localhost:5002/seq/", {
                method: "PUT",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(seq),
            });
        };
