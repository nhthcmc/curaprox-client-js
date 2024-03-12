import React from 'react'
import api from '@services/apis'
import { addressAction } from '@slices/address.slice';
import { Modal } from 'antd';

export default function AddressCreateForm({ dispatch }) {
  async function handleAddAddress(e) {
    e.preventDefault();
    try {
      let newAddress = {
        name: e.target.name.value,
        line: e.target.line.value,
        tel: Number(e.target.tel.value)
      }
      let result = await api.address.create({
        newAddress
      })
      Modal.success({
        title: "Success!",
        content : result.data.message,
        onOk: () => {
          dispatch(addressAction.addData(result.data.data))
          e.target.name.value = ""
          e.target.line.value = ""
          e.target.tel.value = ""
          // dispatch(addressAction.loadModal())
        }
      })
    } catch (err) {
      alert("2")
    }
  }
  return (
    <div className='new_address_form'>
      <span className='title'>Add new address</span>
      <form
        onSubmit={(e) => {
          handleAddAddress(e)
        }}
      >
        <label>
          <span>Name</span>
          <input name='name' placeholder='Name'></input>
        </label>
        <label>
          <span>Address</span>
          <input name='line' placeholder='Address'></input>
        </label>
        <label>
          <span>Tel</span>
          <input name='tel' placeholder='Phone number'></input>
        </label>
        <button type='submit' className='save-btn'>save</button>
      </form>
    </div>
  )
}
