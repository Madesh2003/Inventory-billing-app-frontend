import PropTypes from "prop-types";

export default function ItemField({
  id = "",
  name = "",
  value = "",
  type = "",
  label = "",
  width="",
  placeholder = "",
  min=0,
  step=0,
  onChange = () => {},
  onBlur = () => {},
  error,
  touched = false,
}) {
  return (
    <div>
    <label htmlFor={id} className="capitalize font-semibold">
        {label}
      </label><br />
      <input
        type={type || "text"}
        className={`block border-gray-500 capitalize shadow-sm border-b-1 focus:border-blue-600 hover:border-blue-600 duration-700 before:border-blue-500 outline-none placeholder:text-start placeholder:font-semibold py-1 placeholder:pl-2 ${width}`}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{width: `${width}`}}
        min={min}
        step={step}
      />
    </div>
  );
}

ItemField.propTypes = {
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
  step: PropTypes.number
  };
