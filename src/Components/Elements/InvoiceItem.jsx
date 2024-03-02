import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Buttons from "./Buttons";
import FormTextInput from "./InputField";

const InvoiceItem = ({
  index,
  name,
  quality,
  price,
  itemdescription,
  onDeleteItem,
  onEditItem,
}) => {
  const deleteItemHandler = () => {
    onDeleteItem(index);
  };

  const handleInputChange = (event) => {
    onEditItem(event, index); 
  };

  return (
    <tr className="flex flex-wrap justify-between">
      <td className="">
        <FormTextInput
          onChange={handleInputChange}
          placeholder="name"
          type="text"
          name="name"
          value={name}
          width="w-100"
          id="name"
        />
      </td>
      <td className="">
        <FormTextInput
          onChange={handleInputChange}
          placeholder="item description"
          type="text"
          name="itemdescription"
          id="itemdescription"
          value={itemdescription}
          width="w-150"
        />
      </td>
      <td className="">
        <FormTextInput
          onChange={handleInputChange}
          placeholder="quantity"
          type="number"
          name="quality"
          id="quality"
          value={quality}
          width="w-100"
        />
      </td>
      <td>
        <FormTextInput
          onChange={handleInputChange}
          placeholder="Price"
          type="number"
          name="price"
          id="price"
          value={price}
          width="w-100"
        />
      </td>
      <td className="flex items-center justify-center">
        <Buttons
          func={deleteItemHandler}
          type="button"
          icons={<FaRegTrashAlt />}
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
