import {Field, useForm} from "@tanstack/react-form";
import {useEffect, useMemo, useState} from "react";
import SelectField from "../SelectField.tsx";
import TextField from "../TextField.tsx";
import debounce from "lodash.debounce";
import {Search} from "lucide-react";
import {useGetColleges} from "../../hooks/use-college.ts";
import {useGetCategories} from "../../hooks/use-category.ts";


export type FiltersType = {
    search: string;
    college: string;
    status: string;
    category: string;
};

const ALL_COLLEGIES = "all_collegies";
const ALL_STATUSES = "all_statuses";
const ALL_CATEGORIES = "all_categories";

const statusOptions = [
    { value: ALL_STATUSES, label: "كل الحالات" },
    { value: "ONGOING", label: "نشطة" },
    { value: "APPROVED", label: "مقبولة"},
    { value: "PENDING", label: "قيد المراجعة" },
    { value: "REJECTED", label: "مرفوضة" },
    { value: "COMPLETED", label: "مكتملة" },
    { value: "CANCELED", label: "ملغاة" },
];

interface FiltersProps {
    onFiltersChange?: (filters: FiltersType) => void;
}

const Filters = ({ onFiltersChange }: FiltersProps) => {

    const { data: collegesData } =
        useGetColleges({
            page: 0,
            size: 50,
        });

    const collegeOptions = useMemo(() => {

        const colleges = collegesData?.content || [];


        return [
            { value: ALL_COLLEGIES, label: "كل الكليات" },
            ...colleges
                .map((college: { collegeId?: string | number; name?: string }) => ({
                    value: String(college.collegeId ?? ""),
                    label: college.name ?? "-",
                }))
        ];
    }, [collegesData]);

    const {data: categoriesData } = useGetCategories({
        page: 0,
        size: 50,
    });

    const categoryOptions = useMemo(() => {
        const  categories = categoriesData?.content || [];

        return [
            { value: ALL_CATEGORIES, label: "كل الفئات" },
            ...categories
                .map((category: { categoryId?: string | number; name?: string }) => ({
                    value: String(category.categoryId ?? ""),
                    label: category.name ?? "-",
                }))
        ];
     }, [categoriesData]);

    const [appliedFilters, setAppliedFilters] = useState<FiltersType>({
        search: "",
        college: ALL_COLLEGIES,
        status: ALL_STATUSES,
        category: ALL_CATEGORIES,
    });

    const form = useForm({
        defaultValues: appliedFilters,
        onSubmit: ({ value }) => {
            const normalizedFilters: FiltersType = {
                search: value.search,
                college: value.college === ALL_COLLEGIES ? "" : value.college,
                status: value.status === ALL_STATUSES ? "" : value.status,
                category: value.category === ALL_CATEGORIES ? "" : value.category,
            };

            setAppliedFilters(value);
            onFiltersChange?.(normalizedFilters);
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
                            className="w-full h-8 rounded-lg border border-input bg-transparent pr-10 pl-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 font-[Thamanyah2]"
                            field={field}
                            type="text"
                            placeholder="تبحث عن مبادرة معنية..."
                            onAfterChange={() => debouncedSubmit()}
                        />
                    </div>)}
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                <Field form={form} name="college">
                    {(field) => (
                        <SelectField
                            field={field}
                            className={"w-full"}
                            options={collegeOptions}
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