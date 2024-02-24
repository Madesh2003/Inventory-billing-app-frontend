import React, { Fragment, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Dialog, Transition } from "@headlessui/react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Buttons from "./Buttons";
import { BsCloudDownload } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import axios from "axios";

const InvoiceModal = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  businessInfo,
}) => {


  const navigate = useNavigate()

  function closeModal() {
    setIsOpen(false);
  }


  const SaveAsPDFHandler = () => {
    const dom = document.getElementById("print");
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = "annoymous";
        img.src = dataUrl;
        img.onload = () => {
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: [5.5, 8.5],
          });

          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          let pageHeight = pdf.internal.pageSize.getHeight();

          const pageCanvas = document.createElement("canvas");
          const pageCtx = pageCanvas.getContext("2d");
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = "white";
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
        };
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };

  const sendInvoiceData = async () => {
    try {
      const response = await axios.post("http://localhost:7000/api/invoices", {
        invoiceInfo,
        items,
        businessInfo,
      });
      if(response.status === 201){
        navigate("/invoices")
      }else{
        console.log("err")
      }
    } catch (error) {
      console.error("Error sending invoice data:", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full tracking-wider max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div className="p-4" id="print">
                <h1 className="text-center text-lg font-bold uppercase text-gray-900">
                  invoice
                </h1>
                <div className="flex flex-wrap justify-between items-center my-5">
                  <div>
                    <p className="uppercase tracking-wide font-bold">
                      {invoiceInfo.businessname}
                    </p>
                  </div>
                  <div className="text-xs capitalize flex flex-col text-right font-bold">
                    <p>{invoiceInfo.address}</p>
                    <p>{invoiceInfo.city}</p>
                    <p>{invoiceInfo.state}</p>
                    <p>{invoiceInfo.postelcode}</p>
                    <p>{invoiceInfo.country}</p>
                    <p>{invoiceInfo.email}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex text-sm flex-wrap justify-between items-baseline">
                    <div className="mb-2 grid grid-cols-2">
                      <span className="font-bold mr-3">Issue Date:</span>
                      <span>{invoiceInfo.issuedate}</span>
                      <span className="font-bold mr-3">Due Date:</span>
                      <span>{invoiceInfo.duedate}</span>
                    </div>
                    <div>
                      <span className="font-bold mr-3">Invoice Number:</span>
                      <span>{invoiceInfo.invoiceNumber}</span>
                    </div>
                  </div>

                  <div className="text-xs capitalize flex flex-col text-left font-bold mb-4 border-t border-gray-500">
                    <p className=" my-2">bill to</p>
                    <div className=" indent-3 ">
                      <p>{invoiceInfo.clientaddress}</p>
                      <p>{invoiceInfo.clientcity}</p>
                      <p>{invoiceInfo.clientstate}</p>
                      <p>{invoiceInfo.clientpostelcode}</p>
                      <p>{invoiceInfo.clientcountry}</p>
                      <p>{invoiceInfo.clientemail}</p>
                    </div>
                  </div>

                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-y uppercase border-gray-500">
                        <th className="text-left text-sm">items</th>
                        <th className=" pr-4 text-center text-sm">
                          description
                        </th>
                        <th className="text-right text-sm">quality</th>
                        <th className="text-right text-sm">price</th>
                        <th className="text-right text-sm">amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="w-full text-xs">{item.name}</td>
                          <td className="min-w-[50px] text-center mx-1 text-xs">
                            <p className="mx-1">{item.itemdescription}</p>
                          </td>
                          <td className="min-w-[50px] text-center text-xs">
                            {item.qty}
                          </td>
                          <td className="min-w-[80px] text-right text-xs">
                            &#8377;{Number(item.price).toFixed(2)}
                          </td>
                          <td className="min-w-[90px] text-right text-xs">
                            &#8377;{Number(item.price * item.qty).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex flex-col text-sm items-end space-y-2 pt-6">
                    <div className="flex w-full justify-between md:w-1/2">
                      <span className="font-bold">Subtotal:</span>
                      <span className="flex flex-wrap items-center gap-1 font-semibold">
                        <FaIndianRupeeSign className="text-xs" />
                        {invoiceInfo.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex w-full justify-between md:w-1/2">
                      <span className="font-bold">Discount:</span>
                      <span className="flex flex-wrap items-center gap-1 font-semibold">
                        <FaIndianRupeeSign className="text-xs" />
                        {invoiceInfo.discountRate.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex w-full justify-between md:w-1/2">
                      <span className="font-bold">Tax:</span>
                      <span className="flex flex-wrap items-center gap-1 font-semibold">
                        <FaIndianRupeeSign className="text-xs" />
                        {invoiceInfo.taxRate.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold flex flex-wrap items-center gap-1">
                        <FaIndianRupeeSign className="text-xs" />
                        {invoiceInfo.total % 1 === 0
                          ? invoiceInfo.total
                          : invoiceInfo.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-4 flex flex-wrap justify-between items-center ">
                <Buttons
                  func={SaveAsPDFHandler}
                  btnlabel="download"
                  icons={<BsCloudDownload />}
                />
                <Buttons
                  func={sendInvoiceData}
                  btnlabel="send"
                  icons={<CiMail />}
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InvoiceModal;
