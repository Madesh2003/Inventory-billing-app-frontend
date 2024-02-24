import React from "react";
import ItemField from "./ItemField";
import { FaRegTrashAlt } from "react-icons/fa";
import Buttons from "./Buttons";

const InvoiceItem = ({
  id,
  name,
  qty,
  price,
  itemdescription,
  onDeleteItem,
  onEdtiItem,
}) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <tr className="flex flex-wrap justify-start gap-14">
      <td className="">
        <ItemField
          onChange={(event) => onEdtiItem(event)}
          placeholder="name"
          type="text"
          name="name"
          id={id}
          value={name}
          width="w-150"
        />
      </td>
      <td className="">
        <ItemField
          onChange={(event) => onEdtiItem(event)}
          placeholder="item description"
          type="text"
          name="itemdescription"
          id={id}
          value={itemdescription}
          width="w-200"
        />
      </td>
      <td className="">
        <ItemField
          onChange={(event) => onEdtiItem(event)}
          placeholder="quantity"
          type="number"
          name="qty"
          id={id}
          width="w-100"
          value={qty}
          
        />
      </td>
      <td>
        <ItemField
          onChange={(event) => onEdtiItem(event)}
          placeholder="Price"
          type="number"
          name="price"
          id={id}
          value={price}
          width="w-100"
        />
      </td>
      <td className="flex items-center justify-center">
       
        <Buttons
        func={deleteItemHandler}
        type="button"
        icons={ <FaRegTrashAlt />}
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
