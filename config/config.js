import dotenv from 'dotenv';
dotenv.config();

const config = {
    port : process.env.PORT || 3360,
    database : {
        host : process.env.DB_HOST,
        name : process.env.DB_NAME,
        user :process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        dialect : process.env.DB_DIALECT || 'mysql',
    },
    
    jwt : {
        secret : process.env.JWT_SECRET,
        expiresIn : process.env.JWT_EXPIRY,
    }
}

export default config;
