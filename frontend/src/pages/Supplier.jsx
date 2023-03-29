import React,{useMemo, useEffect, useState}  from 'react'
import MaterialReactTable from 'material-react-table'
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddSharp';
import { Link } from 'react-router-dom';
import './styles/topbarstyle.css'
import Loader from '../components/Loader';

export default function Supplier() {
  const supplierData = []
  
  const [supplier, setSupplier] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`)
    const data = await res.json()
    setSupplier(data)
  }

  // eslint-disable-next-line
  supplier.map((item) => { 
  supplierData.push({
      sno: supplier.indexOf(item) + 1,
      suppliername: item.productName.supplierName.supplierName,
      address: item.productName.supplierName.supplierAddress,
      noOfproducts: item.quantity,
      view: <Link to={`/supplier/${item.id}`}>View</Link>
    })
  })
  
    //should be memoized or stable
    const columns = useMemo(
      () => [
        {
          accessorKey: 'sno', //access nested data with dot notation
          header: 'S.no',
        },
        {
          accessorKey: 'suppliername',
          header: 'Supplier Name',
        },
        {
          accessorKey: 'address', //normal accessorKey
          header: 'Address',
        },
        {
          accessorKey: 'noOfproducts', //normal accessorKey
          header: 'No.of.Products',
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
      <h1 className='supplierName'>
        Supplier Details
      </h1>
      <div>
      <Link className='Link-2' to='/supplierform'> <AddCircleOutlineSharpIcon/><p> Add New</p></Link>
      </div>
    </div>
    <hr/>
    <div className='supplierTable'>
     <MaterialReactTable columns={columns} data={supplierData} />
     </div>
    </>
  )
}

 