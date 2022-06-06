import axios from 'axios';
import { TEXT_TYPE } from './const/const';

export const getScenarioText = async (filename) => {
    let text = ''
    await axios.get(`${import.meta.env.BASE_URL}/scenario/${filename}`).then(({data}) => {
        text = data;
    });
    
    return text.split(/\r\n|\r|\n/);
}

export const parseScenario = (texts) => {
    const result = [];
    for (let text of texts) {
        if (text.startsWith('>')) {
            result.push({
                type: TEXT_TYPE.CHOICE,
                text: text.replace('>', '')
            });
        } else {
            result.push({
                type: TEXT_TYPE.TEXT,
                text: text
            });
        }
    }

    return result;
}