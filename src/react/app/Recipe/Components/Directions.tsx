import React from "react";
import { Direction } from ".";
import { IDirection } from "../../../types/types";

interface IProps {
  directions: IDirection[];
}

function Directions({ directions }: IProps) {
  return (
    <div className={"content"}>
      <ol style={{ marginLeft: "16px" }}>
        {directions.map((direction) => (
          <Direction key={direction.text} direction={direction} />
        ))}
      </ol>
    </div>
  );
}

export default Directions;
