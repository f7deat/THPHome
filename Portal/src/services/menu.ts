import { Language } from "@/utils/enum";
import { request } from "@umijs/max";

export async function queryMenuOptions(language: Language) {
    return request(`menu/options?language=${language}`);
}