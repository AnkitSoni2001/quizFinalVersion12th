const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectToMongo = async () => {
    const mongoURI = process.env.MONGO_URI;

    try{
        await mongoose.connect(mongoURI, (err)=>{
            if(err){
                console.log(err);
            }
            console.log('connected to mongo Successfully')
    })
    }catch(err){
        console.log(err)

    }
}

module.exports = connectToMongo;


// const mysql = require('mysql2');
// require('dotenv').config();

// const connectToMySQL = async () => {
//     const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
//     try {
//         const connection = await mysql.createConnection({
//             host: DB_HOST,
//             user: DB_USER,
//             password: DB_PASSWORD,
//             database: DB_DATABASE,
//         });

//         await connection.connect();
//         console.log('Connected to MySQL database successfully');
//         return connection;
//     } catch (error) {
//         console.error('MySQL Connection Error:', error.message);
//         throw error;
//     }
// };

// module.exports = connectToMySQL;



