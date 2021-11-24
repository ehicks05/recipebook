import React, { useState } from 'react';
import Picker, { IEmojiData } from 'emoji-picker-react';

interface IProps {
  updateEmoji: (code: string) => void;
  data: { value: string };
}

function EmojiSelector({ updateEmoji, data }: IProps) {
  const [isEditing, setIsEditing] = useState(false);
  const onEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    updateEmoji(emojiObject.emoji);
    setIsEditing(false);
  };

  return isEditing ? (
    <div>
      <Picker
        onEmojiClick={onEmojiClick}
        disableAutoFocus
        disableSkinTonePicker
        disableSearchBar
        pickerStyle={{
          width: '100%', boxShadow: 'none', background: '#222', borderColor: '#444',
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
      <button className="button is-fullwidth" type="button" onClick={() => setIsEditing(false)}>Close</button>
    </div>
  ) : (<button className="button is-size-1" type="button" onClick={() => setIsEditing(true)}>{ data.value }</button>);
}

export default EmojiSelector;
