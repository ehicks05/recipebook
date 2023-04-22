import { T, Button, MyInput, MySelect } from "components/core";
import type {
  UseFieldArrayReturn,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { HiMinus, HiPlus } from "react-icons/hi";
import type { FormRecipe } from "../constants";
import { UNIT_OPTIONS, DEFAULT_INGREDIENT } from "../constants";

interface Props {
  ingredientsFieldArray: UseFieldArrayReturn<FormRecipe, "ingredients", "id">;
  register: UseFormRegister<FormRecipe>;
  errors: FieldErrors<FormRecipe>;
}

const IngredientsForm = ({
  ingredientsFieldArray,
  register,
  errors,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 md:col-span-1 lg:col-span-2">
      <T className="text-lg font-semibold">Ingredients</T>
      <div className="flex flex-col gap-6">
        {ingredientsFieldArray.fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-2">
            <MyInput type="hidden" name={`ingredients.${index}.index`} />
            <div className="flex items-start gap-2">
              <MyInput
                name={`ingredients.${index}.quantity`}
                placeholder="Quantity"
                register={register}
                error={errors.ingredients?.[index]?.quantity}
              />
              <MySelect
                name={`ingredients.${index}.unit`}
                register={register}
                error={errors.ingredients?.[index]?.unit}
              >
                {UNIT_OPTIONS}
              </MySelect>
              <Button
                disabled={ingredientsFieldArray.fields.length <= 1}
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
              error={errors.ingredients?.[index]?.name}
            />
          </div>
        ))}
        <div className="text-right">
          <Button
            onClick={() => {
              ingredientsFieldArray.append({
                ...DEFAULT_INGREDIENT,
                // index: values.ingredients.length,
              });
            }}
          >
            <HiPlus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IngredientsForm;
