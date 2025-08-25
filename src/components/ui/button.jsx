import * as React from "react";

export function Button({ className, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
