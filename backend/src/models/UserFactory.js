const User = require('./User');

class AdminUser extends User {
    // Agrega aquí cualquier funcionalidad o propiedades específicas de los administradores
}

class RegularUser extends User {
    // Agrega aquí cualquier funcionalidad o propiedades específicas de los usuarios regulares
}

function createUser(role, userData) {
    switch (role) {
        case 'ADMIN':
            return new AdminUser(userData);
        case 'USER':
        default:
            return new RegularUser(userData);
    }
}

module.exports = createUser;
