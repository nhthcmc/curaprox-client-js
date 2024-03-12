import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './category.scss'
import { Modal, Col, Row, Card } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons'
const { Meta } = Card;
import { useSelector, useDispatch } from 'react-redux';
import { convertToVND, randomId } from '@mieuteacher/meomeojs';
import api from '@services/apis'
import { orderAction } from '@slices/order.slice'

export default function Category() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { categoryName } = useParams()
    const productStore = useSelector(store => store.productStore)
    useEffect(() => {

    }, [categoryName])

    async function handleAddToCart(productId, quantity, e) {
        try {
            let item = {
                productId,
                quantity
            }
            let result = await api.order.addToCart(item);

            let cartEl = document.querySelector(".fa-bag-shopping");
            // let productEl = e.target.parentNode.parentNode.parentNode.querySelector('img');
            // createBuyAnimation(productEl, cartEl, 50, 50)

            dispatch(orderAction.setCart(result.data.data))
            Modal.success({
                title: "Added to cart!"
            })
        } catch (err) {
            console.log('error', err);
            Modal.info({
                title: "Please sign in to continue shopping!"
            })
        }
    }
    return (
        <div className='category_page'>
            {/* <div className='tool'>

            </div> */}
            <div className='product_list'>
                <Row gutter={16}>
                    {
                        productStore.data?.map(i => {
                            // if (product?.category?.title == categoryName) {
                            return (
                                <Col key={randomId()} className="gutter-row" xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        className='productCart'
                                        hoverable
                                        style={{
                                            width: "250px",
                                            minHeight: "200px",
                                            marginBottom: "10px"
                                        }}
                                        cover={<img alt="example" src={i.thumbnail} />}
                                    >
                                        <Meta
                                            onClick={() => {
                                                navigate(`/products/${i.id}`)
                                            }}
                                            title={i.name}
                                            description={convertToVND(i.price)} />
                                        <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                                            <button
                                                onClick={(e) => {
                                                    handleAddToCart(i.id, 1, e)
                                                }}
                                                className='btn btn-primary'>
                                                <ShoppingCartOutlined />
                                            </button>
                                        </div>
                                    </Card>
                                </Col>
                            )
                            // }
                        })
                    }
                </Row>
            </div>
        </div>
    )
}