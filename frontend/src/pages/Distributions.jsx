import React,{useMemo, useEffect, useState}  from 'react'
import MaterialReactTable from 'material-react-table'
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddSharp';
import { Link } from 'react-router-dom';
import './styles/topbarstyle.css'
import Loader from '../components/Loader';



export default function Distributions() {
  const distributionData = []

  const [distributions, setDistributions] = useState([])
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    fecthData()
  }, [])

  const fecthData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/distributions`)
    const data = await res.json()
    setDistributions(data)
  }
  // eslint-disable-next-line 
  distributions.map((item) => {
    distributionData.push({
      sno: distributions.indexOf(item) + 1,
      product: item.productName.productName,
      buyer: item.Buyer,
      purpose: item.Purpose,
      date: item.date,
      college: item.collegeName,
      dept: item.Department,
      quantity: item.quantity,
    })
  })
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
          accessorKey: 'buyer', //normal accessorKey
          header: 'Buyer',
        },
        {
          accessorKey: 'purpose',
          header: 'Purpose',
        },
        {
          accessorKey: 'date',
          header: 'Date',
        },
        {
          accessorKey: 'college',
          header: 'College',
        },
        {
          accessorKey: 'dept',
          header: 'Dept',
        },
        {
          accessorKey: 'quantity',
          header: 'Quantity',
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
      <h1 className='supplierName'>Distributions</h1>
      <div>
        <Link className='Link-2' to='/disributionform'><AddCircleOutlineSharpIcon/><p>Add new</p></Link>
      </div>
    </div>
    <hr />
    <div className='supplierTable'>
      <MaterialReactTable columns={columns} data={distributionData} />
    </div>
    </>
  )
}
