const mongoose = require('mongoose');

let validatedRols = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} is not a valid rol'
}
