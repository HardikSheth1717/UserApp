module.exports.getHomePage = (request, response, next) => {
    response.write(`<h1>User mangement system</h1>`);
    response.write(`
        <a href="/add-user">Add user</a>
        <a href="/users">User list</a>
    `);
    return response.end();
}

module.exports.get404Page = (request, response, next) => {
    response.write(`<h1>404 - Page not found</h1>`);
    response.write(`
        <a href="/">Home</a>
    `);
    return response.end();
}