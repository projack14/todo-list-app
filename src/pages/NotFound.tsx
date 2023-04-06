import { Component, FC } from "react";

import { TbMoodCry } from "react-icons/tb";
import Layout from "@/components/Layout";
import { useTitle } from "@/utils/hooks";

const NotFound: FC = () => {
  useTitle("Error: page not found");
  return (
    <Layout>
      <div id="error-page" className="text-slate-900 text-center">
        <p className="text-7xl flex justify-center">
          <TbMoodCry />
        </p>
        <h1 className="text-5xl text-bold mb-5">Oops!</h1>
        <p className="text-base mb-1">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-base">
          <i>Page not found</i>
        </p>
      </div>
    </Layout>
  );
};

export default NotFound;
