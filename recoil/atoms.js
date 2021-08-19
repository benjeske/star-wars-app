import { atom } from "recoil";

export const appCharacter = atom({
    key: "appCharacter",
    default: null,
})

export const appDetail = atom({
    key: "appDetail",
    default: "no detail",
})