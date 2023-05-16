import translate from 'translate';

// Translation
translate.engine = 'google'; // "google", "yandex", "libre", "deepl"

export const translateText = async text => await translate(`${text}`, 'uk');
