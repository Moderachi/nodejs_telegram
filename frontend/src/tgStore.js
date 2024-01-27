import {defineStore} from "pinia";

const tg = window.Telegram.WebApp
export const useTgStore = defineStore('telegram', () => {
    return {
        tg,
        ready() {
            tg.ready()
            tg.MainButton.setParams({
                text: 'Создать мем'
            })
        },
        closeWebApp() {
            tg.close()
        },
        showMainButton() {
            tg.MainButton.show()
        },
        hideMainButton() {
            tg.MainButton.hide()
        },
    }
})