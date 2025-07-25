import {FC} from "react";
import Link from "next/link";

const WelcomePage: FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center  bg-black text-[#c9b683]">
      <p className="text-xl font-medium mb-6">
        you’re all set :D
      </p>
      <Link
        href="/todos"
        className="text-[#c0951e] underline hover:text-[#F0B100] transition"
      >
        check out your todos →
      </Link>
    </div>
  );
};

export default WelcomePage;
