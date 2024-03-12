import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap';
import { randomId } from '@mieuteacher/meomeojs';

export default function Order() {
    const orderStore = useSelector(store => store.orderStore)
    return (
        <div className='order_page'>
            <span className='title'>Your orders</span>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>Total</th>
                        <th>Method</th>
                        <th>Paid</th>
                        <th>Paid At</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderStore.orders?.map((order, index) => (
                            <tr key={randomId()}>
                                <td>{index + 1}</td>
                                <td>{order.id}</td>
                                <td>{order.total}</td>
                                <td>{order.method == 'cash' ? 'COD' : 'ZaloPay'}</td>
                                <td>{String(order.paid == true ? 'Paid' : 'Unpaid')}</td>
                                <td>{String(order.paidAt ? order.paidAt : 'Updating')}</td>
                                <td>
                                    <button className='btn btn-primary'>show</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}