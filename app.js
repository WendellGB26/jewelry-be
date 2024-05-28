const express = require('express');
const cors = require('cors')
const clocksRouter = require('./src/routes/clocks');
const necklacesRouter = require('./src/routes/necklaces');
const ringsRouter = require('./src/routes/rings');
const braceletsRouter = require('./src/routes/bracelets');
const earringsRouter = require('./src/routes/earrings')
const userRouter = require('./src/routes/user')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/clocks', clocksRouter);
app.use('/necklaces', necklacesRouter);
app.use('/rings', ringsRouter);
app.use('/bracelets', braceletsRouter);
app.use('/earrings', earringsRouter);
app.use('/users', userRouter);

const PORT = process.env.DEV_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});