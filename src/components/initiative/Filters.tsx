import {Field, useForm} from "@tanstack/react-form";
import {useEffect, useMemo, useState} from "react";
import syrianGovernorates from "../../data/syrianGovernorates.json";
import SelectField from "../SelectField.tsx";
import TextField from "../TextField.tsx";
import debounce from "lodash.debounce";
import {Search} from "lucide-react";


type Filters = {
    search: string;
    governorate: string;
    status: string;
    category: string;
};

const ALL_GOVERNORATES = "all_governorates";
const ALL_STATUSES = "all_statuses";
const ALL_CATEGORIES = "all_categories";

const statusOptions = [
    { value: ALL_STATUSES, label: "كل الحالات" },
    { value: "active", label: "نشطة" },
    { value: "pending", label: "قيد المراجعة" },
    { value: "closed", label: "مغلقة" },
];

const categoryOptions = [
    { value: ALL_CATEGORIES, label: "كل الفئات" },
    { value: "education", label: "تعليم" },
    { value: "health", label: "صحة" },
    { value: "community", label: "مجتمعي" },
];

const Filters = () => {

    const governorateOptions = useMemo(
        () => [
            { value: ALL_GOVERNORATES, label: "كل المحافظات" },
            ...syrianGovernorates.map((g) => ({ value: g.value, label: g.arabic })),
        ],
        []
    );

    const [appliedFilters, setAppliedFilters] = useState<Filters>({
        search: "",
        governorate: ALL_GOVERNORATES,
        status: ALL_STATUSES,
        category: ALL_CATEGORIES,
    });

    const form = useForm({
        defaultValues: appliedFilters,
        onSubmit: ({ value }) => {
            const normalizedFilters: Filters = {
                search: value.search,
                governorate: value.governorate === ALL_GOVERNORATES ? "" : value.governorate,
                status: value.status === ALL_STATUSES ? "" : value.status,
                category: value.category === ALL_CATEGORIES ? "" : value.category,
            };

            setAppliedFilters(value);
            console.log("Applying filters:", normalizedFilters);
        },
    });
    const debouncedSubmit = useMemo(
        () => debounce(() => form.handleSubmit(), 400),
        [form]
    );

    useEffect(() => {
        return () => debouncedSubmit.cancel();
    }, [debouncedSubmit]);
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1"
        >
            <Field form={form} name="search">
                {(field) => (
                    <div className="relative">
                        <Search
                            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/>
                        <TextField
                            className="w-full h-8 rounded-lg border border-input bg-transparent pr-10 pl-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                            field={field}
                            type="text"
                            placeholder="تبحث عن مبادرة معنية..."
                            onAfterChange={() => debouncedSubmit()}
                        />
                    </div>)}
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                <Field form={form} name="governorate">
                    {(field) => (
                        <SelectField
                            field={field}
                            className={"w-full"}
                            options={governorateOptions}
                            onAfterChange={() => form.handleSubmit()}
                        />
                    )}
                </Field>

                <Field form={form} name="status">
                    {(field) => (
                        <SelectField
                            field={field}
                            options={statusOptions}
                            className={"w-full"}
                            onAfterChange={() => form.handleSubmit()}
                        />
                    )}
                </Field>

                <Field form={form} name="category">
                    {(field) => (
                        <SelectField
                            field={field}
                            options={categoryOptions}
                            className={"w-full"}
                            onAfterChange={() => form.handleSubmit()}
                        />
                    )}
                </Field>
            </div>
        </form>
    );
};

export default Filters;