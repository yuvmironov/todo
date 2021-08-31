<template>
  <div class="OneTodoElement">
    <p class="OneTodoElement-Element" :class="{ 'OneTodoElement_EndTask' : todo.endFlag }">{{ todo.header }}</p>
    <p class="OneTodoElement-Element" :class="{ 'OneTodoElement_EndTask' : todo.endFlag }">{{ todo.description }}</p>
    <p class="OneTodoElement-Element"
       :class="{
      'OneTodoElement_EndTask' : todo.endFlag,
      'OneTodoElement-Time_0': timeDifference === '0' && !todo.endFlag,
      'OneTodoElement-Time_12': timeDifference === '12' && !todo.endFlag,
      'OneTodoElement-Time_24': timeDifference === '24' && !todo.endFlag
    }">{{ convertTime }}</p>
    <div class="OneTodoElement-Element">
      <input
        type="checkbox"
        @change="endTask(todo.key)"
        :checked="todo.endFlag"
        :disabled="todo.endFlag"
      />
    </div>
    <div class="OneTodoElement-Element">
      <button @click="delField(todo.key)">delete</button>
      <button :disabled="todo.endFlag" @click="editField(todo)">edit</button>
    </div>
  </div>
  <div class="EditField" v-show="flagEdit">
    <div class="EditField-Content">
      <h2>Окно редактирования</h2>
      <label>
        <span>Имя</span>
        <input type="text" v-model="editData.header">
      </label>
      <label>
        <span>Описание</span>
        <textarea v-model="editData.description"></textarea>
      </label>
      <label>
        <span>Дата окончания</span>
        <input type="datetime-local" v-model="editData.endDate">
      </label>

      <button @click="saveChange">save</button>
      <button @click="cancelEdit">cancel</button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

export default {
  name: 'elementTodo',
  props: [
    'todo'
  ],
  setup (props) {
    const store = useStore()

    const timeDifference = computed(() => {
      if ((new Date(props.todo.endDate) - new Date()) <= 0) {
        return '0'
      }
      if ((new Date(props.todo.endDate) - new Date()) <= 43200000) {
        return '12'
      }
      if ((new Date(props.todo.endDate) - new Date()) <= 86400000) {
        return '24'
      }
      return '36'
    })
    const convertTime = computed(() => {
      let result = ''
      const date = new Date(props.todo.endDate)
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      result = `${day}-${month}-${date.getFullYear()} ${hours}:${minutes}`
      return result
    })

    const delField = key => store.commit('deleteField', key)

    const endTask = key => store.commit('endTask', key)

    const flagEdit = ref(false)
    const editData = ref({})
    const editField = field => {
      flagEdit.value = true
      editData.value = JSON.parse(JSON.stringify(field))
    }
    const cancelEdit = () => {
      editData.value = {}
      flagEdit.value = false
    }
    const saveChange = () => {
      store.commit('editField', editData.value)
      editData.value = {}
      flagEdit.value = false
    }

    return {
      timeDifference,
      convertTime,
      delField,
      editField,
      editData,
      cancelEdit,
      saveChange,
      endTask,
      flagEdit
    }
  }
}
</script>

<style lang="stylus">
.OneTodoElement
  display flex
  width 100%
  justify-content flex-start
  align-items flex-start
  &-Element
    padding 4px
    border 1px solid black
    height 35px
    display flex
    align-items center
    &:first-child
      flex-basis 30%
    &:nth-child(2)
      flex-basis 35%
    &:nth-child(3)
      flex-basis 15%
    &:nth-child(4)
      flex-basis 10%
      justify-content center
    &:last-child
      flex-basis 10%
      justify-content center
  &_EndTask
    text-decoration line-through
  &-Time
    &_0
      background-color: #ff0000;
      color: #141414;
    &_12
      background-color: orange;
      color: black;
    &_24
      background-color: green;
      color: white;
.EditField
  display flex
  justify-content center
  align-items center
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background-color #000000ba
  &-Content
    width 500px
    height 300px
    overflow auto
    background-color white
</style>
