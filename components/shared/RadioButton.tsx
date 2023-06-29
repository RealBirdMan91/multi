"use client";

import React from "react";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const RadioButton = React.forwardRef(
  (
    { label, ...props }: RadioButtonProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <label htmlFor={props.id} className="flex justify-between items-center">
        {label}
        <input className="radio-input" type="radio" {...props} ref={ref} />
        <span className="custom-radio" />
      </label>
    );
  }
);

export default RadioButton;
