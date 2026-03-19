const Title = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col items-center gap-2 mb-10">
      <div className="flex items-center gap-3">
        <span className="text-2xl sm:text-3xl font-light text-gray-400 tracking-wide">{text1}</span>
        <span className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-wide">{text2}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-8 h-[1px] bg-gray-300"></span>
        <span className="w-2 h-2 rounded-full bg-gray-900"></span>
        <span className="w-8 h-[1px] bg-gray-300"></span>
      </div>
    </div>
  );
};

export default Title;
