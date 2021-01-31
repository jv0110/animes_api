require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const AnimesRouter = require('./src/routes/animes_route');
const GenresRouter = require('./src/routes/genres_router');
const UsersRouter = require('./src/routes/users_router');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).json({
    message: "Animes API",
    version: 1.0
  });
});
app.use(AnimesRouter);
app.use(GenresRouter);
app.use(UsersRouter);

app.listen(process.env.PORT, () => {
  return console.log("Server started :)");
});