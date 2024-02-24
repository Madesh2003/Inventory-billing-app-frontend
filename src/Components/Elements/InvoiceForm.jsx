import React, { useState } from "react";
import { uid } from "uid";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModel";
import { FaIndianRupeeSign } from "react-icons/fa6";
import FormTextInput from "./InputField";
import Buttons from "./Buttons";
import { RiAddFill } from "react-icons/ri";
import { GrFormNext, GrPowerReset } from "react-icons/gr";

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientname, setClientname] = useState("");
  const [duedate, setDuedate] = useState("");
  const [issuedate, setIssuedate] = useState("");
  const [country, setCountry] = useState("");
  const [businessname, setBusinessname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postelcode, setPostelcode] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [clientcountry, setClientCountry] = useState("");
  const [clientaddress, setClientaddress] = useState("");
  const [clientcity, setClientCity] = useState("");
  const [clientpostelcode, setClientpostalcode] = useState("");
  const [clientstate, setClientstate] = useState("");
  const [clientemail, setClientemail] = useState("");
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: "",
      itemdescription: "",
      qty: "",
      price: "",
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevInvoiceNumber) => prevInvoiceNumber + 1);
    setItems((prevItems) => [
      ...prevItems,
      {
        id: uid(6),
        name: "",
        itemdescription: "",
        qty: "",
        price: "",
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItems) => [
      ...prevItems,
      {
        id: id,
        name: "",
        itemdescription: "",
        qty: "",
        price: "",
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);

  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  const resetForm = () => {
    setIssuedate("");
    setDuedate("");
    setInvoiceNumber("");
    setBusinessname("");
    setAddress("");
    setCity("");
    setClientCity("");
    setClientCountry("");
    setClientaddress("");
    setClientemail("");
    setClientname("");
    setClientpostalcode("");
    setClientstate("");
    setCountry("");
    setDiscount("");
    setEmail("");
    setItems([
      {
        id: uid(6),
        name: "",
        itemdescription: "",
        qty: "",
        price: "",
      }
    ]);
  };

  return (
    <form
      className="relative flex flex-col px-2 md:flex-row justify-center"
      onSubmit={handleSubmit}
    >
      <div className=" rounded-md bg-white p-4 shadow-sm md:p-6">
        <div className="flex gap-4 flex-wrap items-center justify-between">
          <div className="flex flex-wrap flex-col my-1 gap-5">
            <FormTextInput
              label="issue date"
              type="date"
              id="issuedate"
              name="issuedate"
              value={issuedate}
              width="xl:w-130"
              onChange={(e) => setIssuedate(e.target.value)}
            />

            <FormTextInput
              label="due date"
              type="date"
              id="duedate"
              name="duedate"
              value={duedate}
              width="xl:w-130"
              onChange={(e) => setDuedate(e.target.value)}
            />
          </div>

          <div>
            <FormTextInput
              label="invoice number"
              placeholder="invoice no."
              type="number"
              id="invoiceNumber"
              name="invoiceNumber"
              value={invoiceNumber}
              width="xl:w-100"
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className=" flex flex-wrap gap-5 justify-between my-10">
            <div className=" bg-main-bg p-5 rounded-md">
              <div>
                <p className=" capitalize font-semibold text-xl tracking-wider ">
                  billed by
                  <sub className=" text-gray-600 pl-3">(your details)</sub>
                </p>
              </div>
              <div className=" bg-white rounded-md flex flex-wrap justify-center mt-5 xl:w-400 md:w-340 lg:w-400  max-sm:w-72 sm:w-270">
                <FormTextInput
                  id="country"
                  type="text"
                  name="country"
                  placeholder="enter your country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />

                <FormTextInput
                  id="businessname"
                  type="text"
                  name="businessname"
                  placeholder="your business name"
                  value={businessname}
                  onChange={(e) => setBusinessname(e.target.value)}
                />
                <FormTextInput
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FormTextInput
                  id="city"
                  type="text"
                  name="city"
                  placeholder="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <FormTextInput
                  id="postelcode"
                  type="number"
                  name="postelcode"
                  placeholder="postel code"
                  value={postelcode}
                  onChange={(e) => setPostelcode(e.target.value)}
                />
                <FormTextInput
                  id="state"
                  type="text"
                  name="state"
                  placeholder="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />

                <FormTextInput
                  id="email"
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className=" bg-main-bg p-5 rounded-md">
              <div>
                <div>
                  <p className=" capitalize font-semibold text-xl tracking-wider ">
                    billed to
                    <sub className=" text-gray-600 pl-3">(client details)</sub>
                  </p>
                </div>
                <div className=" bg-white rounded-md flex flex-wrap justify-center mt-5 xl:w-400 md:w-340 lg:w-400  max-sm:w-72 sm:w-270">
                  <FormTextInput
                    id="clientcountry"
                    type="text"
                    name="clientcountry"
                    placeholder="client's country"
                    value={clientcountry}
                    onChange={(e) => setClientCountry(e.target.value)}
                  />
                  <FormTextInput
                    id="clientname"
                    type="text"
                    name="clientname"
                    placeholder="client's name"
                    value={clientname}
                    onChange={(e) => setClientname(e.target.value)}
                  />
                  <FormTextInput
                    id="clientemail"
                    type="email"
                    name="clientemail"
                    placeholder="client's email"
                    value={clientemail}
                    onChange={(e) => setClientemail(e.target.value)}
                  />

                  <FormTextInput
                    id="clientaddress"
                    type="text"
                    name="clientaddress"
                    placeholder="address"
                    value={clientaddress}
                    onChange={(e) => setClientaddress(e.target.value)}
                  />

                  <FormTextInput
                    id="clientcity"
                    type="text"
                    name="clientcity"
                    placeholder="city"
                    value={clientcity}
                    onChange={(e) => setClientCity(e.target.value)}
                  />

                  <FormTextInput
                    id="clientpostelcode"
                    type="number"
                    name="clientpostelcode"
                    placeholder="postel code"
                    value={clientpostelcode}
                    onChange={(e) => setClientpostalcode(e.target.value)}
                  />
                  <FormTextInput
                    id="clientstate"
                    type="text"
                    name="clientstate"
                    placeholder="state"
                    value={clientstate}
                    onChange={(e) => setClientstate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <table className="w-full p-4 text-left">
          <thead className="">
            <tr className="flex flex-wrap justify-around border-b uppercase tracking-wider border-gray-900/10 text-sm text-center md:text-base">
              <th>item</th>
              <th>itemdescription</th>
              <th>quantity</th>
              <th>price</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody className="">
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                itemdescription={item.itemdescription}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>

        <div className="my-3">
          <Buttons
            type="button"
            btnlabel="additems"
            icons={<RiAddFill />}
            func={addItemHandler}
          />
        </div>

        <div className=" flex flex-wrap justify-evenly my-10">
          <FormTextInput
            label="tax rate"
            type="number"
            name="tax"
            id="tax"
            min="0"
            step="1"
            placeholder="Tax"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
            width="xl:w-100"
          />
          <FormTextInput
            label="discount rate"
            type="number"
            name="discount"
            id="discount"
            min="0"
            step="1"
            placeholder="discount"
            value={discount}
            width="xl:w-100"
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span className="flex flex-wrap items-center gap-1 font-semibold">
              <FaIndianRupeeSign className="text-xs" />
              {subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Discount:</span>
            <span className="flex flex-wrap items-center gap-1 font-semibold">
              ({discount || "0"}%)
              <FaIndianRupeeSign className="text-xs" />
              {discountRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Tax:</span>
            <span className="flex flex-wrap items-center gap-1 font-semibold">
              ({tax || "0"}%)
              <FaIndianRupeeSign className="text-xs" />
              {taxRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold flex flex-wrap items-center gap-1">
              <FaIndianRupeeSign className="text-xs" />
              {total % 1 === 0 ? total : total.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="basis-1/4 bg-transparent">
          <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
            <div className="flex flex-wrap justify-between mt-5">
              <Buttons type="submit" btnlabel="next" icons={<GrFormNext />} />
              <Buttons
                type="button"
                btnlabel="reset"
                func={resetForm}
                icons={<GrPowerReset />}
              />
            </div>
            <InvoiceModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              invoiceInfo={{
                invoiceNumber,
                businessname,
                clientname,
                subtotal,
                taxRate,
                discountRate,
                total,
                issuedate,
                duedate,
                clientemail,
                clientaddress,
                clientcity,
                clientstate,
                clientpostelcode,
                clientcountry,
                email,
                address,
                city,
                postelcode,
                country,
                state,
              }}
              items={items}
              onAddNextInvoice={addNextInvoiceHandler}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
