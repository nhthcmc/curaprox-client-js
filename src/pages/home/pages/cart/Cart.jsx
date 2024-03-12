import React, { useEffect, useState } from 'react'
import './cart.scss'
import { useSelector, useDispatch } from 'react-redux';
import { convertToVND, randomId } from '@mieuteacher/meomeojs';
import { Modal, QRCode } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import api from '@services/apis'
import { orderAction } from '@slices/order.slice';

export default function Cart() {
    const dispatch = useDispatch();
    const orderStore = useSelector(store => store.orderStore)
    const userStore = useSelector(store => store.userStore)
    useEffect(() => {

    }, [orderStore.orders])
    async function handleDelete(itemId) {
        try {
            Modal.confirm({
                title: "Delete",
                content: "Delete this item?",
                onOk: async () => {
                    let result = await api.order.delete(itemId);
                    dispatch(orderAction.deleteItem(itemId));
                }
            })
        } catch (err) {

        }
    }

    let changeTimeout = null;
    async function handleChangeQuantity(itemId, e) {
        clearTimeout(changeTimeout)
        changeTimeout = setTimeout(async () => {
            try {
                let quantity = +e.target.value;
                await api.order.update({
                    itemId,
                    quantity
                })
                dispatch(orderAction.updateItem({
                    itemId,
                    quantity
                }));
            } catch (err) { }
        }, 1000)
    }
    const [selectedOption, setSelectedOption] = useState(null);

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    async function cash(method = "cash", zaloData = null) {
        try {
            let data = {
                total: orderStore.cart?.detail?.reduce((total, cur) => {
                    return total += cur.quantity * cur.product.price
                }, 0) || 0,
                method
            }
            if (zaloData) {
                data = {
                    ...data,
                    ...zaloData
                }
            }
            let result = await api.order.pay(orderStore.cart?.id, data)
            return result.data.data
        } catch (err) {
            return false
        }
    }

    const [qrData, setQrData] = useState(null)

    async function zalo() {
        try {
            let result = await api.order.zaloOrder({
                orderId: orderStore.cart?.id,
                userName: userStore.data?.email,
                total: orderStore.cart?.detail?.reduce((total, cur) => {
                    return total += cur.quantity * cur.product.price
                }, 0) || 0
            })
            setQrData(result.data)
            let zaloPayTimeout = null;
            let zaloPayInterVal = setInterval(async () => {
                let resultCheck = await api.order.zaloCheck(result.data.orderId);
                if (resultCheck.data.status) {
                    clearInterval(zaloPayInterVal)
                    clearTimeout(zaloPayTimeout)
                    setQrData(null)
                    let orderNew = await cash("zalo_pay", {
                        paid: true,
                        paidAt: String(Date.now())
                    })

                    dispatch(orderAction.setCart(null))
                    dispatch(orderAction.addOrder(orderNew))
                    window.location.href = '/done'
                }
            }, 500)

            zaloPayTimeout = setTimeout(() => {
                setQrData(null)
                clearInterval(zaloPayInterVal)
            }, 2 * 60 * 1000)
        } catch (err) {
            // return false
            Modal.error({
                title: "Error! Please try again!",
            })
        }
    }

    async function handlePay(e) {
        e.preventDefault();
        Modal.confirm({
            title: "Payment",
            content: "Confirm order?",
            okText: "Pay",
            cancelText: "Cancel",
            onOk: async () => {
                let method = e.target.method.value;
                let result = null;
                if (method == "cash") {
                    result = await cash()
                }
                if (method == "zalo_pay") {
                    result = await zalo()
                    return
                }
                dispatch(orderAction.setCart(null))
                dispatch(orderAction.addOrder(result))
                window.location.href = '/done'
            },
            onCancel: () => { return }
        })
        // Modal.success({
        //     title: "Order successful",
        //     content: "Thank you for shopping at Curaprox"
        // })
    }
    return (
        <div className='cart_page'>
            <div className='cart-content'>
                <h1>Shopping Cart
                    {/* (id: {orderStore.cart?.id}) */}
                </h1>
                <div className="cart-container">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderStore.cart?.detail?.map((item, index) => (
                                    <tr key={randomId()}>
                                        <td>{index + 1}</td>
                                        <td>{item.product.name}</td>
                                        <td>
                                            <img src={item.product.thumbnail} style={{ width: 50, height: 50, borderRadius: "50%" }} />
                                        </td>
                                        <td>{convertToVND(item.product.price)}</td>
                                        <td>
                                            <input onChange={(e) => {
                                                handleChangeQuantity(item.id, e)
                                            }} style={{ width: 60, textAlign: "center" }} type="number" min={1} defaultValue={item.quantity} />
                                        </td>
                                        <td>{convertToVND(item.product.price * item.quantity)}</td>
                                        <td>
                                            <button onClick={() => {
                                                handleDelete(item.id)
                                            }} className='btn btn-danger'><DeleteOutlined /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td>{orderStore.cart?.detail.length + 1}</td>
                                <td>Total</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{convertToVND(orderStore.cart?.detail?.reduce((total, cur) => {
                                    return total += cur.quantity * cur.product.price
                                }, 0) || 0)}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='payment-content'>
                <h1>Payment</h1>
                <div className="payment-container">
                    <div className='info'>
                        <span className='title'>Shipping info</span>
                        {/* <form>
                            <label>
                                <span>Name</span>
                                <input />
                            </label>
                            <label>
                                <span>Tel</span>
                                <input />
                            </label>
                            <label>
                                <span>Address</span>
                                <input />
                            </label>
                        </form> */}

                    </div>
                    <div className='method'>
                        <span className='title'>Payment method</span>
                        {
                            qrData && (
                                Modal.success({
                                    title: "Please scan",
                                    onOk: () => { window.location.href = "/done" },
                                    content:
                                        <QRCode
                                            value={qrData.qrCodeUrl}
                                            icon="https://play-lh.googleusercontent.com/NfFBz1Rxk0nQ7RsOk0kXbi1AEp1ZJ3rzJHbwRlmheZEDPPHh7dscqyxyX-ehxTl7tw"
                                        />
                                })
                            )
                        }
                        <form onSubmit={(e) => {
                            handlePay(e)
                        }}>
                            <div className='method'>
                                <select name='method'>
                                    <option value="cash" defaultChecked>CASH</option>
                                    <option value="zalo_pay">ZALOPAY</option>
                                </select>
                            </div>
                            {/* <label className='method'>
                                <span className='methodName'>Cash on Delivery</span>
                                <span className="material-symbols-outlined">payments</span>
                                <input value="cash"
                                    name="paymentMethod"
                                    checked={selectedOption === 'cash'}
                                    onChange={handleRadioChange}
                                    type="radio" />
                                <span className="checkmark"></span>
                            </label>
                            <label className='method'>
                                <span className='methodName'>Zalo Pay</span>
                                <span className="
                            material-symbols-outlined">qr_code_scanner</span>
                                <input value="zalo_pay"
                                    name="paymentMethod"
                                    checkedA={selectedOption === 'zalo_pay'}
                                    onChange={handleRadioChange}
                                    type="radio" />
                                <span className="checkmark"></span>
                            </label> */}
                            <button className='btn btn-primary' type='submit'>Confirm Order</button>
                        </form>
                    </div>
                </div >
            </div >
        </div >
    )
}