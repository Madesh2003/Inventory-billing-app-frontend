import React from "react";
import InvoiceForm from "../Components/Elements/InvoiceForm";
import Sidebar from "../Components/Elements/Sidebar";
import Navbar from "../Components/Elements/Navbar";
import { useStateContext } from "../Components/Contexts/Statecontexts";

export default function GenerateInvoice() {
    const { activeMenu } = useStateContext();
  
  return (
      <div className="flex relative">
        {activeMenu ? (
          <div className="w-64 fixed sidebar bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? " bg-main-bg min-h-screen md:ml-64 w-full  "
              : "bg-main-bg w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg navbar w-full ">
            <Navbar />
          </div>
          <div className=" flex my-7 gap-10 flex-wrap justify-center">
            <div className="bg-white shadow-xl m-3 p-4 rounded-2xl">
              <div className="mt-5">
                <p className="font-semibold text-2xl text-center tracking-wider uppercase">Generate invoice</p>
              </div>
              <div>
                <InvoiceForm />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
