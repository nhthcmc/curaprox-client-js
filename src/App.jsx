import RouteIndex from './routes/RouteIndex'
import './main.scss'
import api from '@services/apis'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userAction } from '@slices/user.slice'
import { productAction } from '@slices/product.slice'
import { categoryAction } from '@slices/category.slice'
import { orderAction } from '@slices/order.slice'
// import { addressAction } from '@slices/addressSlice'

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if
      (!localStorage.getItem("token"))
      return
    try {
      api.authen.decodeToken(localStorage.getItem("token"))
        .then(res => {
          dispatch(userAction.setData(res.data.data))
        })
        .catch(err => {
          localStorage.removeItem("token")
          dispatch(userAction.setData(null))
        })
    } catch (err) {
      localStorage.removeItem("token")
      dispatch(userAction.setData(null))
    }
  }, [])

  useEffect(() => {
    // if (!localStorage.getItem("token")) return
    try {
      api.product.findMany()
        .then(async (res) => {
          dispatch(productAction.setData(res.data.data))
        })
        .catch(err => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  }, [])

  useEffect(() => {
    try {
      api.category.findMany()
        .then(res => {
          dispatch(categoryAction.setData(res.data.data))
        })
        .catch(err => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('token')) return
    try {
      api.order.findMany()
        .then(res => {
          let cart = null;
          let order = [];
          for (let i in res.data.data) {
            if (res.data.data[i].status == "buying") {
              cart = res.data.data[i]
            } else {
              order.push(res.data.data[i])
            }
          }
          dispatch(orderAction.setCart(cart))
          dispatch(orderAction.setOrder(order))
        })
        .catch(err => { })
    } catch (err) { }
  }, [])

  useEffect(() => {
    try {
      api.address.findMany()
        .then(async (res) => {
          dispatch(addressAction.setData(res.data.data))
        })
        .catch(err => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  }, [])
  return (
    <RouteIndex />
  )
}
