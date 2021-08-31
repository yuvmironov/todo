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
      <div class="Home-TableButtons">
        <button class="Home-TableButton" @click="sortTable('notEnd')">Показать не законченные</button>
        <button class="Home-TableButton" @click="sortTable('ended')">Показать законченные</button>
        <button class="Home-TableButton" @click="sortTable('overdue')">Показать просроченные</button>
        <button class="Home-TableButton" @click="sortTable('all')">Показать все</button>
      </div>
      <div class="Home-TableHeader">
        <p>Название</p>
        <p>Описание</p>
        <p>Дата окончания</p>
        <p>Исполнено</p>
        <p>Действия</p>
      </div>
      <oneTodoElement v-for="(element, index) in temp" :key="index" :todo="element"/>
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
    const temp = ref(listFields.value)
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
    const sortTable = (flag) => {
      temp.value = []
      switch (flag) {
        case 'ended':
          for (let i = 0; i < listFields.value.length; i++) {
            if (listFields.value[i].endFlag) {
              temp.value.push(listFields.value[i])
            }
          }
          break
        case 'notEnd':
          for (let i = 0; i < listFields.value.length; i++) {
            if (!listFields.value[i].endFlag) {
              temp.value.push(listFields.value[i])
            }
          }
          break
        case 'overdue':
          break
        case 'all':
          temp.value = listFields.value
          break
      }
    }

    return {
      listFields,
      nameTask,
      descriptionTask,
      endDateTask,
      addTask,
      sortTable,
      temp
    }
  }
}
</script>

<style lang="stylus">
.Home
  display flex
  &-TableButtons
    margin-bottom 10px
  &-TableButton
    &:not(:last-child)
      margin-right 5px
  &-TableHeader
    display flex
    width 100%
    & > p
      border 1px solid black
      padding 4px
      &:first-child
        flex-basis 30%
      &:nth-child(2)
        flex-basis 35%
      &:nth-child(3)
        flex-basis 15%
      &:nth-child(4)
        flex-basis 10%
      &:last-child
        flex-basis 10%
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
