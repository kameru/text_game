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
    while (texts.length > 0) {
        let text = texts.shift();
        if (text.startsWith('>')) {
            const buttons = [];
            let index = 0;
            while (text && (text.startsWith('>') || text.startsWith(':') || text.startsWith(';'))) {
                if (text.startsWith('>')) {
                    buttons[index] = {};
                    buttons[index].text = text.replace('>', '');
                    text = texts.shift();
                } else {
                    buttons[index].next = text.startsWith(':') ? {type: TEXT_TYPE.TEXT, text: text.replace(':', '')}
                    : text.startsWith(';') ? {type: TEXT_TYPE.JUMP, label: text.replace(';', '')} : null;
                    index++;
                    text = texts.shift();
                }
            }
            result.push({
                type: TEXT_TYPE.CHOICE,
                buttons: buttons
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