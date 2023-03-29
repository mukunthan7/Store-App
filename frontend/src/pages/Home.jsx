import React, { useMemo, useState, useEffect } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import MaterialReactTable from "material-react-table";
import "./styles/homestyles.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [loading, setLoading] = useState(true);
  const [distributions, setDistributions] = useState([])
  const [purchase, setPurchase] = useState([])

  const distributionData = [];
  const purchaseData = [];

  useEffect(() => {
    fetchDistributionData()
    fetchPurchaseData()
  }, [])

  const fetchDistributionData = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/distributions`)
    const data = await res.json()
    setDistributions(data)
  }

  const fetchPurchaseData = async() => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`)
    const data = await res.json()
    setPurchase(data)
  }
  // eslint-disable-next-line array-callback-return
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
  // eslint-disable-next-line array-callback-return
  purchase.map((item) => {
    purchaseData.push({
      sno: purchase.indexOf(item) + 1,
      supplier: item.productName.supplierName.supplierName,
      product: item.productName.productName,
      date: item.date, 
      quantity: item.quantity,
      view: <Link>View</Link>
    })
  })

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "sno", //access nested data with dot notation
        header: "S.no",
      },
      {
        accessorKey: "product",
        header: "Product",
      },
      {
        accessorKey: "buyer", //normal accessorKey
        header: "Buyer",
      },
      {
        accessorKey: "purpose",
        header: "Purpose",
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "college",
        header: "College",
      },
      {
        accessorKey: "dept",
        header: "Dept",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
    ],
    []
  );
  const purchasedColumns = useMemo(
    () => [
      {
        accessorKey: "sno", //access nested data with dot notation
        header: "S.no",
      },
      {
        accessorKey: "product",
        header: "Product",
      },
      {
        accessorKey: "supplier", //normal accessorKey
        header: "Supplier",
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
    ],
    []
  );
  setTimeout(() => {
    setLoading(false);
  }, 1500);
  if (loading) {
    return <Loader />;
  }
  else {
  return (
    <>
     <br />
     <br />
      <div className="cardHolder">
        <Card name="purchased" counter={purchaseData.length} link={"/supplier"} />
        <Card name="delivered" counter={distributionData.length} link={"/distributions"} />
      </div>
      <div className="bloc-tabs">
        <h5
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Recently Distributed
        </h5>
        <h5
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Recently purchased
        </h5>
      </div>
      <hr />
      <div className="content-tabs">
        <div
          className={toggleState === 2 ? "content active-content" : "content"}
        >
          <MaterialReactTable columns={columns} data={distributionData} />
        </div>
        <div
          className={toggleState === 1 ? "content active-content" : "content"}
        >
          <MaterialReactTable columns={purchasedColumns} data={purchaseData} />
        </div>
      </div>
    </>
  );
}
}
