import {Field, useForm} from "@tanstack/react-form";
import {useEffect, useMemo, useState} from "react";
import SelectField from "../SelectField.tsx";
import TextField from "../TextField.tsx";
import debounce from "lodash.debounce";
import {Search} from "lucide-react";


type Filters = {
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

const collegeOptions = [
    { value: ALL_COLLEGIES, label: "كل الكليات" },
    { value: "informaticsEn", label: "كلية الهندسة المعلوماتية" },
    { value: "civilEn", label: "كلية الهندسة المدنية" },
    { value: "architecturalEn", label: "كلية الهندسة المعمارية" },
    { value: "agriculturalEn", label: "كلية الهندسة الزراعية" },
    { value: "electricalAndElectronicsEn", label: "كلية الهندسة الكهربائية والإلكترونية" },
    { value: "mechanicalEn", label: "كلية الهندسة الميكانيكية" },
    { value: "technicalEn", label: "كلية الهندسة التقنية" },
    { value: "medicine", label: "كلية الطب البشري" },
    { value: "dentistry", label: "كلية طب الأسنان" },
    { value: "pharmacy", label: "كلية الصيدلة" },
    { value: "nursing", label: "كلية التمريض" },
    { value: "sciences", label: "كلية العلوم" },
    { value: "economics", label: "كلية الاقتصاد" },
    { value: "appliedFineArts", label: "كلية الفنون الجميلة التطبيقية" },
    { value: "appliedScience", label: "الكلية التطبيقية" },
    { value: "law", label: "كلية الحقوق" },
    { value: "artsOfHumanity", label: "كلية الآداب والعلوم الإنسانية" },
    { value: "education", label: "كلية التربية" },
    { value: "sharia", label: "كلية الشريعة" },
    { value: "medicineInst", label: "المعهد التقاني الطبي" },
    { value: "dentistryInst", label: "المعهد التقاني لطب الأسنان" },
    { value: "agriculturalInst", label: "المعهد التقاني الزراعي" },
    { value: "marketingAndBusinessInst", label: "المعهد التقاني لإدارة الأعمال والتسويق" },
    { value: "bankingAndFinanceInst", label: "المعهد التقاني للعلوم المالية والمصرفية" },
    { value: "computerInst", label: "المعهد التقاني للحاسوب" },
    { value: "mechanicalAndElectronicsInst", label: "المعهد التقاني للهندسة الميكانيكية والكهربائية" },
    { value: "engineeringInst", label: "المعهد التقاني الهندسي" },
  ];

const Filters = () => {

    const [appliedFilters, setAppliedFilters] = useState<Filters>({
        search: "",
        college: ALL_COLLEGIES,
        status: ALL_STATUSES,
        category: ALL_CATEGORIES,
    });

    const form = useForm({
        defaultValues: appliedFilters,
        onSubmit: ({ value }) => {
            const normalizedFilters: Filters = {
                search: value.search,
                college: value.college === ALL_COLLEGIES ? "" : value.college,
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