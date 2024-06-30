const express = require('express');
const cors = require('cors');
const Blockchain = require('./src/blockchain');
const Block = require('./src/block');

const app = express();
const port = 3000;

let blockchain = new Blockchain();

app.use(express.json());
app.use(cors()); // Habilita CORS para todas las rutas

app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.post('/addBlock', async (req, res) => {
    const { data } = req.body;
    const newBlock = new Block({ data });
    await blockchain.addBlock(newBlock);
    res.json(newBlock);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
