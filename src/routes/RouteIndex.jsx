import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy } from '@utils'

export default function RouteIndex() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={lazy.lazyFn(() => import("../pages/home/Home.jsx"))()}>
          <Route path="category/:categoryName" element={lazy.lazyFn(() => import("../pages/home/pages/categories/Category.jsx"))()}></Route>
          <Route path="cart" element={lazy.lazyFn(() => import("../pages/home/pages/cart/Cart.jsx"), localStorage.getItem('token') != null)()}></Route>
          <Route path="done" element={lazy.lazyFn(() => import("../pages/home/pages/cart/Done.jsx"))()}></Route>
          <Route path="empty" element={lazy.lazyFn(() => import("../pages/home/pages/cart/Empty.jsx"))()}></Route>
          <Route path="products/:id" element={lazy.lazyFn(() => import("../pages/home/pages/products/Products.jsx"))()}></Route>
        </Route>
        <Route path="/authen" element={lazy.lazyFn(() => import("../pages/authen/Authen.jsx"), localStorage.getItem('token') == null)()}></Route>
        <Route path="/admin" element={lazy.lazyFn(() => import("../pages/admin/Admin.jsx"), localStorage.getItem('token') != null)()}>
          <Route path="product/list" element={lazy.lazyFn(() => import("../pages/admin/pages/products/List.jsx"))()}></Route>
        </Route>
        <Route path="/profile" element={lazy.lazyFn(() => import("../pages/profile/Profile.jsx"), localStorage.getItem('token') != null)()}>
          <Route path="info" element={lazy.lazyFn(() => import("../pages/profile/pages/info/Info.jsx"))}></Route>
          <Route path="orders" element={lazy.lazyFn(() => import("../pages/profile/pages/orders/Order.jsx"))()}></Route>
          <Route path="address/list" element={lazy.lazyFn(() => import("../pages/profile/pages/address/List.jsx"))}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}