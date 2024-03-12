import { randomId } from '@mieuteacher/meomeojs';
import React, { useState } from 'react'
import { InputGroup, Form } from 'react-bootstrap';
import { productAction } from '@slices/productSlice';
import { uploadToFirebase } from '@services/firebase'
import api from '@services/apis'
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import images from '@/images'

export default function ProductCreateForm({ dispatch }) {
  const [picturesPreview, setPicturesPreview] = useState([]);
  const categoryStore = useSelector(store => store.categoryStore)
  async function handleAddProduct(e) {
    e.preventDefault();
    if (!e.target.thumbnail.files[0]) return
    try {
      let newProduct = {
        name: e.target.name.value,
        price: Number(e.target.price.value),
        thumbnail: await uploadToFirebase(e.target.thumbnail.files[0]),
        categoryId: Number(e.target.categoryId.value)
      }
      let pictures = [];

      for (let i in picturesPreview) {
        let url = await uploadToFirebase(picturesPreview[i].file)
        pictures.push({
          url
        })
      }

      let result = await api.product.create({
        newProduct,
        pictures
      })

      Modal.success({
        title: "Success!",
        content: result.data.message,
        onOk: () => {
          dispatch(productAction.addData(result.data.data))
          e.target.name.value = ""
          e.target.price.value = ""
          setPicturesPreview([])
          e.target.thumbnail.value = null
          dispatch(productAction.loadModal())
        }
      })
    } catch (err) {
      alert("1")
    }
  }
  return (
    <div className='product_create_form'>
      <form onSubmit={(e) => {
        handleAddProduct(e)
      }}>
        <div className='btn_box'>
          <span>Add new product</span>
          <button onClick={() => {
            dispatch(productAction.loadModal())
          }} type='button' className='btn btn-danger'>X</button>
        </div>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "100px" }} id="basic-addon1">Name</InputGroup.Text>
          <Form.Control
            placeholder="Product Name"
            name='name'
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "100px" }} id="basic-addon1">Price</InputGroup.Text>
          <Form.Control
            placeholder="Product Price"
            name='price'
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "100px" }} id="basic-addon1">Thumbnail</InputGroup.Text>
          <div className='input_thumbnail'>
            <img src={images.noImg} alt='img' />
            <input onChange={(e) => {
              if (e.target.files.length > 0) {
                let spanEl = e.target.parentNode.querySelector('span');
                let imgEl = e.target.parentNode.querySelector('img');
                spanEl.style.opacity = 0;
                imgEl.src = URL.createObjectURL(e.target.files[0])
              }
            }} name='thumbnail' type="file" />
            <span>+</span>
          </div>
        </InputGroup>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Product Images</Form.Label>
          <Form.Control onChange={(e) => {
            let tempArr = [];
            if (e.target.files.length > 0) {
              for (let i in e.target.files) {
                if (i == "length") {
                  break
                }
                tempArr.push({
                  url: URL.createObjectURL(e.target.files[i]),
                  file: e.target.files[i]
                })
              }
            }
            if (picturesPreview.length + tempArr.length > 10) {
              alert("Maximum size 10")
              return
            }
            setPicturesPreview([...tempArr, ...picturesPreview])
          }} type="file" multiple max={10} />
        </Form.Group>
        <div className='pictures'>
          {
            picturesPreview.map((item, index) => (
              <div key={randomId()} className='item'>
                <img src={item.url} />
                <button type='button' onClick={() => {
                  setPicturesPreview(picturesPreview.filter((itemFilter, indexFilter) => indexFilter != index))
                }} className='btn btn-danger'>X</button>
              </div>
            ))
          }
        </div>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "100px" }} id="basic-addon1">Category</InputGroup.Text>
          <Form.Select name='categoryId' aria-label="Default select example">
            <option value={null}>Choose</option>
            {
              categoryStore.data?.map(item => (
                <option key={randomId()} value={item.id}>{item.title}</option>
              ))
            }
          </Form.Select>
        </InputGroup>
        <button type='submit' className='btn btn-success'>save</button>
      </form>
    </div>
  )
}
