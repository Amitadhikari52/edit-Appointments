function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const mobile = event.target.mobile.value;

    const obj = {
        name,
        email,
        mobile
    }
    localStorage.setItem(obj.email, JSON.stringify(obj));
    showNewUserOnScreen(obj);
}

function showNewUserOnScreen(user) {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mobile').value = '';

    if (localStorage.getItem(user.email) !== null) {
        removeUserFromScreen(user.email)
    }

    const parentNode = document.getElementById('users');
    const childHTML = `<li id= ${user.email}> ${user.name} -${user.email}
                     <button onclick= deleteUser('${user.email}')>Delete User</button>
                     <button onclick= editUserDetails('${user.email}','${user.name}','${user.mobile}')>Edit</button>
                     </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localstoragekeys = Object.keys(localStorageObj)

    for (var i = 0; i < localstoragekeys.length; i++) {
        const key = localstoragekeys[i]
        const userDetailsString = localStorageObj[key];
        const userDetailsObj = JSON.parse(userDetailsString);
        showNewUserOnScreen(userDetailsObj)
    }
})


//Delete User
function deleteUser(emailId) {
    localStorage.removeItem(emailId);
    removeUserFromScreen(emailId)
}

//Delete user from screen
function removeUserFromScreen(emailId) {
    const parentNode = document.getElementById('users');
    const childNodeToDelete = document.getElementById(emailId);
    if (childNodeToDelete) {
        parentNode.removeChild(childNodeToDelete)
    }
}


//Edit user
function editUserDetails(email, name, mobile) {
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('mobile').value = mobile;

    deleteUser(email)
}