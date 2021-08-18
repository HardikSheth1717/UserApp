const path = require('path');
const fileSystem = require('fs');

const rootPath = require('../helpers/path');

const DATA_FILE = path.join(rootPath, 'data', 'user.json');

class User {
    getUserList() {
        return JSON.parse(fileSystem.readFileSync(DATA_FILE));
    }

    getUserDetails(id) {
        const users = JSON.parse(fileSystem.readFileSync(DATA_FILE));
        return users.find(x => parseInt(x.id) === parseInt(id));
    }

    saveUser(id, firstName, lastName, age, gender) {
        try {
            let user = {
                "id": id,
                "firstName": firstName,
                "lastName": lastName,
                "age": age,
                "gender": gender
            };
    
            let users = [];
            users = JSON.parse(fileSystem.readFileSync(DATA_FILE));
    
            if (parseInt(id) > 0) {
                const userIndex = users.findIndex(x => x.id === parseInt(id));
                users[userIndex] = user;
            } else {
                let newId = users.length > 0 ? parseInt(users[users.length - 1].id) + 1 : 1;
                user.id = newId;
                users.push(user);
                id = newId;
            }
    
            fileSystem.writeFileSync(DATA_FILE, JSON.stringify(users));
    
            return parseInt(id);
        }
        catch(ex) {
            console.log(ex);
            return 0;
        }
    }

    deleteUser(id) {
        try {
            let users = [];
            users = JSON.parse(fileSystem.readFileSync(DATA_FILE));
    
            const updatedUsers = users.filter(x => parseInt(x.id) !== parseInt(id));
    
            fileSystem.writeFileSync(DATA_FILE, JSON.stringify(updatedUsers));
    
            return parseInt(id);
        }
        catch(ex) {
            return 0;
        }
    }
}

module.exports = User;