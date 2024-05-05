const express = require('express');
const clocksRouter = require('./src/routes/clocks');
const necklacesRouter = require('./src/routes/necklaces');
const ringsRouter = require('./src/routes/rings');
const braceletsRouter = require('./src/routes/bracelets');

const app = express();

app.use(express.json());
app.use('/clocks', clocksRouter);
app.use('/necklaces', necklacesRouter);
app.use('/rings', ringsRouter);
app.use('/bracelets', braceletsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});