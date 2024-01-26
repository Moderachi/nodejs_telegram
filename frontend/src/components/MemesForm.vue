<script setup>

import {computed, ref} from "vue";

const items = [
  {
    src: 'backgrounds/bg.jpg',
  },
  {
    src: 'backgrounds/md.jpg',
  },
  {
    src: 'backgrounds/bg-2.jpg',
  },
  {
    src: 'backgrounds/md2.jpg',
  },
  {
    src: 'backgrounds/bg.jpg',
  },
  {
    src: 'backgrounds/md.jpg',
  },
  {
    src: 'backgrounds/bg-2.jpg',
  },
  {
    src: 'backgrounds/md2.jpg',
  },
  {
    src: 'backgrounds/bg.jpg',
  },
  {
    src: 'backgrounds/md.jpg',
  },
  {
    src: 'backgrounds/bg-2.jpg',
  },
  {
    src: 'backgrounds/md2.jpg',
  },
]
const selectedTemplate = ref(null)

const textUp = ref('')
const textDown = ref('')


const submitMem = () => {
  console.log(textUp, textDown, selectedTemplate)
}

const isValidForm = computed(() => {
  return textUp.value.length > 0 && textDown.value.length > 0 && selectedTemplate.value !== null
})
if (!isValidForm) {
  window.Telegram.WebApp.MainButton.show()
} else {
  window.Telegram.WebApp.MainButton.hide()
}

</script>

<template>
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
                    :src="`https://cdn.vuetifyjs.com/images/${item.src}`"
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
  <v-btn @click="submitMem" :disabled="!isValidForm">Отправить</v-btn>
</template>

<style scoped>

</style>