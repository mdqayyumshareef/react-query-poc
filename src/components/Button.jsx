import React from "react";

export default function Button({ children, className, ...rest }) {
  return (
    <button
      className={`px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
