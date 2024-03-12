import axios from "axios";

export default {
    findMany: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/address'`)
    },
    create: async (data) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/new-address`, data)
    },
    update: async (data) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/address`, data)
    },
    delete: async (itemId) => {
        return await axios.delete(`${import.meta.env.VITE_SERVER_HOST}/address/${itemId}`)
    },
}