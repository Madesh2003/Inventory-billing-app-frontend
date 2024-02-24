import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../Contexts/Statecontexts";
import { FaRankingStar } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ background: "#5F3AFF" }}
                className="text-xl rounded-full p-3 hover:bg-light-gray duration-500 mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
          </div>

          <div className="mt-10 ">
           
            <div>
              <p className="text-gray-400 m-3 mt-4 uppercase">
                billing
              </p>
              <NavLink
                to="/invoices-data"
                key="invoicesdata"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaRankingStar />
                <span className="uppercase ">invoicesdata</span>
              </NavLink>
              <NavLink
                to="/create-invoice"
                key="createinvoice"
                onClick={handleCloseSideBar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#5F3AFF" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaShoppingCart />
                <span className="uppercase ">generate</span>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
