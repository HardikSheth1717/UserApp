const User = require('../models/user');

module.exports.getUserList = (request, response, next) => {
    const user = new User();
    const users = user.getUserList();

    response.writeHead(200, { 'Content-Type': 'text/html' });

    let htmlString = `
        <h1>User List</h1>
        <ul>
    `;

    users.forEach(user => {
        htmlString += `<li>
            <a href="/userdetail/${user.id}">${user.firstName} ${user.lastName}</a>
            <a href="/viewuser/${user.id}">Delete</a>
        </li>`;
    });

    htmlString += `</ul>`;
    htmlString += `
        <a href="/">Home</a>
        <a href="/add-user">Add user</a>
    `;

    response.write(htmlString);
    return response.end();
}

module.exports.getUserDetails = (request, response, next) => {
    const userId = parseInt(request.params.userId);

    const userModel = new User();
    const user = userModel.getUserDetails(userId);

    response.writeHead(200, { 'Content-Type': 'text/html' });

    let htmlString = `
        <h1>Edit User</h1>
        <form action="/saveUser" method="POST">
            <label for="firstName">First name:</label>
            <input type="text" name="firstName" value="${user.firstName}" />
            <label for="lastName">Last name:</label>
            <input type="text" name="lastName" value="${user.lastName}" />
            <label for="age">Age:</label>
            <input type="text" name="age" value="${user.age}" />
            <label for="gender">Gender:</label>
            <select name="gender">
                <option value="Male" ${user.gender === 'Male' ? "Selected" : ""}>Male</option>
                <option value="Female" ${user.gender === 'Female' ? "Selected" : ""}>Female</option>
            </select>
            <input type="hidden" name="id" value="${user.id}" />
            <button type="submit">Update user</button>

            <a href="/">Home</a>
            <a href="/users">User list</a>
        </form>
    `;

    response.write(htmlString);
    return response.end();
}

module.exports.addNewUser = (request, response, next) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });

    let htmlString = `
        <h1>Add User</h1>
        <form action="/saveUser" method="POST">
            <label for="firstName">First name:</label>
            <input type="text" name="firstName" />
            <label for="lastName">Last name:</label>
            <input type="text" name="lastName" />
            <label for="age">Age:</label>
            <input type="text" name="age" />
            <label for="gender">Gender:</label>
            <select name="gender">
                <option value="Male" Selected>Male</option>
                <option value="Female">Female</option>
            </select>
            <input type="hidden" name="id" value="0" />
            <button type="submit">Add user</button>

            <a href="/">Home</a>
            <a href="/users">User list</a>
        </form>
    `;

    response.write(htmlString);
    return response.end();
}

module.exports.saveUser = (request, response, next) => {
    const postedData = request.body;

    const userModel = new User();
    const newId = userModel.saveUser(postedData.id, postedData.firstName, postedData.lastName, postedData.age, postedData.gender);

    if (newId > 0) {
        response.writeHead(302, { 'Location': `/users` });
        return response.end();
    } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(`<p>User not saved :(`);
        response.write(`
            <a href="/">Home</a>
            <a href="/users">User list</a>
        `);
        return response.end();
    }
}

module.exports.viewUserDetails = (request, response, next) => {
    const userId = parseInt(request.params.userId);

    const userModel = new User();
    const user = userModel.getUserDetails(userId);

    response.writeHead(200, { 'Content-Type': 'text/html' });

    let htmlString = `
        <h1>Delete User</h1>
        <form action="/deleteUser" method="POST">
            <p>Are you sure you want to delete this user?</p>
            <label>First name:</label>
            <label>${user.firstName}"</label>
            <label>Last name:</label>
            <label>${user.lastName}"</label>
            <label>Age:</label>
            <label>${user.age}"</label>
            <label>Gender:</label>
            <label>${user.gender}"</label>
            <input type="hidden" name="id" value="${user.id}" />
            <button type="submit">Delete</button>

            <a href="/">Home</a>
            <a href="/users">User list</a>
        </form>
    `;

    response.write(htmlString);
    return response.end();
}

module.exports.deleteUser = (request, response, next) => {
    const userId = parseInt(request.body.id);
    
    const userModel = new User();
    const newId = userModel.deleteUser(userId);

    if (newId > 0) {
        response.writeHead(302, { 'Location': `/users` });
        return response.end();
    } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(`<p>User not deleted :(`);
        response.write(`
            <a href="/">Home</a>
            <a href="/users">User list</a>
        `);
        return response.end();
    }
}