import React, {useEffect, useMemo, useState} from 'react'
import MaterialReactTable from 'material-react-table';
import { useParams } from 'react-router-dom';

const StockView = () => {
    const [product, setProduct] = useState([])

    const productInfoData = []
   
    const { productName } = useParams();

    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products/${productName}`)
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
            productName: item.productName,
            productDescription: item.productDescription,
            supplierName: item.supplierName.supplierName,
            supplierAddress: item.supplierName.supplierAddress
        })
    })

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
        accessorKey: 'productDescription',
        header: 'Product Description',
      },
      {
        accessorKey: 'supplierName',
        header: 'Supplier Name',
      },
      {
        accessorKey: 'supplierAddress',
        header: 'Supplier Address',
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

export default StockView