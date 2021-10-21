//getAllUsers

export const getAllUsers = async () => {
    let data = await fetch("http://localhost:5002/users");
    let users = await data.json();
    return users;
} 

//addUser

export const addUser = async (userDetails) => {
    console.log(userDetails)
            await fetch("http://localhost:5002/users", {
                method: "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });
        };

//findUser

export const findUser = async (email, password) => {
    let data = await fetch("http://localhost:5002/users?email="+email+"&password="+password);
    let user = await data.json();
    return user;
}

//findUserByEmail
export const findUserByEmail = async (email) => {
    let data = await fetch("http://localhost:5002/users?email="+email);
    let user = await data.json();
    return user;
}
//findUserById
export const findUserById = async (id) => {
    let data = await fetch("http://localhost:5002/users?id="+id);
    let user = await data.json();
    return user;
}

//editUser

export const editUser = async (id, userDetails) => {
            await fetch("http://localhost:5002/users/"+id, {
                method: "PUT",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
            });
        };
//deleteUser

// export const deleteUser= async (id, userDetails) => {
//             await fetch("http://localhost:5002/users/"+id, {
//                 method: "DELETE",
//                 headers: {
//                    "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(),
//             });
//         };



