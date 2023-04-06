import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FC, useState, useMemo, useEffect } from "react";
import axios from "axios";

import NotFound from "@/pages/NotFound";
import Home from "@/pages";
import Detailed from "@/pages/Detailed";

import { ThemeContext } from "@/utils/context";

axios.defaults.baseURL = "https://api.todoist.com/rest/v2/";

const Router: FC = () => {
  const [theme, setTheme] = useState<string>("light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/detailed/:detail",
      element: <Detailed />,
      errorElement: <NotFound />,
    },
  ]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default Router;
