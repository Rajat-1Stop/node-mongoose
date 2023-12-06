const config = {
    APP_ENV: process.env.APP_ENV,
    APP_URL: process.env.APP_URL,
    
    DB: {
        URL: process.env.DB_URL,
    },

    JWT: {
        SECRET: process.env.JWT_SECRET_KEY,
        EXPIRES: process.env.JWT_EXPIRE_TIME,
        ALGORITHM: process.env.JWT_HASH_ALGO,
    },
};

console.log("===== ", process.env.DB_URL)

module.exports = config;
