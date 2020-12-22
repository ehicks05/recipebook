import Select, { Styles } from 'react-select';
import React, { CSSProperties } from 'react';
import { Props } from 'react-select/src/styles';
import { ValueType } from 'react-select/src/types';
import EMOJI_OPTIONS from '../../../constants/emojis';

interface IEmojiOption {
  value: string;
  label: string;
}

interface IProps {
  updateEmoji: (code: string) => void;
  data: { value: string };
}

function EmojiSelector(props: IProps) {
  const onSelectChange = (v?: ValueType<IEmojiOption, false>) => {
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

  return (
    <Select
      options={EMOJI_OPTIONS}
      styles={customStyles}
      onChange={onSelectChange}
    />
  );
}

export default EmojiSelector;
