const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

const port = process.env.PORT || 3000;


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('inicio');
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
})