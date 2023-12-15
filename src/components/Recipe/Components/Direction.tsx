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
      className={`cursor-pointer ${isDone ? "line-through opacity-50" : ""}` }
    >
      <div onClick={() => setIsDone(!isDone)}>
        <T className={`flex flex-col gap-2`}>
          {direction.text.split("\n\n").map((paragraph) => (
            <span className={`${isDone ? "line-clamp-1" : ""}`} key={paragraph}>
              {paragraph}
            </span>
          ))}
        </T>
      </div>
    </li>     
  );
}

export default Direction;
