import { T, Button, Dialog } from "components/core";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { FormRecipe } from "../constants";
import emojiData from "@emoji-mart/data";

const EmojiInput = ({ control }: { control: Control<FormRecipe> }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      name="emoji"
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-1">
          <label>
            <T>Emoji</T>
          </label>
          <Button
            type="button"
            className="max-w-fit py-4 text-6xl"
            onClick={() => setIsOpen(true)}
          >
            {field.value}
          </Button>
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            body={
              <div className="mx-auto w-min">
                <Picker
                  data={emojiData}
                  onEmojiSelect={(data: { native: string }) =>
                    field.onChange(data.native)
                  }
                  categories={["foods"]}
                  previewPosition="none"
                  searchPosition="none"
                  perLine={7}
                />
              </div>
            }
            footer={<div></div>}
          />
          {control.getFieldState("emoji").error && (
            <div className="text-sm text-red-600">
              {control.getFieldState("emoji").error?.message}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default EmojiInput;
