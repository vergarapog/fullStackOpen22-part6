import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

export const sortByVotes = (anecdotes) => {
  let arrayForSorting = [...anecdotes]
  const sortedByVotes = arrayForSorting.sort((a, b) => {
    return b.votes - a.votes
  })

  return sortedByVotes
}

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteInStore(state, action) {
      const { id, newObj } = action.payload

      return state.map((anecdote) => (anecdote.id !== id ? anecdote : newObj))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { voteInStore, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteInDb = (id) => {
  return async (dispatch, getState) => {
    const { anecdotes } = getState()

    const objToChange = anecdotes.find((obj) => obj.id === id)

    const newObj = {
      ...objToChange,
      votes: objToChange.votes + 1,
    }

    await anecdoteService.update(id, newObj)
    dispatch(voteInStore({ id, newObj }))
  }
}

export default anecdoteSlice.reducer

// Without redux toolkit
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "VOTE": {
//       const id = action.data.id
//       const objToChange = state.find((obj) => obj.id === id)

//       const newObj = {
//         ...objToChange,
//         votes: objToChange.votes + 1,
//       }

//       return state.map((anecdote) => (anecdote.id !== id ? anecdote : newObj))
//     }
//     case "ADD_ANECDOTE": {
//       return [...state, action.data]
//     }
//     default:
//       return state
//   }
// }

// export const voteInStore = (id) => {
//   return {
//     type: "VOTE",
//     data: {
//       id,
//     },
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: "ADD_ANECDOTE",
//     data: {
//       id: getId(),
//       content,
//       votes: 0,
//     },
//   }
// }

// export default reducer
