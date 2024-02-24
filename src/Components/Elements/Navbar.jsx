import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useStateContext } from '../Contexts/Statecontexts';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-2 hover:bg-light-gray duration-700"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
);

const Navbar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div>
      <nav className="relative shadow-xl flex flex-row flex-wrap items-center justify-between p-2 bg-white">
        <NavButton title="Menu" customFunc={handleActiveMenu} icon={<AiOutlineMenu />} />
       </nav>
    </div>
  );
};

export default Navbar;
