import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function FormTextInput({
  id = "",
  name = "",
  value = "",
  type = "",
  label = "",
  width = "",
  placeholder = "",
  min = 0,
  step = 0,
  onChange = () => {},
  onBlur = () => {},
}) {   

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 my-2">
        <label htmlFor={id} className="uppercase font-bold tracking-wider">
          {label}
        </label><br />
        <input
          type={type || "text"}
          className={`block border-gray-500 shadow-sm border-b-1 focus:border-blue-600 hover:border-blue-600 duration-700 before:border-blue-500 outline-none placeholder:text-start placeholder:tracking-widest placeholder:font-semibold py-1 max-sm:w-56 sm:w-60 lg:w-72 md:w-56 ${width} `}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          step={step}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}

FormTextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  width: PropTypes.string,
  min: PropTypes.number,
  step: PropTypes.number,
};
