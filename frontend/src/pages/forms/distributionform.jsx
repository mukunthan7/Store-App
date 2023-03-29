import React,{ useState, useEffect }  from 'react'
import "../styles/distributionform.css"
import { useNavigate } from 'react-router-dom'
import distImage from "../assets/newdusribution.png"

const initailState = {
    productName: "",
    Buyer: "",
    Purpose: "",
    collegeName: "",
    Department: "",
    quantity: "",
}

const Distributionform = () => {

    const Navigate = useNavigate()

    const [distribution , setDistribution] = useState(initailState)
    const [products, setProducts] = useState([])

    const handleInput = (e) => {
            const {name, value} = e.target
            setDistribution({...distribution, [name]: value})
    }

    useEffect(() => {
        fetchData()
    })

    const fetchData = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/products`)
        const data = await res.json()
        setProducts(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`${process.env.REACT_APP_API_URL}/distributions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(distribution)
    })
    if(res.ok){
        Navigate("/distributions")
    }
}

  return (
    <div>
    <div className="container">
        <div className="topic">
            <h1>New Distribution</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='form_container'>
                <div className='form_items'>
                    <label htmlFor="productname">Product Name</label>
                    <select onChange={handleInput} name="productName" value={distribution.productName} id="college-select">
                        <option value="">Select a Product</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.productName}>{product.productName}</option>
                        ))}
                    </select>
                </div>
                <div className='form_items'>
                    <label htmlFor="buyer">Buyer</label>
                    <input type="text" onChange={handleInput} name='Buyer' value={distribution.Buyer} required />
                </div>
                <div className='form_items'>
                    <label htmlFor="purpose">Purpose</label>
                    <input type="text" onChange={handleInput} name='Purpose' value={distribution.Purpose} required />
                </div>
            </div>
            <div className='form_container'>
                <div className='form_items'>
                    <label htmlFor="college">College Name</label>
                    <select onChange={handleInput} name="collegeName" value={distribution.collegeName}  id="college-select">
                        <option value="">Select a College</option>
                        <option value="PEC">PEC</option>
                        <option value="PCE">PCE</option>
                        <option value="PCT">PCT</option>
                    </select>
                </div>
               <div className='form_items'>
                    <label htmlFor="dept">Department</label>
                    <select onChange={handleInput} name="Department"  value={distribution.Department} id="college-select">
                        <option value="">Select a Department</option>
                        <option value="IT">IT</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                    </select>
               </div>
               <div className='form_items'>
               <label htmlFor="quantity">Quantity</label>
                <input type="text" onChange={handleInput} name='quantity' value={distribution.quantity} required />
               </div>
               <button className='submit' type='submit'>Add</button>
            </div>
            
        </form>
    </div>
    <img src={distImage} alt="distImage" />
    </div>
  )
}

export default Distributionform
