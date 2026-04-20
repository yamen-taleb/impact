import type {AnyFieldApi} from "@tanstack/react-form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "./ui/select.tsx";

interface Props {
    field: AnyFieldApi,
    options: {value: string; label: string}[],
    placeholder?: string,
    label?: string,
    className?: string,
    disabled?: boolean,
    onAfterChange?: (value: string) => void
}

const SelectField = ({field, options, placeholder, label, className, disabled = false, onAfterChange}: Props) => {
    const {errors, isTouched} = field.state.meta;
    return (
        <div className="flex flex-col gap-2">
            <label>
                {label && <span className="mb-4 block text-sm font-semibold text-slate-700">
                    {label}
                </span>}
                <Select
                    dir="rtl"
                    name={field.name}
                    value={field.state.value as string}
                    onValueChange={(value) => {
                        field.handleChange(value);
                        onAfterChange?.(value);
                    }}
                    disabled={disabled}
                >
                    <SelectTrigger
                        className={`${className} ${disabled ? 'cursor-not-allowed' : ''}`}
                    >
                        <SelectValue placeholder={placeholder || "اختر محافظة"} />
                    </SelectTrigger>
                    <SelectContent className="ring-0 z-50 bg-white border border-gray-200  shadow-lg">
                        <SelectGroup>
                            {options.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>


            </label>
            {errors.length > 0 && isTouched && (
                <span className="text-red-500 text-xs">{errors[0]?.message}</span>
            )}
        </div>
    );
};

export default SelectField;
