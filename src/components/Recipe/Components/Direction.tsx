import React, { useState } from "react";
import { T } from "components/core";
import Timer from "./Timer";
import type { direction } from "@prisma/client";

const firstTimeUnitIndex = (input: string) =>
  input.indexOf("minute") > -1 || input.indexOf("hour") > -1;

interface Props {
  direction: direction;
}

function extractTiming(text: string) {
  const words = text.split(" ");
  const timeIndex = words.findIndex(firstTimeUnitIndex);
  let timeAmount = 0;
  if (timeIndex > -1) {
    timeAmount = parseInt(words[timeIndex - 1] || "", 10);
    if (Number.isNaN(timeAmount)) timeAmount = 0;

    const isHours = (words[timeIndex] || "").indexOf("hour") > -1;
    if (isHours) timeAmount *= 60;
  }

  return timeAmount;
}

function Direction({ direction }: Props) {
  const [isDone, setIsDone] = useState(false);
  const timeAmount = extractTiming(direction.text);
  const timer = timeAmount > 0 ? <Timer minutes={timeAmount} /> : null;

  return (
    <li
      key={direction.text}
      className={`cursor-pointer ${isDone ? "line-through opacity-50" : ""}`}
    >
      <div onClick={() => setIsDone(!isDone)}>
        <T className={isDone ? "line-clamp-1" : ""}>{direction.text}</T>
      </div>
      {!isDone && timer}
    </li>
  );
}

export default Direction;