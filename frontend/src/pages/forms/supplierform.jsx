import React, { useState } from 'react'
import '../styles/formstyle.css'
import { useNavigate } from "react-router-dom"
import SupplyImage from '../assets/supplieradding.png'

const initialState = {
  supplierName: '',
  supplierAddress: ''
}

const Supplierform = () => {

  const Navigate = useNavigate()

  const handleInput = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value
    })
  }
  
  const [supplier, setSupplier] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${process.env.REACT_APP_API_URL}/suppliers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(supplier)
    })
    if(res.ok) {
      Navigate("/productform")
    }
  }

return (
 <div className='container1'>
    <div className='container'>
      <form onSubmit={handleSubmit}  className='supplierForm'>
        <h1>Add a new supplier</h1>
        <div className='formitems'><label htmlFor="SupplierName">Supplier name</label>
        <input type="text" name='supplierName' value={supplier.supplierName} onChange={handleInput} required/></div>
        <div className='formitems'>  <label htmlFor="Address">Address</label>
        <input type="text" name='supplierAddress' value={supplier.supplierAddress} onChange={handleInput} required/></div>
       <button className='submit' type='submit'>Add</button>
      </form>
    </div>
    <img src={SupplyImage} alt="SupplyImage" />
  </div>
  )
}

export default Supplierform
