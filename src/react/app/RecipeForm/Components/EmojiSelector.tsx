import Select, { Styles } from 'react-select';
import React, { CSSProperties, useEffect, useState } from 'react';
import { Props } from 'react-select/src/styles';
import { ActionMeta, ValueType } from 'react-select/src/types';
import { IEmoji } from '../../../types/types';
import authFetch from '../../../authFetch';

interface IEmojiOption {
  value: string;
  label: string;
}

interface IProps {
  updateEmoji: (code: string) => void;
  data: { value: string };
}

function EmojiSelector(props: IProps) {
  const [emojis, setEmojis] = useState<IEmojiOption[] | undefined>([]);

  const onSelectChange = (v?: ValueType<IEmojiOption>) => {
    if (v && 'value' in v) {
      props.updateEmoji(v.value);
    }
  };

  const customStyles: Partial<Styles> = {
    singleValue: (base: CSSProperties, props: Props) => ({
      ...base,
      alignItems: 'center',
      display: 'flex',
      ':before': {
        content: `'${props.data.value}'`,
        borderRadius: 10,
        display: 'block',
        marginRight: 8,
        marginBottom: 8,
        height: 15,
        width: 15,
      },
    }),
    option: (base: CSSProperties, props: Props) => ({
      ...base,
      alignItems: 'center',
      display: 'flex',
      ':before': {
        content: `'${props.data.value}'`,
        borderRadius: 10,
        display: 'block',
        marginRight: 8,
        marginBottom: 8,
        height: 15,
        width: 15,
      },
    }),
  };

  useEffect(() => {
    loadEmojis();
  }, []);

  function loadEmojis() {
    authFetch('/emoji').then(json =>
      setEmojis(
        json.map((emoji: IEmoji) => ({
          value: emoji.character,
          label: emoji.slug,
        })),
      ),
    );
  }

  return <Select options={emojis} styles={customStyles} onChange={onSelectChange} />;
}

export default EmojiSelector;
