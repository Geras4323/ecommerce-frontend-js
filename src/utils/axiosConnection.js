import axios from "axios"

const api = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:5000/api/v1',
})

export { api };