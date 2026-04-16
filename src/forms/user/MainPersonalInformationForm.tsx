import {useForm} from "@tanstack/react-form";
import {personalInfoSchema} from "../../schemas/personalInfoSchema.ts";
import {Field} from "@tanstack/react-form";
import TextField from "../../components/TextField.tsx";
import userData from "../../data/userData.json";

const MainPersonalInformationForm = () => {
    const user = userData.personalInfo;
    const form = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phone,
        },
        onSubmit: (values) => {
            console.log(values);
            // TODO
            // api call
        },
        validators: {
            onSubmit: personalInfoSchema,
            onBlur: personalInfoSchema,
        }
    })
    const {handleSubmit} = form;
  return (
      <form onSubmit={ (e) => {
          e.preventDefault();
          handleSubmit();
      }}>
          <section className="space-y-7">
              <div className="grid gap-7 md:grid-cols-2">
                  <Field form={form} name="firstName">
                      {(field) => (
                          <TextField field={field} type="text" label="الاسم الأول" className="fieldClasses"/>
                      )}
                  </Field>

                  <Field form={form} name="lastName">
                      {(field) => (
                          <TextField field={field} type="text" label="الكنية" className="fieldClasses"/>
                      )}
                  </Field>
              </div>

              <div className="grid gap-7 md:grid-cols-2">
                  <Field form={form} name="phoneNumber">
                      {(field) => (
                          <TextField field={field} type="text" label="رقم الهاتف" className="fieldClasses"/>
                      )}
                  </Field>

                  <label className="block">
                      <span className="mb-4 block text-sm font-semibold text-slate-700">البريد الإلكتروني</span>
                      <input className="fieldClasses cursor-not-allowed" defaultValue="yamen@example.com" readOnly/>
                  </label>
              </div>
          </section>
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

export default MainPersonalInformationForm;