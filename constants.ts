import { SchoolMap } from './types';

export const NAME_DICTIONARY: { [key: string]: string } = {
    'arona': 'アロナ',
    'sensei': '先生',
    'miku': '初音ミク',
    'fina': 'フィーナ',
    'yuzu': 'ユズ',
    'cheria': 'チェリア',
    'tsubaki': 'ツバキ',
    'serina': 'セリナ',
    'himari': 'ヒマリ',
    'momo': 'モモ',
    'ayane': 'アヤネ',
    'chinatsu': 'チナツ',
    'saki': 'サキ',
    'miyako': 'ミヤコ',
    'cherino': 'チェリノ',
    'saten': '佐天涙子',
    'syokuho': '食蜂操祈',
    'band': 'バンド',
    'mari': 'マリー',
    'misaka': '御坂美琴',
    'momiji': 'モミジ',
    'hina': 'ヒナ',
    'azusa': 'アズサ',
    'kotori': 'コトリ',
    'haruka': 'ハルカ',
    'haruna': 'ハルナ',
    'mika': 'ミカ',
    'emi': 'エミ',
    'moe': 'モエ',
    'rena': 'レナ',
    'yuki': 'ユキ',
    'shiroko': 'シロコ',
    'kayoko': 'カヨコ',
    'sora': 'ソラ',
    'akane': 'アカネ',
    'nonomi': 'ノノミ',
    'asuna': 'アスナ',
    'koharu': 'コハル',
    'mizuki': 'ミズキ',
    'tsumugi': 'ツムギ',
    'hanako': 'ハナコ',
    'shizuka': 'シズカ',
    'tsurugi': 'ツルギ',
    'sakurako': 'サクラコ',
    'izumi': 'イズミ',
    'ran': 'ラン',
    'kaede': 'カエデ',
    'sara': 'サラ',
    'mashiro': 'マシロ',
    'miyu': 'ミユ',
    'hifumi': 'ヒフミ',
    'izayoi': 'イザヨイ',
    'kanna': 'カンナ',
    'seia': 'セイア',
    'natsu': 'ナツ',
    'koyuki': 'コユキ',
    'mimori': 'ミモリ',
    'meru': 'メル',
    'kirino': 'キリノ',
    'misaki': 'ミサキ',
    'love': 'ラブ',
    'swimsuit': '水着',
    'casual': '私服',
    'uniform': '制服',
    'formal': 'フォーマル',
    'party': 'パーティー',
    'sport': 'スポーツ',
    'training': 'トレーニング',
    'newyear': '正月',
    'christmas': 'クリスマス',
    'halloween': 'ハロウィン',
    'summer': '夏',
    'winter': '冬',
    'spring': '春',
    'autumn': '秋',
    'festival': '祭り',
    'maid': 'メイド',
    'nurse': 'ナース',
    'idol': 'アイドル',
    'racing': 'レーシング',
    'cyber': 'サイバー',
    'traditional': '和装',
    'gym': '体操服',
    'lab': '研究服',
    'cafe': 'カフェ',
    'beach': 'ビーチ',
    'indoor': '室内',
    'outdoor': 'アウトドア',
    'night': '夜',
    'day': '昼',
    'evening': '夕方',
    'morning': '朝',
    'default': 'デフォルト',
    'normal': 'ノーマル',
    'basic': 'ベーシック',
    'original': 'オリジナル',
    'dress': 'ドレス',
    'onsen': '温泉',
    'guide': 'ガイド',
    'parttime': 'アルバイト',
    'bunny': 'バニー',
    'camp': 'キャンプ',
    'cheer': '応援団',
    'pajamas': 'パジャマ',
    'tactical': '臨戦',
    'qipao': 'チーパオ',
    'young': '幼女',
    'magical': 'マジカル',
    'riding': 'ライディング'
};

export const STATIC_SCHOOL_MAP: SchoolMap = {
    // アビドス高等学校
    'ホシノ': { school: 'アビドス高等学校', affiliation: '対策委員会' },
    'シロコ': { school: 'アビドス高等学校', affiliation: '対策委員会' },
    'セリカ': { school: 'アビドス高等学校', affiliation: '対策委員会' },
    'ノノミ': { school: 'アビドス高等学校', affiliation: '対策委員会' },
    'アヤネ': { school: 'アビドス高等学校', affiliation: '対策委員会' },

    // ゲヘナ学園
    'ヒナ':   { school: 'ゲヘナ学園', affiliation: '風紀委員会' },
    'アコ':   { school: 'ゲヘナ学園', affiliation: '風紀委員会' },
    'イオリ': { school: 'ゲヘナ学園', affiliation: '風紀委員会' },
    'チナツ': { school: 'ゲヘナ学園', affiliation: '風紀委員会' },

    'アル':   { school: 'ゲヘナ学園', affiliation: '便利屋68' },
    'ムツキ': { school: 'ゲヘナ学園', affiliation: '便利屋68' },
    'カヨコ': { school: 'ゲヘナ学園', affiliation: '便利屋68' },
    'ハルカ': { school: 'ゲヘナ学園', affiliation: '便利屋68' },

    'ハルナ': { school: 'ゲヘナ学園', affiliation: '美食研究会' },
    'ジュンコ': { school: 'ゲヘナ学園', affiliation: '美食研究会' },
    'イズミ': { school: 'ゲヘナ学園', affiliation: '美食研究会' },
    'アカリ': { school: 'ゲヘナ学園', affiliation: '美食研究会' },

    'フウカ': { school: 'ゲヘナ学園', affiliation: '給食部' },
    'ジュリ': { school: 'ゲヘナ学園', affiliation: '給食部' },

    'セナ':   { school: 'ゲヘナ学園', affiliation: '救急医学部' },

    'メグ':   { school: 'ゲヘナ学園', affiliation: '温泉開発部' },
    'カスミ': { school: 'ゲヘナ学園', affiliation: '温泉開発部' },

    'マコト': { school: 'ゲヘナ学園', affiliation: '万魔殿' },
    'イロハ': { school: 'ゲヘナ学園', affiliation: '万魔殿' },
    'イブキ': { school: 'ゲヘナ学園', affiliation: '万魔殿' },
    'サツキ': { school: 'ゲヘナ学園', affiliation: '万魔殿' },

    'キララ': { school: 'ゲヘナ学園', affiliation: '帰宅部' },
    'エリカ': { school: 'ゲヘナ学園', affiliation: '帰宅部' },

    // トリニティ総合学園
    'ミカ':   { school: 'トリニティ総合学園', affiliation: 'ティーパーティー' },
    'ナギサ': { school: 'トリニティ総合学園', affiliation: 'ティーパーティー' },
    'セイア': { school: 'トリニティ総合学園', affiliation: 'ティーパーティー' },

    'ツルギ': { school: 'トリニティ総合学園', affiliation: '正義実現委員会' },
    'ハスミ': { school: 'トリニティ総合学園', affiliation: '正義実現委員会' },
    'マシロ': { school: 'トリニティ総合学園', affiliation: '正義実現委員会' },
    'イチカ': { school: 'トリニティ総合学園', affiliation: '正義実現委員会' },

    'ヒフミ': { school: 'トリニティ総合学園', affiliation: '補習授業部' },
    'アズサ': { school: 'トリニティ総合学園', affiliation: '補習授業部' },
    'ハナコ': { school: 'トリニティ総合学園', affiliation: '補習授業部' },
    'コハル': { school: 'トリニティ総合学園', affiliation: '補習授業部（元正義実現委員会）' },

    'サクラコ': { school: 'トリニティ総合学園', affiliation: 'シスターフッド' },
    'ヒナタ':   { school: 'トリニティ総合学園', affiliation: 'シスターフッド' },
    'マリ':   { school: 'トリニティ総合学園', affiliation: 'シスターフッド' },
    'マリー':   { school: 'トリニティ総合学園', affiliation: 'シスターフッド' },

    'ミネ':   { school: 'トリニティ総合学園', affiliation: '救護騎士団' },
    'セリナ': { school: 'トリニティ総合学園', affiliation: '救護騎士団' },
    'ハナエ': { school: 'トリニティ総合学園', affiliation: '救護騎士団' },

    'ウイ':   { school: 'トリニティ総合学園', affiliation: '図書委員会' },
    'シミコ': { school: 'トリニティ総合学園', affiliation: '図書委員会' },

    'カズサ': { school: 'トリニティ総合学園', affiliation: '放課後スイーツ部' },
    'ナツ':   { school: 'トリニティ総合学園', affiliation: '放課後スイーツ部' },
    'アイリ': { school: 'トリニティ総合学園', affiliation: '放課後スイーツ部' },
    'ヨシミ': { school: 'トリニティ総合学園', affiliation: '放課後スイーツ部' },

    'スズミ': { school: 'トリニティ総合学園', affiliation: 'トリニティ自警団' },
    'レイサ': { school: 'トリニティ総合学園', affiliation: 'トリニティ自警団' },

    // ミレニアムサイエンススクール
    'ユウカ': { school: 'ミレニアムサイエンススクール', affiliation: 'セミナー' },
    'ノア':   { school: 'ミレニアムサイエンススクール', affiliation: 'セミナー' },
    'コユキ': { school: 'ミレニアムサイエンススクール', affiliation: 'セミナー' },
    'リオ':   { school: 'ミレニアムサイエンススクール', affiliation: 'セミナー' },

    'ネル':   { school: 'ミレニアムサイエンススクール', affiliation: 'C&C' },
    'アスナ': { school: 'ミレニアムサイエンススクール', affiliation: 'C&C' },
    'カリン': { school: 'ミレニアムサイエンススクール', affiliation: 'C&C' },
    'アカネ': { school: 'ミレニアムサイエンススクール', affiliation: 'C&C' },
    'トキ':   { school: 'ミレニアムサイエンススクール', affiliation: 'C&C' },

    'アリス': { school: 'ミレニアムサイエンススクール', affiliation: 'ゲーム開発部' },
    'モモイ': { school: 'ミレニアムサイエンススクール', affiliation: 'ゲーム開発部' },
    'ミドリ': { school: 'ミレニアムサイエンススクール', affiliation: 'ゲーム開発部' },
    'ユズ':   { school: 'ミレニアムサイエンススクール', affiliation: 'ゲーム開発部' },

    'ヒマリ': { school: 'ミレニアムサイエンススクール', affiliation: '特異現象捜査部（ヴェリタス）' },
    'チヒロ': { school: 'ミレニアムサイエンススクール', affiliation: 'ヴェリタス' },
    'マキ':   { school: 'ミレニアムサイエンススクール', affiliation: 'ヴェリタス' },
    'ハレ':   { school: 'ミレニアムサイエンススクール', affiliation: 'ヴェリタス' },

    'ウタハ': { school: 'ミレニアムサイエンススクール', affiliation: 'エンジニア部' },
    'ヒビキ': { school: 'ミレニアムサイエンススクール', affiliation: 'エンジニア部' },
    'コトリ': { school: 'ミレニアムサイエンススクール', affiliation: 'エンジニア部' },

    'エイミ': { school: 'ミレニアムサイエンススクール', affiliation: '特異現象捜査部' },

    'スミレ': { school: 'ミレニアムサイエンススクール', affiliation: 'トレーニング部' },
    'レイ':   { school: 'ミレニアムサイエンススクール', affiliation: '野球部' },

    // 百鬼夜行連合学院
    'チセ':   { school: '百鬼夜行連合学院', affiliation: '陰陽部' },
    'カホ':   { school: '百鬼夜行連合学院', affiliation: '陰陽部' },
    'ニヤ':   { school: '百鬼夜行連合学院', affiliation: '陰陽部' },

    'ツバキ': { school: '百鬼夜行連合学院', affiliation: '修行部' },
    'ミモリ': { school: '百鬼夜行連合学院', affiliation: '修行部' },
    'カエデ': { school: '百鬼夜行連合学院', affiliation: '修行部' },

    'イズナ': { school: '百鬼夜行連合学院', affiliation: '忍術研究部' },
    'ミチル': { school: '百鬼夜行連合学院', affiliation: '忍術研究部' },
    'ツクヨ': { school: '百鬼夜行連合学院', affiliation: '忍術研究部' },

    'シズコ':  { school: '百鬼夜行連合学院', affiliation: 'お祭り運営委員会' },
    'フィーナ': { school: '百鬼夜行連合学院', affiliation: 'お祭り運営委員会' },
    'ウミカ':  { school: '百鬼夜行連合学院', affiliation: 'お祭り運営委員会' },

    'ナグサ': { school: '百鬼夜行連合学院', affiliation: '百花繚乱紛争調停委員会' },
    'ユカリ': { school: '百鬼夜行連合学院', affiliation: '百花繚乱紛争調停委員会' },
    'レンゲ': { school: '百鬼夜行連合学院', affiliation: '百花繚乱紛争調停委員会' },
    'キキョウ': { school: '百鬼夜行連合学院', affiliation: '百花繚乱紛争調停委員会' },

    // 山海経高級中学校
    'シュン':  { school: '山海経高級中学校', affiliation: '梅花園' },
    'ココナ':  { school: '山海経高級中学校', affiliation: '梅花園' },

    'サヤ':   { school: '山海経高級中学校', affiliation: '玄武商会' },
    'ルミ':   { school: '山海経高級中学校', affiliation: '玄武商会' },

    'ミナ':   { school: '山海経高級中学校', affiliation: '玄龍門' },
    'キサキ': { school: '山海経高級中学校', affiliation: '玄龍門' },

    // レッドウィンター連邦学園
    'チェリノ': { school: 'レッドウィンター連邦学園', affiliation: 'レッドウィンター事務局' },
    'トモエ':   { school: 'レッドウィンター連邦学園', affiliation: 'レッドウィンター事務局' },
    'マリナ':   { school: 'レッドウィンター連邦学園', affiliation: 'レッドウィンター事務局' },

    'ノドカ': { school: 'レッドウィンター連邦学園', affiliation: '227号特別クラス' },
    'シグレ': { school: 'レッドウィンター連邦学園', affiliation: '227号特別クラス' },

    'ミノリ': { school: 'レッドウィンター連邦学園', affiliation: '工務部' },

    'モミジ': { school: 'レッドウィンター連邦学園', affiliation: '知識解放戦線' },
    'メル':   { school: 'レッドウィンター連邦学園', affiliation: '知識解放戦線' },
    'ヤクモ': { school: 'レッドウィンター連邦学園', affiliation: '知識解放戦線（※イベントNPC）' },

    // ヴァルキューレ警察学校
    'カンナ': { school: 'ヴァルキューレ警察学校', affiliation: '公安局' },
    'キリノ': { school: 'ヴァルキューレ警察学校', affiliation: '生活安全局' },
    'フブキ': { school: 'ヴァルキューレ警察学校', affiliation: '生活安全局' },

    // アリウス分校
    'サオリ': { school: 'アリウス分校', affiliation: 'アリウススクワッド' },
    'アツコ': { school: 'アリウス分校', affiliation: 'アリウススクワッド' },
    'ミサキ': { school: 'アリウス分校', affiliation: 'アリウススクワッド' },
    'ヒヨリ': { school: 'アリウス分校', affiliation: 'アリウススクワッド' },

    // SRT特殊学園
    'ミヤコ': { school: 'SRT特殊学園', affiliation: 'RABBIT小隊' },
    'サキ':   { school: 'SRT特殊学園', affiliation: 'RABBIT小隊' },
    'モエ':   { school: 'SRT特殊学園', affiliation: 'RABBIT小隊' },
    'ミユ':   { school: 'SRT特殊学園', affiliation: 'RABBIT小隊' },

    'ユキノ': { school: 'SRT特殊学園', affiliation: 'FOX小隊' },
    'ニコ':   { school: 'SRT特殊学園', affiliation: 'FOX小隊' },
    'クルミ': { school: 'SRT特殊学園', affiliation: 'FOX小隊' },
    'オトギ': { school: 'SRT特殊学園', affiliation: 'FOX小隊' },

    // 連邦生徒会
    'リン':   { school: '連邦生徒会', affiliation: '行政委員会' },
    'モモカ': { school: '連邦生徒会', affiliation: '交通室' },
    'アユム': { school: '連邦生徒会', affiliation: '調停室' },
    'カヤ':   { school: '連邦生徒会', affiliation: '防衛室' },
    'アオイ': { school: '連邦生徒会', affiliation: '財務室' },
    'ハイネ': { school: '連邦生徒会', affiliation: '体育局' },

    // ハイランダー鉄道学園 / クロノススクール
    'スオウ': { school: 'ハイランダー鉄道学園', affiliation: '中央管制センター' },
    'ヒカリ': { school: 'ハイランダー鉄道学園', affiliation: '監理部' },
    'ノゾミ': { school: 'ハイランダー鉄道学園', affiliation: '監理部' },

    'シノン': { school: 'クロノススクール', affiliation: '報道部' },
    'マイ':   { school: 'クロノススクール', affiliation: '報道部' },

    // 所属なし・その他
    'アロナ': { school: '所属なし', affiliation: 'シッテムの箱' },
    'プラナ': { school: '所属なし', affiliation: 'シッテムの箱' },

    '初音ミク': { school: 'コラボキャラ', affiliation: 'バーチャル・シンガー' },

    // コラボ校
    '御坂美琴': { school: 'コラボキャラ', affiliation: '常盤台中学（コラボ）' },
    '食蜂操祈': { school: 'コラボキャラ', affiliation: '常盤台中学（コラボ）' },
    '佐天涙子': { school: 'コラボキャラ', affiliation: '柵川中学（コラボ）' },

    // 新規追加生徒
    'ラブ': { school: 'ヘルメット団', affiliation: '幹部' },
    'アオバ': { school: 'ハイランダー鉄道学園', affiliation: '貨物輸送管理部' },
    'エリ': { school: 'ワイルドハント芸術学院', affiliation: 'オカルト研究会' },
    'カノエ': { school: 'ワイルドハント芸術学院', affiliation: 'オカルト研究会' },
    'ケイ': { school: 'ミレニアムサイエンススクール', affiliation: '特異現象捜査部' },
    'コタマ': { school: 'ミレニアムサイエンススクール', affiliation: 'ヴェリタス' },
    'シロコ＊テラー': { school: 'アビドス高等学校', affiliation: 'アビドス生徒会' },
    'スバル': { school: 'アリウス分校', affiliation: 'ニコメディアトゥループ' },
    'タカネ': { school: 'レッドウィンター連邦学園', affiliation: '出版部' },
    'チアキ': { school: 'ゲヘナ学園', affiliation: '万魔殿' },
    'チサ': { school: '百鬼夜行連合学院', affiliation: '陰陽部' },
    'フユ': { school: 'ワイルドハント芸術学院', affiliation: '特殊交易部' },
    'ミヨ': { school: 'ワイルドハント芸術学院', affiliation: '特殊交易部' },
    'リツ': { school: 'ワイルドハント芸術学院', affiliation: '特殊交易部' },
    'レイジョ': { school: '山海経高級中学校', affiliation: '玄武商会' },
    'ワカモ': { school: '百鬼夜行連合学院', affiliation: 'なし' }
};

export const SAMPLE_STUDENTS = [
    {
        id: 1,
        key: 'hoshino__default',
        name: 'ホシノ',
        costume: 'default',
        school: 'アビドス高等学校',
        affiliation: '対策委員会',
        imageId: 'hoshino__default',
        owned: false,
        level: 1,
        affection: 1,
        stars: 'yellow1'
    },
    {
        id: 2,
        key: 'hina__default',
        name: 'ヒナ',
        costume: 'default',
        school: 'ゲヘナ学園',
        affiliation: '風紀委員会',
        imageId: 'hina__default',
        owned: false,
        level: 1,
        affection: 1,
        stars: 'yellow1'
    },
    {
        id: 3,
        key: 'mika__default',
        name: 'ミカ',
        costume: 'default',
        school: 'トリニティ総合学園',
        affiliation: 'ティーパーティー',
        imageId: 'mika__default',
        owned: false,
        level: 1,
        affection: 1,
        stars: 'yellow1'
    },
    {
        id: 4,
        key: 'serika__default',
        name: 'セリカ',
        costume: 'default',
        school: 'アビドス高等学校',
        affiliation: '対策委員会',
        imageId: 'serika__default',
        owned: false,
        level: 1,
        affection: 1,
        stars: 'yellow1'
    },
    {
        id: 5,
        key: 'ayane__default',
        name: 'アヤネ',
        costume: 'default',
        school: 'アビドス高等学校',
        affiliation: '対策委員会',
        imageId: 'ayane__default',
        owned: false,
        level: 1,
        affection: 1,
        stars: 'yellow1'
    }
];