import { Field, useForm } from "@tanstack/react-form";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { useEffect, useMemo } from "react";

import TextField from "../TextField";
import SelectField from "../SelectField";
import { useGetCollegesFilter } from "../../hooks/use-college";

export type StudentsUnionFilterValues = {
  search: string;
  college: string;
};

export const ALL_COLLEGIES = "all_collegies";

type Props = {
  filters: StudentsUnionFilterValues;
  onChange: (
    filters: StudentsUnionFilterValues
  ) => void;
};

const StudentsUnionFilters = ({
  filters,
  onChange,
}: Props) => {
  const { data, isLoading } = useGetCollegesFilter();

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

  const form = useForm({
    defaultValues: filters,

    onSubmit: ({ value }) => {
      onChange(value);
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
      {/* Search */}
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

      {/* College */}
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
    </form>
  );
};

export default StudentsUnionFilters;