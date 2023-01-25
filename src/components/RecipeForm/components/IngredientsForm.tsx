import { T, Button } from "components/core";
import type { UseFieldArrayReturn, UseFormRegister } from "react-hook-form";
import { HiMinus, HiPlus } from "react-icons/hi";
import type { FormRecipe } from "../constants";
import { UNIT_OPTIONS, DEFAULT_INGREDIENT } from "../constants";
import { MyHiddenInput, MyInput, MySelect } from "./StyledInputs";

interface Props {
  ingredientsFieldArray: UseFieldArrayReturn<FormRecipe, "ingredients", "id">;
  register: UseFormRegister<FormRecipe>;
}

const IngredientsForm = ({ ingredientsFieldArray, register }: Props) => {
  return (
    <div className="flex flex-col gap-2 md:col-span-1 lg:col-span-2">
      <T className="text-lg font-semibold">Ingredients</T>
      {ingredientsFieldArray.fields.map((field, index) => (
        <div key={index} className="flex flex-col gap-2">
          <MyHiddenInput name={`ingredients.${index}.index`} />
          <div className="flex items-start gap-2">
            <MyInput
              name={`ingredients.${index}.quantity`}
              placeholder="Quantity"
              register={register}
            />
            <MySelect name={`ingredients.${index}.unit`} register={register}>
              {UNIT_OPTIONS}
            </MySelect>
            <Button
              onClick={(e) => {
                e.preventDefault();
                ingredientsFieldArray.remove(index);
              }}
            >
              <HiMinus />
            </Button>
          </div>
          <MyInput
            name={`ingredients.${index}.name`}
            placeholder="Name"
            register={register}
          />
        </div>
      ))}
      <div>
        <Button
          onClick={() =>
            ingredientsFieldArray.append({
              ...DEFAULT_INGREDIENT,
              // index: values.ingredients.length,
            })
          }
        >
          <HiPlus />
        </Button>
      </div>
    </div>
  );
};

export default IngredientsForm;
