import express from "express";
import path from "node:path";
import cors from "cors";
import cron from "node-cron";
import updateDataCup from "./worldcup.js";
import {getSelecoes, getGrupos, getCupData} from "./interfaceDB.js";

const dirname = import.meta.dirname;
const PORT = 3666;

const app = express();
app.use(cors());
app.use(express.static(path.join(dirname, 'public')));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`🏃💨 Server running on http://localserver:${PORT} 🚪`);
});

app.get('/api/selecoes', async (req, res) => {
    try {
        const selecoes = await getSelecoes();
        res.json(selecoes);
    } catch (error) {
        console.error(`❌ Error reading teams: ${error}`);
        res.status(500).send(`Deu ruim ❌: tente novamente mais tarde!`);
    }
});

app.get('/api/grupos', async (req, res) => {
    try {
        const grupos = await getGrupos();
        res.json(grupos);
    } catch (error) {
        console.error(`❌ Error reading teams: ${error}`);
        res.status(500).send(`Deu ruim ❌: tente novamente mais tarde!`);
    }
});

app.get('/api/cup', async (req, res) => {
    try {
        const cupData = await getCupData();
        res.json(cupData);
    } catch (error) {
        console.error(`❌ Error reading teams: ${error}`);
        res.status(500).send(`Deu ruim ❌: tente novamente mais tarde!`);
    }
});

app.post('/api/atualizar', async (req, res) => {
    const result = await updateDataCup();
    if(result.success) {
        res.json({ message: 'World Cup Data Base updated!' });
    } else {
        res.status(500).json({ error: 'Fail on synchronizing.' });
    }
});

// Agendamento: Roda todo dia à meia-noite
//cron.schedule('0 0 * * *', updateDataCup());