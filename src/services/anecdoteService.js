import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const res = await axios.get(baseUrl)

  return res.data
}

const create = async (anecdote) => {
  const newObj = { content: anecdote, votes: 0 }
  const res = await axios.post(baseUrl, newObj)

  return res.data
}

const update = async (id, newObj) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObj)

  return res.data
}

export default { getAll, create, update }
