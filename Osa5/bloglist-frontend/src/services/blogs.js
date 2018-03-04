import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (blog) => {
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = async (blog, user) => {
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
  }
  const response = await axios.delete(`${baseUrl}/${blog._id}`, config)
  return response
}

export default { getAll, create, update, remove, setToken }