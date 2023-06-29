import React from "react";
import InputField from "../shared/Input";
import { set, useFormContext } from "react-hook-form";
import { CreateNewPoll } from "@/types/CreatePollSchema";
import InputFieldDescription from "../shared/Textarea";

function CreatePoll() {
  const { register, formState } = useFormContext<CreateNewPoll>();

  return (
    <>
      <h1 className="text-3xl font-black text-black">Create a Poll</h1>
      <div className="flex flex-col gap-8 w-full px-4 py-6">
        <InputField
          {...register("question")}
          error={formState.errors.question}
          label="Question"
          showLabel={false}
          type="text"
          width="full"
          placeholder="Your Question"
        />
        <InputFieldDescription
          {...register("description")}
          label="Description"
          showLabel={false}
          width="full"
          rows={10}
          placeholder="Description (optional)"
        />
      </div>
    </>
  );
}

export default CreatePoll;
