import React from "react";

export default function Cell({ value, onClick }) {
  return (
    <button className="row-item" onClick={onClick}>
      <div className={value === 'X' ? "x-mark" : value === 'O' ? "circle" : ""} />
    </button>
  );
}
