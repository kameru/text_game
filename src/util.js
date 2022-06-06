import fs from 'vite-plugin-fs/browser';

export const getScenarioText = async (filename) => {
    const text = await fs.readFile(`/scenario/${filename}`);
    
    return text.split(/\r\n|\r|\n/);
}
