"use client";

import React, { useState } from "react";
import Button from "@/components/shared/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import AnswerOptions from "./AnswerOptions";
import Deadline from "./Deadline";
import CreatePoll from "./CreatePoll";
import RevalConditions from "./RevalConditions";
import AddParticipants from "./AddParticipants";
import Review from "./Review";
import { CreateNewPollSchema } from "@/types/CreatePollSchema";

function CreateMultiform() {
  const multistepComponents = [
    <CreatePoll />,
    <AnswerOptions />,
    <RevalConditions />,
    <Deadline />,
    <AddParticipants />,
    <Review />,
  ];

  const methods = useForm({
    resolver: zodResolver(CreateNewPollSchema),
    mode: "all",
    defaultValues: {
      choice: "single",
      answerOptions: [],
    },
  });
  console.log(methods.getValues());

  const [formNumber, setFormPageNumber] = useState(0);

  async function prevHandler() {
    if (formNumber > 0) {
      const fields = methods.watch();
      const keys = Object.keys(fields);
      const isValid = await methods.trigger(keys as any);
      if (!isValid) return;
      setFormPageNumber((prev) => prev - 1);
    }
  }

  async function nextHandler() {
    if (formNumber < multistepComponents.length - 1) {
      const fields = methods.watch();
      const keys = Object.keys(fields);
      const isValid = await methods.trigger(keys as any);
      if (!isValid) return;
      setFormPageNumber((prev) => prev + 1);
    }
  }

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between"
      >
        {multistepComponents[formNumber]}
        <div className="flex w-full justify-center">
          {formNumber > 0 && (
            <Button
              size="small"
              type="button"
              variant="secondary"
              onClick={prevHandler}
              disabled={Object.keys(methods.formState.errors).length > 0}
            >
              Back
            </Button>
          )}
          {formNumber < multistepComponents.length - 1 && (
            <Button
              size="small"
              type="button"
              variant="primary"
              onClick={nextHandler}
              disabled={Object.keys(methods.formState.errors).length > 0}
            >
              Next
            </Button>
          )}
          {formNumber === multistepComponents.length - 1 && (
            <Button size="small" type="submit" variant="primary">
              Submit
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default CreateMultiform;
