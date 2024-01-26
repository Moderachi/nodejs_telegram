import {defineStore} from "pinia";

export const useTgStore = defineStore('tg', {
    state: () => ({
        tg: window.Telegram.WebApp
    }),
    actions: {
        closeWebApp() {
            this.tg.close
        }
    }
})