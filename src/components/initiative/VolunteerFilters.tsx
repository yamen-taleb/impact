import { Field, useForm } from "@tanstack/react-form";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { useEffect, useMemo } from "react";

import TextField from "../TextField";
import SelectField from "../SelectField";
import { useGetCollegesFilter } from "../../hooks/use-college";

export type VolunteerFiltersType = {
  search: string;
  status: string;
  college: string;
};

export const ALL_STATUSES = "all_statuses";
export const ACTIVE_STATUS = "active";
export const BANNED_STATUS = "banned";

export const ALL_COLLEGIES = "all_collegies";

interface VolunteerFiltersProps {
  filters: VolunteerFiltersType;

  onFiltersChange: (
    filters: VolunteerFiltersType
  ) => void;
}

const VolunteerFilters = ({
  filters,
  onFiltersChange,
}: VolunteerFiltersProps) => {
  const {
    data,
    isLoading,
  } = useGetCollegesFilter();

  /*
   * الكليات القادمة من backend
   *
   * مهم جداً:
   * value = college.name
   *
   * لأن الطالب يحتوي على:
   *
   * student.collegeName
   *
   * وليس collegeId
   */
  const collegeOptions = useMemo(() => {
    return [
      {
        value: ALL_COLLEGIES,
        label: "كل الكليات",
      },

      ...(data?.content ?? []).map(
        (college: any) => ({
          value: college.name,
          label: college.name,
        })
      ),
    ];
  }, [data]);

  const statusOptions = [
    {
      value: ALL_STATUSES,
      label: "كل الحالات",
    },
    {
      value: ACTIVE_STATUS,
      label: "غير مفصول",
    },
    {
      value: BANNED_STATUS,
      label: "مفصول",
    },
  ];

  const form = useForm({
    defaultValues: filters,

    onSubmit: ({ value }) => {
      onFiltersChange(value);
    },
  });

  const debouncedSubmit = useMemo(
    () =>
      debounce(() => {
        form.handleSubmit();
      }, 400),
    [form]
  );

  useEffect(() => {
    return () => {
      debouncedSubmit.cancel();
    };
  }, [debouncedSubmit]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        form.handleSubmit();
      }}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      {/* البحث */}
      <Field
        form={form}
        name="search"
      >
        {(field) => (
          <div className="relative">
            <Search
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />

            <TextField
              className="h-8 w-full rounded-lg border border-input bg-transparent pr-10 pl-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 font-[Thamanyah2]"
              field={field}
              type="text"
              placeholder="تبحث عن مستخدم معين..."
              onAfterChange={() =>
                debouncedSubmit()
              }
            />
          </div>
        )}
      </Field>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {/* الكلية */}
        <Field
          form={form}
          name="college"
        >
          {(field) => (
            <SelectField
              field={field}
              options={collegeOptions}
              className="w-full"
              disabled={isLoading}
              onAfterChange={() =>
                form.handleSubmit()
              }
            />
          )}
        </Field>

        {/* الحالة */}
        <Field
          form={form}
          name="status"
        >
          {(field) => (
            <SelectField
              field={field}
              options={statusOptions}
              className="w-full"
              onAfterChange={() =>
                form.handleSubmit()
              }
            />
          )}
        </Field>

      </div>
    </form>
  );
};

export default VolunteerFilters;