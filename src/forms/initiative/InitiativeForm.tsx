import {type ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import {Field, useForm} from "@tanstack/react-form";
import {initiativeSchema} from "../../schemas/initiativeSchema.ts";
import TextField from "../../components/TextField.tsx";
import TextAreaField from "../../components/TextAreaField.tsx";
import {Button} from "../../components/ui/button.tsx";
import {ImagePlus, X} from "lucide-react";


interface Props {
    setOpen: (open: boolean) => void;
}

const InitiativeForm = ({ setOpen }: Props) => {
    const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const imagePreviews = useMemo(
        () => images.map((file) => URL.createObjectURL(file)),
        [images],
    );

    useEffect(() => {
        return () => {
            imagePreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [imagePreviews]);

    const form = useForm({
        defaultValues: {
            initiativeName: "",
            details: "",
            title: "",
            college: "",
        },
        validators: {
            onSubmit: initiativeSchema,
            onBlur: initiativeSchema,
        },
        onSubmit: (values) => {
            console.log({
                ...values,
                images,
            });
            setOpen(false);
            setImages([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        },
    });

    const {handleSubmit} = form;

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedImages = Array.from(event.target.files ?? []).filter((file) =>
            file.type.startsWith("image/"),
        );

        setImages(selectedImages);
    };
    return (
        <form
            className="w-full mt-6 space-y-7"
            onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }}
        >
            <section className="w-full flex flex-col gap-6">
                <div className={"grid md:grid-cols-2 gap-6"}>
                    <Field form={form} name="initiativeName">
                        {(field) => (
                            <TextField
                                field={field}
                                type="text"
                                label="المبادرة"
                                placeholder="اسم المبادرة"
                                className="fieldClasses"
                            />
                        )}
                    </Field>

                    <Field form={form} name="college">
                        {(field) => (
                            <TextField
                                field={field}
                                type="text"
                                label="الكلية"
                                placeholder="اسم الكلية"
                                className="fieldClasses"
                            />
                        )}
                    </Field>
                </div>
                <Field form={form} name="title">
                    {(field) => (
                        <TextField
                            field={field}
                            type="text"
                            label="العنوان"
                            placeholder="عنوان المبادرة"
                            className="fieldClasses"
                        />
                    )}
                </Field>

                <Field form={form} name="details">
                    {(field) => (
                        <TextAreaField
                            field={field}
                            label="التفاصيل"
                            placeholder="اكتب تفاصيل المبادرة"
                            className="fieldClasses"
                        />
                    )}
                </Field>

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-700">الصور</h3>
                        <p className="text-xs text-slate-500">يمكنك اختيار أكثر من صورة واحدة</p>
                    </div>

                    <Button
                        type="button"
                        className="flex items-center gap-2 rounded-xl bg-black px-4 text-sm font-semibold text-white hover:bg-slate-800"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <ImagePlus className="size-4" />
                        <span>إضافة صور</span>
                    </Button>
                </div>

                <input
                    ref={fileInputRef}
                    accept="image/*"
                    multiple
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                />

                {imagePreviews.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {imagePreviews.map((src, index) => (
                            <figure key={src} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                                <img
                                    src={src}
                                    alt={`صورة ${index + 1}`}
                                    className="h-40 w-full object-cover"
                                />
                                <figcaption className="flex items-center justify-between gap-2 px-3 py-2 text-xs text-slate-600">
                                    <span className="truncate">{images[index]?.name}</span>
                                    <button
                                        type="button"
                                        className="inline-flex size-7 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                        onClick={() => {
                                            setImages((currentImages) => currentImages.filter((_, currentIndex) => currentIndex !== index));
                                        }}
                                    >
                                        <X className="size-4" />
                                    </button>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                        لم يتم اختيار أي صور بعد.
                    </div>
                )}
            </section>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                <Button
                    type="button"
                    className="rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    onClick={() => {
                        setOpen(false);
                        setImages([]);
                        if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                        }
                    }}
                >
                    إلغاء
                </Button>

                <Button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    إرسال المبادرة
                </Button>
            </div>
        </form>
    );
};

export default InitiativeForm;