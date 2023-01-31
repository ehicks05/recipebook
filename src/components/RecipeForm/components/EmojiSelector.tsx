import React, { useState } from "react";
import type { EmojiClickData } from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import { Button } from "components/core";

interface IProps {
  updateEmoji: (code: string) => void;
  data: { value: string };
}

function EmojiSelector({ updateEmoji, data }: IProps) {
  const [isEditing, setIsEditing] = useState(false);
  const onEmojiClick = (emoji: EmojiClickData) => {
    updateEmoji(emoji.emoji);
    setIsEditing(false);
  };

  return isEditing ? (
    <div>
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        autoFocusSearch={false}
        skinTonesDisabled
        // pickerStyle={{
        //   width: "100%",
        //   boxShadow: "none",
        //   background: "#222",
        //   borderColor: "#444",
        // }}
        // groupVisibility={{
        //   smileys_people: false,
        //   animals_nature: false,
        //   travel_places: false,
        //   activities: false,
        //   objects: false,
        //   symbols: false,
        //   flags: false,
        // }}
      />
      <Button className="is-fullwidth" onClick={() => setIsEditing(false)}>
        Close
      </Button>
    </div>
  ) : (
    <button
      type="button"
      className="rounded bg-neutral-100 p-4 text-4xl dark:bg-neutral-800"
      onClick={() => setIsEditing(true)}
    >
      {data.value}
    </button>
  );
}

export default EmojiSelector;
