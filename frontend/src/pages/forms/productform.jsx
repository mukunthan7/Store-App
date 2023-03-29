import React, { useEffect, useState } from 'react'
import '../styles/formstyle.css'
import { useNavigate } from 'react-router-dom'
import ProductImage from "../assets/newproduct.png"

const initialState = {
  productName: '',
  productDescription: '',
  supplierName: ''
}

const Productform = () => {
  
  const Navigate = useNavigate()

  const [product, setProduct] = useState(initialState)
  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/suppliers`)
    const data = await res.json()
    setSuppliers(data)
  }

  const handleInput = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(product)
    })
    if(res.ok) {
      Navigate('/transactionform')
    }
  }

  return (
    <div className='container1'>
      <div className='container'>
      <form onSubmit={handleSubmit}  className='supplierForm'>
        <h1>Add a new product</h1>
        <div className='formitems'>
        <label htmlFor="productname">Product Name</label>
        <input type="text"  name='productName' value={product.productName} onChange={handleInput} required/>
        </div>
        <div className='formitems'>
        <label htmlFor="NumberofProducts">Product Description</label>
        <input type="text" name='productDescription' value={product.productDescription} onChange={handleInput} required/>
        </div>
        <div className='form_items'>  
        <label htmlFor="supplier">Supplier</label>
        <select name="supplierName" id="supplier" value={product.supplierName} onChange={handleInput} required>
          <option value="">Select a supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.supplierName}>{supplier.supplierName}</option>
          ))}
        </select>
        </div>
       <button className='submit' type='submit'>Add</button>
      </form>
    </div>
    <img src={ProductImage} alt="ProductImage"/>
    </div>
  )
}

export default Productform
