import React, { useMemo } from "react";
import data from "./data/Periodtable.json";
import "./PeriodicTable.css";

// a color map object that maps each category of element to a specific color
const colorMap = {
  "noble gas": "#f3d2e8",
  "alkaline earth metal": "#ffc3a0",
  "diatomic nonmetal": "#a3d5bf",
  "alkali metal": "#f88379",
  "transition metal": "#e9ff08",
  "post-transition metal": "#8eb1e7",
  "polyatomic nonmetal": "#a3d2d5",
  actinide: "#ad87bd",
  lanthanide: "#c9f",
  metalloid: "#5ed89c",
};

// prepares the data for rendering by modifying the position of certain elements and categorizing unknown elements
const prepareData = (elements) => {
  return elements.map(({ name, category, number, symbol, xpos, ypos }) => {
    const newYpos = [57, 89].includes(number) ? ypos - 3 : ypos;

    const newXpos = [9, 10].includes(newYpos) ? xpos - 1 : xpos;

    if (category.includes("unknown")) {
      const keys = Object.keys(colorMap);

      const isSubset = keys.filter((element) => category.includes(element));

      // the maximal matching category in the colormap
      const longestElement = isSubset.reduce((a, b) =>
        a.length >= b.length ? a : b
      );
      category = longestElement;
    }

    return {
      name,
      category,
      number,
      symbol,
      xpos: newXpos,
      ypos: newYpos,
    };
  });
};

const PeriodicTable = () => {
  const elements = useMemo(() => prepareData(data.elements), []);
  return (
    <div className="wrapper">
      <h5>The Periodic Table of Elements</h5>
      <div className="periodic-table">
        {elements.map(({ name, category, number, symbol, xpos, ypos }) => (
          <div
            className="element"
            key={name}
            style={{
              gridColumn: xpos,
              gridRow: ypos,
              background: colorMap[category],
            }}
          >
            <div className="number">{number}</div>
            <div className="symbol">{symbol}</div>
            <div className="name">
              <small>{name}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeriodicTable;
