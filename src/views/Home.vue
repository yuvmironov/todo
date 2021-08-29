<template>
  <div class="Home">
    <div class="Home-AddTask">
      <label class="Home-Input">
        <span>Название</span>
        <input type="text" maxlength="30" v-model="nameTask">
      </label>
      <label class="Home-Input">
        <span>Описание</span>
        <textarea v-model="descriptionTask" class="Home-TextArea"></textarea>
      </label>
      <label class="Home-Input">
        <span>Дата окончания</span>
        <input type="datetime-local" v-model="endDateTask">
      </label>
      <button @click="addTask">add</button>
    </div>
    <div class="Home-Lists">
      <oneTodoElement v-for="(element, index) in listFields" :key="index" :todo="element"/>
    </div>
  </div>
  <Noty/>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { generateId } from '@/generateId'
import oneTodoElement from '@/components/oneTodoElement'
import Noty from '@/components/Noty'

export default {
  name: 'Home',
  components: {
    Noty,
    oneTodoElement
  },
  setup () {
    const store = useStore()
    const listFields = computed(() => store.getters.getFields)

    const nameTask = ref('')
    const descriptionTask = ref('')
    const endDateTask = ref('')
    const addTask = () => {
      if (nameTask.value && endDateTask.value) {
        store.commit('addField', {
          key: generateId(),
          header: nameTask.value,
          description: descriptionTask.value,
          endDate: endDateTask.value,
          endFlag: false
        })
      } else {
        store.commit('changeNotyFlag', true)
        store.commit('setNotyData', {
          header: 'Ошибка',
          description: 'Заполнены не все обязательные поля'
        })
      }
    }

    return {
      listFields,
      nameTask,
      descriptionTask,
      endDateTask,
      addTask
    }
  }
}
</script>

<style lang="stylus">
.Home
  display flex
  &-TextArea
    width 250px
    height 300px
    resize none
  &-Lists
    display flex
    flex-direction column
    width 100%
    padding 20px
  &-AddTask
    padding 20px
    display flex
    flex-direction column
  &-Input
    display flex
    flex-direction column
</style>
