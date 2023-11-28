import React, { useState } from "react";
import { T } from "components/core";
import type { direction } from "@prisma/client";

interface Props {
  direction: direction;
}

function Direction({ direction }: Props) {
  const [isDone, setIsDone] = useState(false);

  return (
    <li
      key={direction.text}
      className={`cursor-pointer ${isDone ? "line-through opacity-50" : ""}`}
    >
      <div onClick={() => setIsDone(!isDone)}>
        <T className={isDone ? "line-clamp-1" : ""}>{direction.text}</T>
      </div>
    </li>
  );
}

export default Direction;
