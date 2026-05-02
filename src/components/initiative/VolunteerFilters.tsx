import { Field, useForm } from "@tanstack/react-form";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import TextField from "../TextField";
import SelectField from "../SelectField";

const VolunteerFilters = () => {

  type Filters = {
    search: string;
    status: string;
    college: string;
  };

  const ALL_STATUSES = "all_statuses";
  const ALL_COLLEGIES = "all_collegies";

  const statusOptions = [
    { value: ALL_STATUSES, label: "كل الحالات" },
    { value: "approved", label: "مقبول" },
    { value: "pending", label: "قيد المراجعة" },
    { value: "removed", label: "مفصول" },
    { value: "rejected", label: "مرفوض" },
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

  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    search: "",
    status: ALL_STATUSES,
    college: ALL_COLLEGIES,
  });

  const form = useForm({
    defaultValues: appliedFilters,
    onSubmit: ({ value }) => {
        const normalizedFilters: Filters = {
            search: value.search,
            status: value.status === ALL_STATUSES ? "" : value.status,
            college: value.college === ALL_COLLEGIES ? "" : value.college,
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
                      placeholder="تبحث عن مستخدم معين..."
                      onAfterChange={() => debouncedSubmit()}
                  />
              </div>)}
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <Field form={form} name="college">
              {(field) => (
                  <SelectField
                      field={field}
                      options={collegeOptions}
                      className={"w-full"}
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

      </div>
    </form>
  );
};

export default VolunteerFilters;
