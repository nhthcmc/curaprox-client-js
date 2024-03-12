import axios from "axios";

export default {
    create: async (data) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/products`, data)
    },
    findMany: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/products`)
    }
}