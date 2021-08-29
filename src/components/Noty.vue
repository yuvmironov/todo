<template>
  <div class="Noty" v-show="view" @click="hideNoty">
    <p class="Noty-Header">{{ notyData.header }}</p>
    <p class="Noty-Description">{{ notyData.description }}</p>
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Noty',

  setup (props) {
    const store = useStore()
    const view = computed(() => store.getters.getNotyFlag)
    watch(view, () => {
      if (view.value) {
        setTimeout(
          function () {
            store.commit('setNotyData', {
              header: '',
              description: ''
            })
            store.commit('changeNotyFlag', false)
          },
          3000)
      }
    })
    const hideNoty = () => store.commit('changeNotyFlag', false)

    const notyData = computed(() => store.getters.getNotyData)
    return {
      view,
      hideNoty,
      notyData
    }
  }
}
</script>

<style lang="stylus">
.Noty
  display block
  width 300px
  height 100px
  position fixed
  top 10px
  right 10px
  border 1px solid black
  border-radius 4px
  background-color white
  &-Header
    width 100%
    height 30px
    border-bottom 1px solid black
</style>
