import { FC, ReactNode } from "react";
import { useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}
const ColorList = ["#F5A623", "#8B572A", "#417505"];

const getRandomColor = () => {
  return ColorList[Math.floor(Math.random() * ColorList.length)];
};

export const Form: FC<Props> = (props) => {
  return (
    <div className=" flex flex-col justify-center items-center bg-slate-300 dark:bg-slate-800  rounded-2xl w-[80%] lg:w-[50%] ">
      {props.children}
    </div>
  );
};

export const Box: FC<Props> = (props) => {
  const backgroundColor = getRandomColor();

  return (
    <div
      className="flex justify-center items-center rounded-2xl w-full"
      style={{ backgroundColor }}
    >
      {" "}
      <div>{props.children}</div>
    </div>
  );
};
