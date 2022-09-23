import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notifReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ""

    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`you added "${anecdote}"`, 3))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input type="text" name="anecdote" />
        <button type="submit">Add Anecdote</button>
      </form>
    </>
  )
}

export default AnecdoteForm
