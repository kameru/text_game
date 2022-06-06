import axios from 'axios';
import { TEXT_TYPE } from './const/const';

export const getScenarioText = async (filename) => {
    let text = ''
    await axios.get(`/scenario/${filename}`).then(({data}) => {
        text = data;
    });
    
    return text.split(/\r\n|\r|\n/);
}
