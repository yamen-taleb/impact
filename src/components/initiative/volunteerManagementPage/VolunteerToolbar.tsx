import { Search } from "lucide-react";

import { useEffect, useMemo } from "react";

import debounce from "lodash.debounce";

import {
  Field,
  useForm,
} from "@tanstack/react-form";

import TextField from "../../TextField";
import SelectField from "../../SelectField";

import { useCollegeContext } from "../../../context/CollegeContext";

export type VolunteerFiltersType = {
  search: string;
  status: string;
  college: string;
};

interface Props {
  filters: VolunteerFiltersType;

  onChange: (
    filters: VolunteerFiltersType
  ) => void;
}

const VolunteerToolbar = ({
  filters,
  onChange,
}: Props) => {
  const ALL_STATUSES = "ALL_STATUSES";
  const ALL_COLLEGES = "ALL_COLLEGES";

  const { collegeOptions } =
    useCollegeContext();

  const statusOptions = [
    {
      value: ALL_STATUSES,
      label: "كل الحالات",
    },

    {
      value: "PENDING",
      label: "قيد المراجعة",
    },

    {
      value: "APPROVED",
      label: "مقبول",
    },

    {
      value: "REJECTED",
      label: "مرفوض",
    },
  ];

  const form = useForm({
    defaultValues: {
      search: filters.search,
      status:
        filters.status || ALL_STATUSES,
      college:
        filters.college || ALL_COLLEGES,
    },

    onSubmit: ({ value }) => {
      onChange({
        search: value.search,

        status:
          value.status === ALL_STATUSES
            ? ""
            : value.status,

        college:
          value.college === ALL_COLLEGES
            ? ""
            : value.college,
      });
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
    return () => debouncedSubmit.cancel();
  }, [debouncedSubmit]);

  return (
    <form
      className="flex flex-col gap-4 rounded-2xl border bg-white p-4 lg:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Field form={form} name="search">
        {(field) => (
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <TextField
              field={field}
              placeholder="ابحث عن متطوع..."
              className="h-11 w-full rounded-xl border pr-10"
              onAfterChange={() =>
                debouncedSubmit()
              }
            />
          </div>
        )}
      </Field>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:w-[420px]">
        <Field form={form} name="college">
          {(field) => (
            <SelectField
              field={field}
              className="w-full"
              options={[
                {
                  value: ALL_COLLEGES,
                  label: "كل الكليات",
                },
                ...collegeOptions,
              ]}
              onAfterChange={() =>
                form.handleSubmit()
              }
            />
          )}
        </Field>

        <Field form={form} name="status">
          {(field) => (
            <SelectField
              field={field}
              className="w-full"
              options={statusOptions}
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

export default VolunteerToolbar;