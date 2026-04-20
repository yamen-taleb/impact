import type {AnyFieldApi} from "@tanstack/react-form";

interface Props {
    field: AnyFieldApi,
    type: string,
    placeholder?: string,
    label?: string,
    className?: string,
    onAfterChange?: (value: string) => void
}

const TextField = ({field, type, placeholder, label, className, onAfterChange}: Props) => {
    const {errors, isTouched} = field.state.meta;
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
                    type={type}
                    name={field.name}
                    placeholder={placeholder}
                    value={field.state.value as string | number}
                    onChange={handleOnChange}
                    onBlur={field.handleBlur}
                />
            </label>
            {errors.length > 0 && isTouched && (
                <span className="text-red-500 text-xs">{errors[0]?.message}</span>
            )}
        </div>
  );
};

export default TextField;