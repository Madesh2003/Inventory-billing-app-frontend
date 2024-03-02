import PropTypes from "prop-types";


const requiredFields = ["country", "issuedate", "duedate","invoiceNumber","businessname","email","clientname","clientemail","name","quality","price","tax"];

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
        <>
        <label htmlFor={id} className="uppercase font-bold tracking-wider">
          {label}
        </label><br />
        <input
          type={type || "text"}
          className={`block border-gray-500 shadow-sm border-b-1 focus:border-blue-600 hover:border-blue-600 duration-700 before:border-blue-500 outline-none placeholder:capitalize placeholder:text-start placeholder:tracking-widest placeholder:font-semibold py-1 ${width}`}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          step={step}
          onBlur={onBlur}
          required={requiredFields.includes(id)}
        />
        </>
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
