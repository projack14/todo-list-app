import { FC, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: FC<Props> = (props) => {
  const { label } = props;

  return (
    <button
      className="bg-cyan-900 text-white font-bold py-2 px-4 rounded-lg disabled:bg-slate-700"
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
