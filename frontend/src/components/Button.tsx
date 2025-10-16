import type { ReactElement } from "react";

interface ButtonProps {
    variant : "primary" | "secondary",
    text : string,
    icon : ReactElement,
    
}

const variantClass  = {
    "primary" : "bg-purple-600 text-white hover:bg-purple-700 cursor-pointer",
    "secondary" : "bg-purple-200 text-purple-900 hover:bg-purple-100 cursor-pointer",
}

const defaultStyles  = "flex justify-center items-center gap-3 px-4 py-2 rounded-md font-light"

export function Button(props : ButtonProps) {
  return (
    <div className={variantClass[props.variant] + " " + defaultStyles}>
        {props.icon} {props.text}
    </div>
  )
}