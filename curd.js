
function saveToCrud(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const mobile = event.target.mobile.value;

    const obj = {
        name,
        email,
        mobile
    }
    axios.post("https://crudcrud.com/api/a698b7e75c0647e181bc7ff06c2469fc/appointmentData", obj)
        .then((response) => {
            showNewUserOnScreen(response.data)
            console.log(response)
        })
        .catch((err) => console.log(err))

}

function showNewUserOnScreen(user) {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mobile').value = '';


    const parentNode = document.getElementById('users');
    const childHTML = `<li id= ${user._id}> ${user.name} -${user.email}
                     <button onclick= deleteUser('${user._id}')>Delete User</button>
                     <button onclick= editUserDetails('${user._id}','${user.email}','${user.name}','${user.mobile}')>Edit</button>
                     </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}


window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/a698b7e75c0647e181bc7ff06c2469fc/appointmentData")
        .then((response) => {

            for (let i = 0; i < response.data.length; i++) {
                showNewUserOnScreen(response.data[i])
            }
        })
        .catch((err) => console.log(err))
})


//Delete User
function deleteUser(id) {
    axios.delete(`https://crudcrud.com/api/a698b7e75c0647e181bc7ff06c2469fc/appointmentData/${id}`)
        .then((res) => {
            console.log(res)
            removeUserFromScreen(id)
        })
}

//Delete user from screen
function removeUserFromScreen(Id) {
    const parentNode = document.getElementById('users');
    const childNodeToDelete = document.getElementById(Id);
    if (childNodeToDelete) {
        parentNode.removeChild(childNodeToDelete)
    }
}


//Edit user
function editUserDetails(id, email, name, mobile) {
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('mobile').value = mobile;

    deleteUser(id)
}