import { Language } from "./enum"

export const getLanguage = (locale?: string) => {
    if (!locale) return Language.VI;
    switch (locale) {
        case 'en-US': return Language.EN;
        default: return Language.VI;
    }
}