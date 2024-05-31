import 'dotenv/config'
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
})

app.get('**', (req, res) => {
    res.status(404).send('No existe la pagina consultada');
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor funcionando en http://localhost:' + PORT))
