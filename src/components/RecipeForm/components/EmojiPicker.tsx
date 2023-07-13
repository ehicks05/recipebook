import type { ReactNode} from "react";
import React, { useEffect, useRef } from "react";

import "emoji-picker-element";
import type Picker from "emoji-picker-element/picker";
import type { EmojiClickEvent } from "emoji-picker-element/shared";

interface EmojiPickerProps {
  onEmojiClick: (e: EmojiClickEvent) => void;
  children?: ReactNode;
}

const EmojiPicker = ({ onEmojiClick, children }: EmojiPickerProps) => {
  const ref = useRef<Picker>(null);

  useEffect(() => {
    const { current } = ref;
    if (!current) {
      return;
    }
    current.addEventListener("emoji-click", onEmojiClick);
    return () => {
      current.removeEventListener("emoji-click", onEmojiClick);
    };
  });

  // @ts-expect-error web component
  return <emoji-picker ref={ref}>{children}</emoji-picker>;
};

export default EmojiPicker;
