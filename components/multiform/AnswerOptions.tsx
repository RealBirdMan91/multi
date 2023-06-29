import React, { useEffect, useState } from "react";
import RadioButton from "../shared/RadioButton";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CreateNewPoll } from "@/types/CreatePollSchema";
import InputField from "../shared/Input";
import Button from "../shared/Button";

function AnswerOptions() {
  const { register, formState, getValues, control } =
    useFormContext<CreateNewPoll>();
  const { fields, append, remove } = useFieldArray({
    name: "answerOptions",
    control,
  });

  return (
    <div className="flex flex-col gap-2 w-full p-4">
      <fieldset className="flex flex-col font-semibold  gap-2 ">
        <RadioButton
          id="single"
          label="Single Choice"
          value="single"
          {...register("choice")}
        />
        <RadioButton
          id="multiple"
          label="Multiple Choice"
          value="multiple"
          {...register("choice")}
        />
      </fieldset>
      <hr className="border border-black"></hr>
      <fieldset className="flex pt-2 flex-col gap-2 justify-around">
        {fields.map((field, idx) => (
          <div
            key={field.id}
            className="flex flex-row justify-between overflow-scroll"
          >
            <InputField
              type="text"
              placeholder="Answer Option"
              width="full"
              id={field.id}
              showLabel={false}
              {...register(`answerOptions.${idx}.option`)}
              error={formState?.errors?.answerOptions?.[idx]?.option}
            />
            <Button
              variant="secondary"
              type="button"
              size="xs"
              className="button"
              onClick={() => remove(idx)}
            >
              -
            </Button>
          </div>
        ))}

        <div className="flex my-1">
          <Button
            type="button"
            size="small"
            className="ml-auto"
            variant="secondary"
            onClick={() => append({ option: "" })}
          >
            + Option
          </Button>
        </div>
      </fieldset>
    </div>
  );
}

export default AnswerOptions;
