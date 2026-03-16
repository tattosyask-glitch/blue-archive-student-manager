import { NAME_DICTIONARY } from '../constants';

const toKatakana = (text: string): string => {
    const input = (text || '').toLowerCase();
    if (!input) return text;

    const map: { [key: string]: string } = {
        'kya': 'キャ', 'kyu': 'キュ', 'kyo': 'キョ',
        'gya': 'ギャ', 'gyu': 'ギュ', 'gyo': 'ギョ',
        'sha': 'シャ', 'shu': 'シュ', 'sho': 'ショ',
        'sya': 'シャ', 'syu': 'シュ', 'syo': 'ショ',
        'ja': 'ジャ', 'ju': 'ジュ', 'jo': 'ジョ',
        'jya': 'ジャ', 'jyu': 'ジュ', 'jyo': 'ジョ',
        'cha': 'チャ', 'chu': 'チュ', 'cho': 'チョ',
        'cya': 'チャ', 'cyu': 'チュ', 'cyo': 'チョ',
        'tya': 'チャ', 'tyu': 'チュ', 'tyo': 'チョ',
        'nya': 'ニャ', 'nyu': 'ニュ', 'nyo': 'ニョ',
        'hya': 'ヒャ', 'hyu': 'ヒュ', 'hyo': 'ヒョ',
        'bya': 'ビャ', 'byu': 'ビュ', 'byo': 'ビョ',
        'pya': 'ピャ', 'pyu': 'ピュ', 'pyo': 'ピョ',
        'mya': 'ミャ', 'myu': 'ミュ', 'myo': 'ミョ',
        'rya': 'リャ', 'ryu': 'リュ', 'ryo': 'リョ',
        'fa': 'ファ', 'fi': 'フィ', 'fe': 'フェ', 'fo': 'フォ', 'fyu': 'フュ',
        'va': 'ヴァ', 'vi': 'ヴィ', 've': 'ヴェ', 'vo': 'ヴォ', 'vu': 'ヴ',
        'tsu': 'ツ', 'shi': 'シ', 'chi': 'チ',
        'ka': 'カ', 'ki': 'キ', 'ku': 'ク', 'ke': 'ケ', 'ko': 'コ',
        'ga': 'ガ', 'gi': 'ギ', 'gu': 'グ', 'ge': 'ゲ', 'go': 'ゴ',
        'sa': 'サ', 'si': 'シ', 'su': 'ス', 'se': 'セ', 'so': 'ソ',
        'za': 'ザ', 'zi': 'ジ', 'zu': 'ズ', 'ze': 'ゼ', 'zo': 'ゾ',
        'ta': 'タ', 'ti': 'チ', 'tu': 'ツ', 'te': 'テ', 'to': 'ト',
        'da': 'ダ', 'di': 'ヂ', 'du': 'ヅ', 'de': 'デ', 'do': 'ド',
        'na': 'ナ', 'ni': 'ニ', 'nu': 'ヌ', 'ne': 'ネ', 'no': 'ノ',
        'ha': 'ハ', 'hi': 'ヒ', 'hu': 'フ', 'fu': 'フ', 'he': 'ヘ', 'ho': 'ホ',
        'ba': 'バ', 'bi': 'ビ', 'bu': 'ブ', 'be': 'ベ', 'bo': 'ボ',
        'pa': 'パ', 'pi': 'ピ', 'pu': 'プ', 'pe': 'ペ', 'po': 'ポ',
        'ma': 'マ', 'mi': 'ミ', 'mu': 'ム', 'me': 'メ', 'mo': 'モ',
        'ya': 'ヤ', 'yu': 'ユ', 'yo': 'ヨ',
        'ra': 'ラ', 'ri': 'リ', 'ru': 'ル', 're': 'レ', 'ro': 'ロ',
        'wa': 'ワ', 'wi': 'ウィ', 'we': 'ウェ', 'wo': 'ヲ',
        'a': 'ア', 'i': 'イ', 'u': 'ウ', 'e': 'エ', 'o': 'オ'
    };

    const keysByLength = Object.keys(map).sort((a, b) => b.length - a.length);
    const isVowel = (c: string) => ['a', 'i', 'u', 'e', 'o'].includes(c);

    let i = 0;
    let out = '';
    while (i < input.length) {
        const c = input[i];

        if (c === '_' || c === ' ' || c === '-') {
            i += 1;
            continue;
        }

        // 促音
        if (
            i + 1 < input.length &&
            input[i] === input[i + 1] &&
            !isVowel(input[i]) &&
            input[i] !== 'n'
        ) {
            out += 'ッ';
            i += 1;
            continue;
        }

        // ん
        if (c === 'n') {
            const next = input[i + 1];
            if (!next) {
                out += 'ン';
                i += 1;
                continue;
            }
            if (next === 'n') {
                out += 'ン';
                i += 2;
                continue;
            }
            if (!isVowel(next) && next !== 'y') {
                out += 'ン';
                i += 1;
                continue;
            }
        }

        let matched = false;
        for (const key of keysByLength) {
            if (input.startsWith(key, i)) {
                out += map[key];
                i += key.length;
                matched = true;
                break;
            }
        }
        if (matched) continue;

        out += input[i];
        i += 1;
    }

    return out || text;
};

const translateStudentName = (englishName: string): string => {
    const lowerName = (englishName || '').toLowerCase();
    if (lowerName === 'terror') {
        return '＊テラー';
    }
    if (lowerName.endsWith('terror') && lowerName.length > 'terror'.length) {
        const base = lowerName.slice(0, -'terror'.length);
        const baseTranslated = translateStudentName(base);
        return `${baseTranslated}＊テラー`;
    }
    if (NAME_DICTIONARY[lowerName]) {
        return NAME_DICTIONARY[lowerName];
    }
    return toKatakana(englishName);
};

const translateCostumeName = (englishName: string): string => {
    const lowerName = (englishName || '').toLowerCase();
    if (NAME_DICTIONARY[lowerName]) {
        return NAME_DICTIONARY[lowerName];
    }
    return toKatakana(englishName);
};

export const parseFileName = (fileName: string) => {
    const parts = fileName.split('_');
    const rawName = (parts[0] || '').trim();
    const rawCostume = (parts.length >= 2 ? parts.slice(1).join('_') : 'default').trim();

    const normalizedName = rawName.toLowerCase();
    const normalizedCostume = (rawCostume || 'default').toLowerCase();
    const key = `${normalizedName}__${normalizedCostume}`;

    const name = translateStudentName(rawName);
    const costume = normalizedCostume === 'default' ? 'default' : translateCostumeName(rawCostume);

    return { key, name, costume };
};