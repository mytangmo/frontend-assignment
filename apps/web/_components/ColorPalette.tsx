import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

interface ColorType {
  id: string;
  type: string;
  className: string;
  selected: boolean;
}
const COLOR_PALETTE_DEFAULT: ColorType[] = [
  {
    id: "green",
    type: "GREEN",
    className: "border-2 border-[#00C12B33] bg-[#00C12B]",
    selected: false,
  },
  {
    id: "red",
    type: "RED",
    className: "border-2 border-[#F5060633] bg-[#F50606]",
    selected: false,
  },
  {
    id: "yellow",
    type: "YELLOW",
    className: "border-2 border-[#F5DD0633] bg-[#F5DD06]",
    selected: false,
  },
  {
    id: "orange",
    type: "ORANGE",
    className: "border-2 border-[#F5790633] bg-[#F57906]",
    selected: false,
  },
  {
    id: "cyan",
    type: "CYAN",
    className: "border-2 border-[#06CAF533] bg-[#06CAF5]",
    selected: false,
  },
  {
    id: "blue",
    type: "BLUE",
    className: "border-2 border-[#063AF533] bg-[#063AF5]",
    selected: false,
  },
  {
    id: "purple",
    type: "PURPLE",
    className: "border-2 border-[#7D06F533] bg-[#7D06F5]",
    selected: false,
  },
  {
    id: "pink",
    type: "PINK",
    className: "border-2 border-[#F506A433] bg-[#F506A4]",
    selected: false,
  },
  {
    id: "white",
    type: "WHITE",
    className: "border-2 border-[#00000033] bg-white",
    selected: false,
  },
  {
    id: "black",
    type: "BLACK",
    className: "border-2 border-black bg-black",
    selected: false,
  },
];

export default function ColorPalette() {
  const [colorPalette, setColorPalette] = useState<ColorType[]>(
    COLOR_PALETTE_DEFAULT,
  );

  const handleSelectColor = (colorId: string) => {
    setColorPalette((currentColors) =>
      currentColors.map((color) =>
        color.id === colorId
          ? {
              ...color,
              selected: !color.selected,
            }
          : color,
      ),
    );
  };
  return (
    <section>
      <div className="grid grid-cols-5 gap-1.5">
        {colorPalette.map((color) => (
          <button
            key={color.id}
            type="button"
            title={color.type}
            aria-label={`Select ${color.type}`}
            aria-pressed={color.selected}
            className={`
              flex size-9.25 items-center justify-center rounded-full
              ${color.className}
            `}
            onClick={() => handleSelectColor(color.id)}
          >
            {color.selected && (
              <FiCheck
                size={13}
                color={color.id === "white" ? "black" : "white"}
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
