import type {AnyFieldApi} from "@tanstack/react-form";

interface Props {
    field: AnyFieldApi,
    type: string,
    placeholder?: string,
    label?: string,
    className?: string
}

const TextField = ({field, type, placeholder, label, className}: Props) => {
    const {errors, isTouched} = field.state.meta;
    return (
        <div className="flex flex-col gap-2">
            <label>
                <span className="mb-4 block text-sm font-semibold text-slate-700">
                    {label}
                </span>
                <input
                    className={className}
                    type={type}
                    name={field.name}
                    placeholder={placeholder}
                    value={field.state.value as string | number}
                    onChange={(e) => field.handleChange(
                        type === 'number' ? Number(e.target.value) : e.target.value
                    )}
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