import { Idx } from "../../constant";

function Option({ value, idx, handleClick }) {
  return (
    <div
      className="flex items-center space-x-3 mb-5 cursor-pointer text-neutral-700 bg-neutral-200/50 rounded-full py-3 px-3 md:hover:bg-blue-600/90 md:hover:text-neutral-50 text-sm font-semibold active:text-neutral-50 active:bg-red-600/90 md:active:bg-blue-600/90"
      onClick={() => handleClick(value)}
    >
      <p>{Idx[idx]}.</p>

      <p>{value}</p>
    </div>
  );
}

export default Option;
