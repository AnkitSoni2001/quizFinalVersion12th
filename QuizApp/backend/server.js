const connectToMongo = require('./db');
const express = require('express')
const authRouter = require('./routes/auth')
const quizRouter = require('./routes/quiz')
const cors = require('cors')

require('dotenv').config(); // Load environment variables

const app = express()
const port = process.env.PORT || 1000; // Use the PORT from .env, or default to 1000 if not specified

app.use(cors())
app.use(express.json())// Middleware to parse JSON request bodies

// Available Routes
app.use('/api/auth', authRouter)
app.use('/api/quiz', quizRouter)


connectToMongo();

app.listen(port, () => {
  console.log(`quiz backend listening on port ${port}`)
})






// const connectToMySQL = require('./db');
// const express = require('express');
// const authRouter = require('./routes/auth');
// const quizRouter = require('./routes/quiz');
// const cors = require('cors');

// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 1000;

// app.use(cors());
// app.use(express.json());

// // Available Routes
// app.use('/api/auth', authRouter);
// app.use('/api/quiz', quizRouter);

// (async () => {
//   try {
//     const mysqlConnection = await connectToMySQL();

//     app.locals.mysqlConnection = mysqlConnection;

//     app.listen(port, () => {
//       console.log(`Quiz backend listening on port ${port}`);
//     });
//   } catch (error) {
//     console.error('An error occurred while connecting to MySQL:', error.message);
//   }
// })();



