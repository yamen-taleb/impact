import userData from "../../data/userData.json";
import syrianGovernorates from "../../data/syrianGovernorates.json";
import {Field, useForm} from "@tanstack/react-form";
import {secondaryPersonalInfoSchema} from "../../schemas/secondaryPersonalInfoSchema.ts";
import SelectField from "../../components/SelectField.tsx";
import TextField from "../../components/TextField.tsx";
import DatePickerField from "../../components/DatePickerField.tsx";
import TextAreaField from "../../components/TextAreaField.tsx";

const SecondaryPersonalInformationForm = () => {
    const user = userData;
    const governorates = syrianGovernorates;
    const SelectOption: {value: string; label: string}[] = governorates.map((governorate) => ({
        value: governorate.value,
        label: governorate.arabic,
    }));

    const form = useForm({
        defaultValues: {
            governorate: user.additionalInfo.governorate,
            address: user.additionalInfo.address,
            birthDate: user.additionalInfo.birthDate,
            education: user.additionalInfo.education,
            description: user.additionalInfo.about,
        },
        onSubmit: (values) => {
            console.log(values);
            // TODO
            // api call
        },
        validators: {
            onSubmit: secondaryPersonalInfoSchema,
            onBlur: secondaryPersonalInfoSchema
        }
    })
    const {handleSubmit} = form;
  return (
      <form
          onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
          }}
          className="space-y-7"
      >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                  <h2 className="text-xl font-bold text-slate-900">المعلومات الإضافية</h2>
                  <p className="mt-2 text-sm text-slate-500">
                      هذه البيانات تساعد على إكمال الملف الشخصي والمشاركة في الأنشطة الخاصة بالمنصة.
                  </p>
              </div>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
              <Field form={form} name="governorate">
                  {
                      (field) => (
                          <SelectField
                              className="!w-full !border-0 !border-b !border-slate-300 !pb-3 !pt-2 !h-10 !rounded-none"
                              field={field} options={SelectOption} label="المحافظة"/>
                      )
                  }
              </Field>

              <Field form={form} name="address">
                  {
                      (field) => (
                          <TextField className="fieldClasses" field={field} type="text" label="العنوان"/>
                      )
                  }
              </Field>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
              <Field form={form} name="birthDate">
                  {(field) => (
                      <DatePickerField
                          field={field}
                          label="تاريخ الميلاد"
                          className="!w-full !border-0 !border-b !border-slate-300 !pb-3 !pt-2 !h-10 !rounded-none"
                      />
                  )}
              </Field>

              <Field form={form} name="education">
                  {(field) => (
                      <TextField className="fieldClasses" field={field} type="text" label="كلية"/>
                  )}
              </Field>
          </div>

          <Field form={form} name="description">
              {(field) => (
                  <TextAreaField field={field} label="وصف عنك" className={"fieldClasses min-h-10"}
                                 placeholder={"قم بكتابة وصف عنك"}/>
              )}
          </Field>

          <div className="flex justify-end mt-2">
              <button type="submit"
                      className="inline-flex items-center gap-4 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                  <span aria-hidden="true">‹</span>
                  <span>حفظ</span>
              </button>
          </div>
      </form>
  );
};

export default SecondaryPersonalInformationForm;