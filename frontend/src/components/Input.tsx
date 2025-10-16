import type { ChangeEventHandler } from "react";

interface InputProps {
    placeholder : string;
    onChange    : ChangeEventHandler<HTMLInputElement> | undefined
}

export const Input = ({placeholder, onChange} : InputProps) => {
    return (
        <input type="text" placeholder={placeholder} className="px-4 py-2 border rounded m-2" onChange={onChange}/>
    )
}