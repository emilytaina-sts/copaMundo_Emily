import fs from "node:fs/promises";
import path from "node:path";

const dirname = import.meta.dirname;
const dataBase = 'bancoDados';
const fileSelecoes = 'selecoes.json';
const fileGrupos = 'grupos.json';
const fileCupData = 'dados-copa.json';

export async function getSelecoes() {
    return await readDataBase(fileSelecoes);
}

export async function getGrupos() {
    return await readDataBase(fileGrupos);
}

export async function getCupData() {
    return await readDataBase(fileCupData);
}

async function readDataBase(fileName) {
    try {
        const filePath = path.join(dirname, dataBase, fileName);
        const rawData = await fs.readFile(filePath, 'utf-8');
        const data = await JSON.parse(rawData);
        return data;
    } catch (error) {
        console.error(`❌ Error reading database: ${error}`);
        return [];
    }
}
