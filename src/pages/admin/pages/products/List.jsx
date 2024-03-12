import React, { useState } from 'react'
import { Table } from 'react-bootstrap';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { randomId, convertToVND } from '@mieuteacher/meomeojs';
import { useSelector, useDispatch } from 'react-redux';
import ProductCreateForm from './components/ProductCreateForm';

export default function List() {
    const dispatch = useDispatch()
    const productStore = useSelector(store => store.productStore);
    const [load, setLoad] = useState(false);


    return (
        <>
            {
                productStore.addModal && <ProductCreateForm dispatch={dispatch} />
            }
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Thumbnail</th>
                        <th>Images</th>
                        <th colSpan={2}>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productStore.data?.map((product, index) => {
                            return (
                                <tr key={randomId()}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category.title}</td>
                                    <td>{convertToVND(product.price)}</td>
                                    <td style={{ display: "flex", justifyContent: "center" }}>
                                        <img src={product.thumbnail} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                    </td>
                                    <td>
                                        <button className='btn btn-primary'>show</button>
                                    </td>
                                    <td>
                                        <button className='btn btn-outline-primary'><EditOutlined /></button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                dispatch(productAction.loadModal())
                                            }}
                                            className='btn btn-danger'><DeleteOutlined /></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}
