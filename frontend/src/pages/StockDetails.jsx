import React,{useMemo, useEffect, useState} from 'react'
import MaterialReactTable from 'material-react-table';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddSharp';
import { Link } from 'react-router-dom';
import './styles/topbarstyle.css'
import Loader from '../components/Loader';

export default function StockDetails() {
  const stockData = []
  const [stock, setStock] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fecthData()
  }, [])

  const fecthData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/stocks`)
    const data = await res.json()
    setStock(data)
  }
  // eslint-disable-next-line
  stock.map((item) => {
    stockData.push({
      sno: stock.indexOf(item) + 1,
      product: item.productName,
      availablity: item.quantity,
      view: <Link to={`/stockdetails/${item.productName}`}>View</Link>
    }
    )
  })
    //should be memoized or stable
    const columns = useMemo(
      () => [
        {
          accessorKey: 'sno', //access nested data with dot notation
          header: 'S.no',
        },
        {
          accessorKey: 'product',
          header: 'Product',
        },
        {
          accessorKey: 'availablity', //normal accessorKey
          header: 'Availablity',
        },
        {
          accessorKey: 'view',
          header: 'View Details',
        },
       
      ],
      [],
    );
    setTimeout(() => {
      setLoading(false)
    }, 500)
    if(loading) {
      return <Loader />
    }
  return (
    <>
    <div className='TopBar'>
      <h1 className='supplierName'>Stock Details</h1>
      <div className='circle-row'>
        <Link className='Link-2' to='/productform'><AddCircleOutlineSharpIcon/><p>Add new</p></Link>
        <Link className='Link-2' to='/transactionform'><AddCircleOutlineSharpIcon/><p>Add new quantity</p></Link>
      </div>
    </div>
    <hr />
    <div className='supplierTable'>
        <MaterialReactTable columns={columns} data={stockData} />
    </div>
    </>
  )
}

