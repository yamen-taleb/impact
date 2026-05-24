import { Field, useForm } from "@tanstack/react-form";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import TextField from "../TextField";
import SelectField from "../SelectField";
import { useCollegeContext } from "../../context/CollegeContext";


export type VolunteerFiltersType = {
        search: string;
        status: string;
        college: string;
    };

interface VolunteerFiltersProps {
    onFiltersChange?: (
        filters: VolunteerFiltersType
    ) => void;
}


const VolunteerFilters = ({ onFiltersChange }: VolunteerFiltersProps) => {

    

  const ALL_STATUSES = "all_statuses";
  const ALL_COLLEGIES = "all_collegies";

  const statusOptions = [
    { value: ALL_STATUSES, label: "كل الحالات" },
    { value: "APPROVED", label: "مقبول" },
    { value: "PENDING", label: "قيد المراجعة" },
    { value: "REJECTED", label: "مرفوض" },
];

    const { collegeOptions: rawCollegeOptions } =
        useCollegeContext();

        const collegeOptions = useMemo(() => {
        return [
            {
            value: ALL_COLLEGIES,
            label: "كل الكليات",
            },

            ...rawCollegeOptions,
        ];
    }, [rawCollegeOptions]);

    const defaultValues: VolunteerFiltersType = {
    search: "",
    status: ALL_STATUSES,
    college: ALL_COLLEGIES,
    };

    const form = useForm({
        defaultValues,
        onSubmit: ({ value }) => {
            const normalizedFilters: VolunteerFiltersType = {
                search: value.search,
                status: value.status === ALL_STATUSES ? "" : value.status,
                college: value.college === ALL_COLLEGIES ? "" : value.college,
            };

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
