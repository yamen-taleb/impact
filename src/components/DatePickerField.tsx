import {useMemo, useState} from "react";
import type {AnyFieldApi} from "@tanstack/react-form";
import {Calendar as CalendarIcon} from "lucide-react";
import {Button} from "./ui/button.tsx";
import {Calendar} from "./ui/calendar.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover.tsx";
import {cn} from "../lib/utils.ts";

interface Props {
    field: AnyFieldApi,
    placeholder?: string,
    label?: string,
    className?: string,
    disabled?: boolean
}

const DatePickerField = ({
    field,
    placeholder = "اختر التاريخ",
    label,
    className,
    disabled = false
}: Props) => {
    const [open, setOpen] = useState(false);
    const {errors, isTouched} = field.state.meta;
    const maxDate = new Date();
    const minDate = new Date(maxDate.getFullYear() - 80, 0, 1);
    const maxSelectableDate = new Date(maxDate.getFullYear() - 18, 11, 31);

    const selectedDate = useMemo(() => {
        if (!field.state.value || typeof field.state.value !== "string") {
            return undefined;
        }

        const parsedDate = new Date(field.state.value);
        return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    }, [field.state.value]);

    const buttonLabel = selectedDate
        ? selectedDate.toLocaleDateString("ar-SY")
        : placeholder;

    return (
        <div className="flex flex-col gap-2">
            <label>
                <span className="mb-4 block text-sm font-semibold text-slate-700">
                    {label}
                </span>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={disabled}
                            className={cn(
                                "h-10 w-full justify-between rounded-md border-0 bg-transparent px-3 text-right font-normal shadow-none outline-none hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
                                !selectedDate && "text-slate-500",
                                open && "border-0 ring-0 shadow-none",
                                disabled && "cursor-not-allowed",
                                className
                            )}
                        >
                            <span className="truncate">{buttonLabel}</span>
                            <CalendarIcon className="h-4 w-4 text-slate-500" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="ring-0 z-50 w-[240px] min-w-[240px] rounded-xl border border-slate-200 bg-white p-2 shadow-xl" align="start">
                        <Calendar
                            dir="rtl"
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                                field.handleChange(date ? date.toISOString().split("T")[0] : "");
                                field.handleBlur();
                                setOpen(false);
                            }}
                            disabled={(date) => disabled || date > maxSelectableDate || date < minDate}
                            autoFocus
                            captionLayout="dropdown"
                            startMonth={minDate}
                            endMonth={maxSelectableDate}
                            className="w-full"
                        />
                    </PopoverContent>
                </Popover>
            </label>
            {errors.length > 0 && isTouched && (
                <span className="text-red-500 text-xs">{errors[0]?.message}</span>
            )}
        </div>
    );
};

export default DatePickerField;

