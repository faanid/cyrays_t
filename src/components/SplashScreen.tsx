import { FC } from "react";

const SplashScreen: FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#000000] to-[#caaf63] text-white">
      <h1 className="text-4xl font-bold mb-6 animate-pulse">
        ToDo App
      </h1>
      <div className="w-12 h-12 border-4 border-white border-dashed rounded-full animate-spin" />
      <p className="mt-4 text-sm text-white/70">loading...</p>
    </div>
  );
};

export default SplashScreen;
