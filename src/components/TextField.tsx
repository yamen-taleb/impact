import { useState } from "react";
import type {AnyFieldApi} from "@tanstack/react-form";

interface Props {
    field: AnyFieldApi,
    type: string,
    placeholder?: string,
    label?: string,
    className?: string,
    dir?: "ltr" | "rtl" | "auto",
    onAfterChange?: (value: string) => void
    disabled?: boolean,
}

const TextField = ({field, type, placeholder, label, className, dir, onAfterChange, disabled = false}: Props) => {
    const {errors, isTouched} = field.state.meta;
    const [isFocused, setIsFocused] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        field.handleChange(
            type === 'number' ? Number(e.target.value) : e.target.value
        );
        onAfterChange?.(e.target.value);
    }

    return (
        <div className="flex flex-col gap-2">
            <label>
                {label && <span className="mb-4 block text-sm font-semibold text-slate-700">
                    {label}
                </span>}
                <input
                    className={className}
                    dir={dir}
                    type={type}
                    name={field.name}
                    placeholder={placeholder}
                    value={field.state.value as string | number}
                    onChange={handleOnChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => { setIsFocused(false); field.handleBlur(); }}
                    disabled={disabled}
                />
            </label>
            {errors.length > 0 && (isTouched || isFocused) && (
                <span className="text-red-500 text-xs">{errors[0]?.message}</span>
            )}
        </div>
  );
};

export default TextField;
