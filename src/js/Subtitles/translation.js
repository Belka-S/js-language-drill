import translate from 'translate';
import { refs } from '../markup/refs';

// Translation
translate.engine = 'google'; // "google", "yandex", "libre", "deepl"

export const translateText = async (text, language) =>
  await translate(`${text}`, { from: language, to: 'uk' });
