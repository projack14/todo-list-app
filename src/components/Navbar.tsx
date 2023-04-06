import {
  HiMenu,
  HiUser,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineUserAdd,
} from "react-icons/hi";
import withReactContent from "sweetalert2-react-content";
import { Menu, Transition, Switch } from "@headlessui/react";
import { FC, Fragment, useState, useContext, useEffect } from "react";
import { NavigateParam } from "@/utils/navigation";

import { ThemeContext } from "@/utils/context";
import { RootState } from "@/utils/types/redux";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Images from "../assets/react.svg";
import Swal from "@/utils/swal";

const Navbar: FC = () => {
  const { uname, isLoggedIn } = useSelector((state: RootState) => state.data);
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(false);
  const [, , removeCookie] = useCookies();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  function handleTheme(mode: string) {
    setTheme(mode);
  }

  function handleLogout() {
    MySwal.fire({
      title: "Logout",
      text: "Are you sure?",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("tkn");
        removeCookie("uname");
        navigate("/login");
      }
    });
  }

  return (
    <nav className="flex bg-cyan-900 dark:bg-slate-800 w-full h-12 items-center justify-center md:justify-around lg:justify-between p-5 ">
      <Link to="/">
        <div className="flex flex-row">
          <img src={Images} alt="" />
        </div>
      </Link>
      <div>
        <p className=" text-white p-2  font-bold text-3xl">TODO LIST APP</p>
      </div>
      <Menu as="div" className=" relative inline-block text-left">
        <div className="flex flex-row items-center">
          <div className="p-3">
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? "bg-white bg-opacity-20" : "bg-black bg-opacity-20"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
              onClick={() => handleTheme(theme === "dark" ? "light" : "dark")}
            >
              <span
                className={`${
                  enabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </Menu>
    </nav>
  );
};

export default Navbar;
