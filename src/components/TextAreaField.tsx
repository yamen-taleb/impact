import {useEffect, useRef} from "react";
import type {AnyFieldApi} from "@tanstack/react-form";

interface Props {
    field: AnyFieldApi,
    placeholder?: string,
    label?: string,
    className?: string,
    rows?: number,
    readOnly?: boolean,
    height?: string,
}

const TextAreaField = ({field, placeholder, label, className, rows = 4, readOnly = false, height = '30px'}: Props) => {
    const {errors, isTouched} = field.state.meta;
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resizeTextarea = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = height;
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
        resizeTextarea();
    }, [field.state.value]);

    return (
        <div className="flex flex-col gap-2">
            <label>
                <span className="mb-4 block text-sm font-semibold text-slate-700">
                    {label}
                </span>
                <textarea
                    ref={textareaRef}
                    className={`${className} min-h-10 resize-none overflow-hidden pt-0 ${readOnly ? 'cursor-not-allowed' : ''}`}
                    name={field.name}
                    placeholder={placeholder}
                    value={field.state.value as string}
                    onChange={(e) => {
                        field.handleChange(e.target.value);
                        resizeTextarea();
                    }}
                    onBlur={field.handleBlur}
                    rows={rows}
                    readOnly={readOnly}
                />
            </label>
            {errors.length > 0 && isTouched && (
                <span className="text-red-500 text-xs">{errors[0]?.message}</span>
            )}
        </div>
    );
};

export default TextAreaField;
