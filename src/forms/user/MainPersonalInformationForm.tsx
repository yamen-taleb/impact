import {useForm} from "@tanstack/react-form";
import {personalInfoSchema} from "../../schemas/personalInfoSchema.ts";
import {Field} from "@tanstack/react-form";
import TextField from "../../components/TextField.tsx";
import {useUserContext} from "../../context/UserContext.tsx";
import {useGetUserById, useUpdateUser} from "../../hooks/use-user.ts";
import {toast} from "sonner";
import {useEffect, useMemo} from "react";
import {useParams} from "react-router";
import {getCollegeId} from "../../lib/utils.ts";
import {useCollegeContext} from "../../context/CollegeContext.tsx";

const MainPersonalInformationForm = () => {
    const {currentUser, isLoading: isCurrentUserLoading} = useUserContext();
    const {id: userId} = useParams()
    const {user} = useGetUserById(userId);
    const { mutate: updateUser, isPending } = useUpdateUser();
    const {collegeOptions} = useCollegeContext();

    const sameUser = useMemo(() => {
        if (!userId) return false;
        if (!currentUser?.userId) return false;
        return String(userId) === String(currentUser.userId);
    }, [currentUser?.userId, userId]);

    const canEdit = !isCurrentUserLoading && sameUser;

    const form = useForm({
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            phone: user?.phone || "",
        },
        onSubmit: ({value}) => {
            if (!user?.userId) {
                toast.error("بيانات المستخدم غير مكتملة");
                return;
            }

            updateUser({
                userId: user.userId,
                email: user.email || "",
                firstName: value.firstName,
                lastName: value.lastName,
                phone: value.phone,
                collegeId: getCollegeId(collegeOptions, user.collegeName),
            });
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
                          <TextField field={field} type="text" label="الاسم الأول" className="fieldClasses font-[Thamanyah2]" disabled={!canEdit} />
                      )}
                  </Field>

                  <Field form={form} name="lastName">
                      {(field) => (
                          <TextField field={field} type="text" label="الكنية" className="fieldClasses font-[Thamanyah2]" disabled={!canEdit} />
                      )}
                  </Field>
              </div>

              <div className="grid gap-7 md:grid-cols-2" dir="ltr">
                  <Field form={form} name="phone">
                      {(field) => (
                          <TextField field={field} type="text" label="رقم الهاتف" className="fieldClasses font-[Thamanyah2]" disabled={!canEdit} />
                      )}
                  </Field>

                  <label className="block">
                      <span className="mb-4 block text-sm font-semibold text-slate-700 ">البريد الإلكتروني</span>
                      <input className="fieldClasses cursor-not-allowed font-[Thamanyah2]" defaultValue={user?.email} readOnly/>
                  </label>
              </div>
          </section>
          <div className="flex justify-end mt-2">

              {canEdit && (
                  <button type="submit"
                          disabled={isPending}
                          className="inline-flex items-center gap-4 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50">
                      <span aria-hidden="true">‹</span>
                      <span>{isPending ? "جاري الحفظ..." : "حفظ"}</span>
                  </button>
              )}
          </div>
      </form>
  );
};

export default MainPersonalInformationForm;
