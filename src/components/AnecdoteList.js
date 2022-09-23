import { useSelector, useDispatch } from "react-redux"
import { voteInDb, sortByVotes } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notifReducer"
const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return sortByVotes(anecdotes)
    } else {
      return anecdotes.filter((item) =>
        item.content.toLowerCase().includes(filter.toLowerCase())
      )
    }
  })
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteInDb(id))
    dispatch(setNotification(`you voted "${content}"`, 5))
  }
  return (
    <div>
      {" "}
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
