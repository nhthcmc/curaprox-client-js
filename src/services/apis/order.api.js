import axios from "axios";

export default {
    findMany: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/orders`)
    },
    addToCart: async (item) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/orders/add-to-cart`, item)
    },
    delete: async (itemId) => {
        return await axios.delete(`${import.meta.env.VITE_SERVER_HOST}/orders/${itemId}`)
    },
    update: async (data) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/orders`, data)
    },
    pay: async (orderId, data) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/orders/pay/${orderId}`, data)
    },
    zaloOrder: async (data) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/orders/pay/zalo/`, data)
    },
    zaloCheck: async (zaloPayOrderId) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/orders/pay/zalo-check/${zaloPayOrderId}`)
    }
}