import { T } from "components/core";
import type { UseFormRegister } from "react-hook-form";
import { MyInput, MySelect, MyTextArea } from "./StyledInputs";

interface Props {
  errors: any;
  register: UseFormRegister<any>;
}

const RecipeDetailsForm = ({ errors, register }: Props) => {
  return (
    <div className="flex flex-col gap-2 md:col-span-1 lg:col-span-2">
      <T className="text-lg font-semibold">Recipe Details</T>

      <MyInput
        name="name"
        label="Name"
        placeholder="Name"
        register={register}
        error={errors.name}
      />
      <MyTextArea
        name="description"
        label="Description"
        placeholder="Description"
        register={register}
        error={errors.description}
      />

      <div className="flex gap-2">
        <MyInput
          containerClassName=""
          type="string"
          name="cookingTime"
          label="Time"
          placeholder="Minutes"
          min="1"
          register={register}
          error={errors.cookingTime}
        />
        <MyInput
          type="number"
          name="servings"
          label="Serves"
          placeholder="Servings"
          min="1"
          register={register}
          error={errors.servings}
        />
        <MySelect
          label="Difficulty"
          name="difficulty"
          register={register}
          error={errors.difficulty}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </MySelect>
      </div>
      <div className="flex flex-col gap-1">
        <MyInput
          name="emoji"
          label="Emoji"
          placeholder="Emoji"
          register={register}
          error={errors.emoji}
        />
        {/* <label className="label">
                  <T>Emoji</T>
                </label>
                <div className="control">
                  <EmojiSelector
                    data={{ value: values.emoji }}
                    updateEmoji={(code) => setFieldValue("emoji", code)}
                  />
                </div> */}
      </div>
    </div>
  );
};

export default RecipeDetailsForm;
