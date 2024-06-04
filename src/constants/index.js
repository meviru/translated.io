export const LANGUAGES = {
    ENGLISH: 'en',
    FRENCH: 'fr',
    SPANISH: 'es',
    HINDI: "hi",
    CHINESE: "zh-CN",
    JAPANESE: "ja",
    GERMAN: "de-DE",
    ARABIC: "ar-AE",
    CZECH: "cs",
}

export const TOAST_CONFIG = {
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
}

export const generateUniqueId = (prefix) => {
    return Math.random().toString(36).replace('0.', prefix + '-')
}