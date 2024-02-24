import React from "react";
import InvoiceTable from "../Components/Elements/InvoiceTable";
import { useStateContext } from "../Components/Contexts/Statecontexts";
import Sidebar from "../Components/Elements/Sidebar";
import Navbar from "../Components/Elements/Navbar";


export default function InvoiceData() {

  
  const { activeMenu } = useStateContext();


  return (
      <div className="flex relative">
        {activeMenu ? (
          <div className="w-64 fixed sidebar bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? " bg-main-bg min-h-screen md:ml-64 w-full  "
              : "bg-main-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg navbar w-full ">
            <Navbar />
          </div>
          <div className=" flex my-7 gap-10 flex-wrap justify-center">
            <div className="bg-white shadow-xl m-3 p-4 rounded-2xl">
                    <p className="font-semibold tracking-wider text-xl uppercase">invoice data</p>
                <div className="mt-7">
          <InvoiceTable/>
          </div>
          </div>
          </div>
        </div>
      </div>
  );
}
