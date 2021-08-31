import { createStore } from 'vuex'

const state = {
  todoFields: [
    {
      key: '79bbc6d1e666a92001ea15fb43cd6e59a7912008',
      header: 'Заголовок',
      description: 'Описание',
      endDate: '2021-08-01T08:00',
      endFlag: false
    },
    {
      key: '2dcccdcae8082eacc452bed024d7d4736359aeae',
      header: 'Заголовок 2',
      description: 'Описание 3',
      endDate: '2021-06-11T11:11',
      endFlag: true
    },
    {
      key: '2dcccdcae8082eacc452bed024d7d4736359aeae',
      header: 'Заголовок 2',
      description: 'Описание 3',
      endDate: '2021-06-11T11:11',
      endFlag: true
    },
    {
      key: '2dcccdcae8082eacc452bed024d7d4736359aeae',
      header: 'Заголовок 2',
      description: 'Описание 3',
      endDate: '2021-09-11T11:11',
      endFlag: false
    }
  ],
  NotyShowFlag: false,
  NotyData: {
    header: '',
    description: ''
  }
}

const getters = {
  getFields (state) {
    return state.todoFields
  },
  getNotyFlag (state) {
    return state.NotyShowFlag
  },
  getNotyData (state) {
    return state.NotyData
  }
}

const mutations = {
  addField (state, todo) {
    state.todoFields.unshift(todo)
  },
  deleteField (state, data) {
    state.todoFields = state.todoFields.filter(item => {
      if (item.key !== data) {
        return item
      }
    })
  },
  editField (state, data) {
    for (const item in state.todoFields) {
      if (state.todoFields[item].key === data.key) {
        state.todoFields[item] = data
      }
    }
  },
  endTask (state, key) {
    for (const item in state.todoFields) {
      if (state.todoFields[item].key === key) {
        state.todoFields[item].endFlag = true
      }
    }
  },

  changeNotyFlag (state, data) {
    state.NotyShowFlag = data
  },
  setNotyData (state, data) {
    state.NotyData.header = data.header
    state.NotyData.description = data.description
  }
}

const actions = {}

const modules = {}

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules
})
