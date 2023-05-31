import translate from 'translate';
import { refs } from '../markup/refs';

// Translation
translate.engine = 'google'; // "google", "yandex", "libre", "deepl"

const language = refs.langSelect.value;

export const translateText = async text => await translate(`${text}`, { from: language, to: 'uk' });
