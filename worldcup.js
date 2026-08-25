import cors from "cors";
import fs from "node:fs";
import 'dotenv/config';

const dataFile = './bancoDados/dados-copa.json';
const API_KEY = process.env.MY_RAPID_API_KEY;
const API_HOST = process.env.RAPID_API_HOST;

export default async function updateDataCup() {
    console.log('🔄 Updating Data from World Cup 2026 Live API... 🛠️ ');
    const headers = {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
    };
    try {
        const [resGrupos, resJogos] = await Promise.all([
            fetch('https://world-cup-2026-live-api.p.rapidapi.com/wc/standings', { headers }),
            fetch('https://world-cup-2026-live-api.p.rapidapi.com/wc/draw?stage=group', { headers })
        ]);
        if (!resGrupos.ok || !resJogos.ok) {
            throw new Error('Error comunicating with API.');
        }
        const dadosGrupos = await resGrupos.json();
        const dadosJogos = await resJogos.json();
        const localDataBase = {
            atualizadoEm: new Date().toISOString(),
            grupos: dadosGrupos.data,
            jogos: dadosJogos.data
        };
        fs.writeFileSync(dataFile, JSON.stringify(localDataBase, null, 2));
        console.log('✅ Local Data Base was updated successfully. 🛢️');
        return { success: true};
    } catch (error) {
        console.error('❌ Fail to update database: ', error);
        return { success: false, error: error.message };
    }
}