import React, { useState } from 'react';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { Button } from 'core-components';

interface IProps {
  updateEmoji: (code: string) => void;
  data: { value: string };
}

function EmojiSelector({ updateEmoji, data }: IProps) {
  const [isEditing, setIsEditing] = useState(false);
  const onEmojiClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ) => {
    updateEmoji(emojiObject.emoji);
    setIsEditing(false);
  };

  return isEditing ? (
    <div>
      <Picker
        onEmojiClick={onEmojiClick}
        disableAutoFocus
        disableSkinTonePicker
        pickerStyle={{
          width: '100%',
          boxShadow: 'none',
          background: '#222',
          borderColor: '#444',
        }}
        native
        groupVisibility={{
          smileys_people: false,
          animals_nature: false,
          travel_places: false,
          activities: false,
          objects: false,
          symbols: false,
          flags: false,
        }}
      />
      <Button className="is-fullwidth" onClick={() => setIsEditing(false)}>
        Close
      </Button>
    </div>
  ) : (
    <Button
      className="px-3 py-3 bg-neutral-100 dark:bg-neutral-800 text-5xl"
      onClick={() => setIsEditing(true)}
    >
      {data.value}
    </Button>
  );
}

export default EmojiSelector;
