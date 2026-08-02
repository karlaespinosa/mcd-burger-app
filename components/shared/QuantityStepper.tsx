import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  ariaLabelDecreaseBtn?: string;
  ariaLabelIncreaseBtn?: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuantityStepper = ({
  value,
  onIncrement,
  onDecrement,
  ariaLabelDecreaseBtn = "",
  ariaLabelIncreaseBtn = "",
}: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center rounded-full border border-neutral-700 bg-neutral-950">
        <button
          type="button"
          onClick={onDecrement}
          aria-label={ariaLabelDecreaseBtn}
          className="cursor-pointer rounded-l-full p-2.5 text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
        >
          <Minus aria-hidden="true" className="h-4 w-4" />
        </button>

        <span className="min-w-10 text-center text-sm font-bold">{value}</span>

        <button
          type="button"
          onClick={onIncrement}
          aria-label={ariaLabelIncreaseBtn}
          className="cursor-pointer rounded-r-full p-2.5 text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
        >
          <Plus aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
