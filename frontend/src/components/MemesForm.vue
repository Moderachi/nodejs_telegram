<script setup>

import {computed, onMounted, ref, watch} from "vue";
import {useTgStore} from "../tgStore.js";

const tgStore = useTgStore()
const items = [
  {
    src: '/src/assets/memTemplates/1.png',
  },
  {
    src: '/src/assets/memTemplates/2.png',
  },
]
const selectedTemplate = ref(1)
const textUp = ref('1')
const textDown = ref('-')
const cxt = ref(null)
const newMemes = ref(null)

const isValidForm = computed(() => {
  return textUp.value.length > 0 && textDown.value.length > 0 && selectedTemplate.value !== null
})

const onSendData = () => {
  tgStore.tg.sendData(JSON.stringify({
    image: items.at(selectedTemplate.value).src,
    textUp: textUp.value,
    textDown: textDown.value,
  }))

  tgStore.closeWebApp()
}

tgStore.tg.onEvent('mainButtonClicked', onSendData)

onMounted(() => {
  tgStore.showMainButton()
})

watch(isValidForm, () => {
  if (isValidForm.value) {
    tgStore.showMainButton()
    createMem()
  } else {
    tgStore.hideMainButton()
  }
})

</script>

<template>
  <div style="max-width: 600px">
    <canvas ref="cxt" style="display: none"/>
    <v-card>
      <v-img
          :src="newMemes"
          cover
          width="400"
          class="text-right pa-2"
      />
    </v-card>
    <br>
    <v-card
        height="350"
        max-width="400"
        class="mx-auto overflow-y-auto overflow-x-hidden"
    >
      <v-container class="pa-1">
        <v-item-group
            v-model="selectedTemplate"
        >
          <v-row>
            <v-col
                v-for="(item, i) in items"
                :key="i"
                cols="12"
                md="6"
            >
              <v-item v-slot="{ isSelected, select,  }">
                <v-card
                    @click="select"
                >
                  <v-img
                      :src="item.src"
                      cover
                      height="150"
                      class="text-right pa-2"
                      :style="{ border: isSelected ? '3px solid black' : '' }"
                  />
                </v-card>

              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-container>
    </v-card>
    <br>
    <v-text-field label="Текст сверху"
                  v-model="textUp"
    />
    <v-text-field label="Текст снизу"
                  v-model="textDown"
    />
    <v-btn @click="createMem" :disabled="!isValidForm">Отправить</v-btn>
  </div>
</template>

<style scoped>

</style>