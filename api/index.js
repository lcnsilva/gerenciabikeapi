import express from 'express'

const app = express();
const PORT = 3000;

app.get('/', (req,res) => {
    res.send("test")
})

app.listen(PORT, () => {
    console.log(`Servidor escutando em http://localhost:${PORT}`);
});
