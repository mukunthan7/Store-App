import React, { useState, useEffect} from 'react';
import "../styles/transaction.css"
import { useNavigate } from 'react-router-dom'

const initailState = {
    productName: "",
    supplierName: "",
    quantity: "",
}


const Newtransaction = () => {
  const Navigate = useNavigate()
  
  const [product, setProduct] = useState([])
  const [transaction , setTransaction] = useState(initailState)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async() => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/products`)
    const data = await res.json()
    setProduct(data)
  }

  const handleInput = (e) => {
    const {name, value} = e.target
    setTransaction({...transaction, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transaction)
    })
    if(res.ok){
      Navigate("/supplier")
    }
  }
  return (
    <div>
    <div className="container">
        <div className="topic">
            <h1>New Transaction</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='form_container'>
            </div>
            <div className='form_container'>
                <div className='form_items'>
                    <label htmlFor="college">Product Name</label>
                    <select onChange={handleInput} value={transaction.productName} name="productName" id="college-select">
                    <option value="">Select a Product</option>
                    {product.map((product) => (
                          <option key={product.id} value={product.productName}>{product.productName}</option>  
                      ))}
                    </select>
                </div>
               <div className='form_items'>
                    <label htmlFor="dept">Supplier Name</label>
                    <select onChange={handleInput} name="supplierName" id="college-select">
                    <option value="">Select a Supplier</option>
                  {product.map((item) => (
                            <option  key={item.id} value={item.supplierName.supplierName}>{item.supplierName.supplierName}</option>
                  ))}
                    </select>
               </div>
               <div className='form_items'>
               <label htmlFor="quantity">Quantity</label>
                <input onChange={handleInput} id="quantity-name" name='quantity' type="number" required />
               </div>
               <button className='submit' type='submit'>Add</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default Newtransaction
