process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB = "";

if(process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017";
}


process.env.urlDB = urlDB;


process.env.token_expiration = '48h';


process.env.SEED_AUTENTICATION = process.env.SEED_AUTENTICATION || 'este-es-el-seed-de-desarrollo'; 