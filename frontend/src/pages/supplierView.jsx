import React, {useEffect, useMemo, useState} from 'react'
import MaterialReactTable from 'material-react-table';
import { useParams } from 'react-router-dom';

const SupplierView = (props) => {

    const [product, setProduct] = useState([])

    const productInfoData = []
   
    const { id } = useParams();

    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions/${id}`)
      const data = await res.json()
      setProduct(data)
    }
  
  useEffect(() => { 
    fetchData()  // eslint-disable-next-line
  }, [])
  
    // eslint-disable-next-line
    product.map((item) => {
      productInfoData.push({
        sno: product.indexOf(item) + 1,
        productName: item.productName.productName,
        quality: item.quantity,
        supplierName: item.productName.supplierName.supplierName
      })
    })
    //should be memoized or stable
    const productsInfoColumns = useMemo(
      () => [
        {
          accessorKey: 'sno', //access nested data with dot notation
          header: 'S.no',
        },
        {
          accessorKey: 'productName',
          header: 'Product Name',
        },
        {
          accessorKey: 'quality',
          header: 'Quality',
        }
      ],
      [],
    );
  return (
    <>
      {
        productInfoData.map((item) => {
          return (
            <div key={item}>
              <h1>{item.supplierName}</h1>
              <h2>Products</h2>
            </div>
          )
        })
      }
      <MaterialReactTable columns={productsInfoColumns} data={productInfoData}/>
    </>
  )
}

export default SupplierView
