const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    res.render('inicio');
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
})