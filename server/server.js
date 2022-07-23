const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

dotenv.config();

// Atlas :
// const DB_URL = process.env.DB_CONNECTION.replace(
//   '<password>',
//   process.env.DB_PASSWORD
// );

// Local :
const DB_URL = process.env.DB_LOCAL;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'houmti',
  })
  .then(() => console.log('DB connected successfully'))
  .catch(() => console.log('DB connection failed !'));

mongoose.connection.on('error', (err) => {
  console.log('DB Error !', err);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App Running on port ${PORT}`);
});
