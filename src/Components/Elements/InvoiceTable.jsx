import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export default function InvoiceTable() {
  const [billingData, setBillingData] = useState([]);

  useEffect(() => {
    axios
      .get("https://inventory-billing-app-backend-03.onrender.com/api/invoice-data")
      .then((response) => {
        setBillingData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const columns = [
    { field: "invoiceNumber", headerName: "Invoice Number", width: 150 },
    { field: "clientname", headerName: "Client Name", width: 150 },
    { field: "clientemail", headerName: "Client Email", width: 250 },
    { field: "itemname", headerName: "Item Name", width: 250 },
    { field: "total", headerName: "Total", width: 150 },
    { field: "issuedate", headerName: "Issue Date", width: 150 },
  ];

  return (
    <div className=" lg:w-760 md:w-500 sm:w-350 xl:w-full max-sm:w-72 h-fit bg-white rounded-lg">
      <DataGrid
        rows={billingData.map((data, index) => {
          const row = {
            id: index,
            invoiceNumber: data.invoiceInfo.invoiceNumber,
            clientname: data.invoiceInfo.clientname,
            clientemail: data.invoiceInfo.clientemail,
            total: data.invoiceInfo.total,
            issuedate: data.invoiceInfo.issuedate,
          };

          if (data.items.length > 0) {
            row.itemname = data.items.map((item) => item.name).join(", ");
          } else {
            row.itemname = "";
          }

          return row;
        })}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
  </div>
  );
}
