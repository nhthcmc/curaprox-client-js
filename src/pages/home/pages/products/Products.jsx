import React, { useEffect } from 'react'
import './products.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { convertToVND, randomId } from '@mieuteacher/meomeojs';
import api from '@services/apis'
import { orderAction } from '@slices/orderSlice'
import { Modal } from 'antd';

export default function Products() {
    let product = null
    const productStore = useSelector(store => store.productStore);
    let { id } = useParams()
    product = productStore.data?.filter(item => item.id == id)

    const dispatch = useDispatch()
    const { categoryName } = useParams()
    useEffect(() => {

    }, [categoryName])
    async function handleAddToCart(productId, quantity, e) {
        try {
            let item = {
                productId,
                quantity
            }
            let result = await api.order.addToCart(item);

            // let cartEl = document.querySelector(".fa-bag-shopping");
            // let productEl = e.target.parentNode.parentNode.parentNode.querySelector('img');
            // createBuyAnimation(productEl, cartEl, 50, 50)

            dispatch(orderAction.setCart(result.data.data))
            Modal.success({
                title: "Added to cart!"
            })
        } catch (err) {
            console.log('error', err);
        }
    }
    return (
        <div className='products' >
            <div className='pics'>
                <img src={product[0]?.thumbnail}></img>
            </div>
            <div className='info'>
                <h1>{product[0]?.name}</h1>
                <span className='des'>{product[0]?.des}</span>
                <span className='price'>{convertToVND(product[0]?.price)}</span>
                <button
                    onClick={(e) => {
                        handleAddToCart(product[0]?.id, 1, e)
                    }}
                >Add to cart</button>
            </div>
        </div >
    )
}