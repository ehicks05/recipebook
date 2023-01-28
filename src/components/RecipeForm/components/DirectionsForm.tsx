import { T, Button } from "components/core";
import type {
  FieldErrors,
  UseFieldArrayReturn,
  UseFormRegister,
} from "react-hook-form";
import { HiMinus, HiPlus } from "react-icons/hi";
import type { FormRecipe } from "../constants";
import { DEFAULT_DIRECTION } from "../constants";
import { MyHiddenInput, MyTextArea } from "./StyledInputs";

interface Props {
  directionsFieldArray: UseFieldArrayReturn<FormRecipe, "directions", "id">;
  register: UseFormRegister<FormRecipe>;
  errors: FieldErrors<FormRecipe>;
}

const DirectionsForm = ({ directionsFieldArray, register, errors }: Props) => {
  return (
    <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-3">
      <T className="text-lg font-semibold">Directions</T>
      <div className="flex flex-col gap-6">
        {directionsFieldArray.fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2">
            <T className="pr-2">{index + 1}.</T>
            <MyHiddenInput name={`directions.${index}.index`} />
            <MyTextArea
              name={`directions.${index}.text`}
              placeholder="Description"
              register={register}
              error={errors.directions?.[index]?.text}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                directionsFieldArray.remove(index);
              }}
            >
              <HiMinus />
            </Button>
          </div>
        ))}
        <div>
          <Button
            onClick={() =>
              directionsFieldArray.append({
                ...DEFAULT_DIRECTION,
                // index: values.directions.length,
              })
            }
          >
            <HiPlus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DirectionsForm;
