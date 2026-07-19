import {Field, useForm} from "@tanstack/react-form";
import {secondaryPersonalInfoSchema} from "../../schemas/secondaryPersonalInfoSchema.ts";
import SelectField from "../../components/SelectField.tsx";
import TextField from "../../components/TextField.tsx";
import DatePickerField from "../../components/DatePickerField.tsx";
import TextAreaField from "../../components/TextAreaField.tsx";
import {useUserContext} from "../../context/UserContext.tsx";
import {useCollegeContext} from "../../context/CollegeContext.tsx";
import {useGetUserById, useUpdateUser} from "../../hooks/use-user.ts";
import {useEffect, useMemo} from "react";
import {toast} from "sonner";
import {useParams} from "react-router";
import {getCollegeId, getUserRole} from "../../lib/utils.ts";

const SecondaryPersonalInformationForm = () => {
    const {currentUser, isLoading: isCurrentUserLoading} = useUserContext();
    const {id: userId} = useParams()
    const {user} = useGetUserById(userId);
    const isAdmin = getUserRole() === "Admin";

    const {collegeOptions} = useCollegeContext()
    const { mutate: updateUser, isPending } = useUpdateUser();

    const sameUser = useMemo(() => {
        if (!userId) return false;
        if (!currentUser?.userId) return false;
        return String(userId) === String(currentUser.userId);
    }, [currentUser?.userId, userId]);

    const canEdit = !isCurrentUserLoading && sameUser;

    const form = useForm({
        defaultValues: {
            collegeId: "",
            location: "",
            birthDate: "",
            academicYear: "",
            description: "",
        },
        onSubmit: ({value}) => {
            if (!canEdit) {
                toast.error("لا يمكنك تعديل بيانات مستخدم آخر");
                return;
            }
            if (!user?.userId) {
                toast.error("بيانات المستخدم غير مكتملة");
                return;
            }

            updateUser({
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                collegeId: parseInt(value.collegeId),
                location: value.location,
                birthdate: value.birthDate,
                academicYear: value.academicYear,
                description: value.description
            });
        },
        validators: {
            onSubmit: secondaryPersonalInfoSchema,
            onBlur: secondaryPersonalInfoSchema
        }
    })

    useEffect(() => {
        if (user && collegeOptions.length > 0) {
            form.setFieldValue("collegeId", String(getCollegeId(collegeOptions, user.collegeName)) || "");
            form.setFieldValue("location", user.location || "");
            form.setFieldValue("birthDate", user.birthdate || "");
            form.setFieldValue("academicYear", String(user.academicYear) || "");
            form.setFieldValue("description", user.description || "");
        }
    }, [user, collegeOptions, form]);
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
                  {(canEdit) && (
                    <p className="mt-2 text-sm text-slate-500 font-[Thamanyah2]">
                        هذه البيانات تساعد على إكمال الملف الشخصي والمشاركة في الأنشطة الخاصة بالمنصة.
                    </p>
                  ) }
              </div>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
              <Field form={form} name="collegeId">
                  {
                      (field) => {
                          const placeholder = !canEdit && !field.state.value ? "الكلية غير محددة" : "اختر الكلية"
                          return (
                              <SelectField
                                  className="!w-full !border-0 !border-b !border-slate-300 !pb-3 !pt-2 !h-10 !rounded-none flex-1"
                                  disabled={!canEdit || isAdmin}
                                  field={field} options={collegeOptions} label="الكلية" placeholder={placeholder} />
                          )
                  }}
              </Field>

              <Field form={form} name="location">
                  {
                      (field) => (
                          <TextField className="fieldClasses font-[Thamanyah2]" field={field} type="text" label="العنوان" disabled={!canEdit}/>
                      )
                  }
              </Field>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
              <Field form={form} name="birthDate">
                  {(field) => {
                      const placeholder = !canEdit && !field.state.value ? "تاريخ غير محدد" : "اختر التاريخ"
                      return (
                          <DatePickerField
                              field={field}
                              label="تاريخ الميلاد"
                              placeholder={placeholder}
                              className="!w-full !border-0 !border-b !border-slate-300 !pb-3 !pt-2 !h-10 !rounded-none"
                              disabled={!canEdit}
                          />
                      )
                  }}
              </Field>

              <Field form={form} name="academicYear">
                  {
                      (field) => (
                          <TextField className="fieldClasses font-[Thamanyah2]" field={field} type="text" label="السنة الدراسية" disabled={!canEdit}/>
                      )
                  }
              </Field>
          </div>

          <Field form={form} name="description">
              {(field) => (
                  <TextAreaField field={field}
                                 label="وصف عنك"
                                 className={"fieldClasses min-h-10 font-[Thamanyah2]"}
                                 readOnly={!canEdit}
                                 placeholder={!canEdit ? "لا يوجد وصف" : "قم بكتابة وصف عنك"}
                  />
              )}
          </Field>

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

export default SecondaryPersonalInformationForm;

