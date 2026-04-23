import {type ReactElement, useEffect, useMemo, useState} from "react";
import {ChevronLeft, ChevronRight, ImageIcon} from "lucide-react";
import Dialog from "./Dialog.tsx";

interface Props {
    attachments: string[];
    trigger?: ReactElement;
    title?: string;
}

const AttachmentsPreview = ({
    attachments,
    trigger,
    title = "معاينة الصور",
}: Props) => {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const safeAttachments = useMemo(
        () => attachments.filter((item) => Boolean(item?.trim())),
        [attachments]
    );

    const hasImages = safeAttachments.length > 0;
    const currentImage = hasImages ? safeAttachments[index] : "";

    function next() {
        setIndex((prevIndex) => Math.min(prevIndex + 1, safeAttachments.length - 1));
    }

    function prev() {
        setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }

    useEffect(() => {
        if (!open) return;

        const handleKeydown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowLeft":
                    setIndex((prevIndex) => Math.min(prevIndex + 1, safeAttachments.length - 1));
                    break;
                case "ArrowRight":
                    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
                    break;
                case "Escape":
                    setOpen(false);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, [open, safeAttachments.length]);

    return (
        <Dialog
            trigger={
                trigger ?? (
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
                    >
                        <ImageIcon size={16}/>
                        عرض الصور
                    </button>
                )
            }
            title={title}
            description="استخدم الأسهم للتنقل بين الصور"
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (nextOpen) {
                    setIndex(0);
                }
            }}
            onCancel={() => setOpen(false)}
            showFooter={false}
            contentClassName="w-[min(94vw,72rem)] bg-white p-4 sm:p-6"
        >
            <div className="mt-4 space-y-4 w-full">
                <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
                    <div className="flex h-[50vh] min-h-[280px] w-full items-center justify-center">
                        {hasImages ? (
                            <img
                                src={currentImage}
                                alt={`attachment-${index + 1}`}
                                className="h-full w-full object-contain"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-zinc-500">
                                <ImageIcon size={36}/>
                                <span className="text-sm">لا توجد صور</span>
                            </div>
                        )}
                    </div>

                    {hasImages && (
                        <>
                            <button
                                type="button"
                                onClick={prev}
                                disabled={index === 0}
                                className="absolute start-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-black/70 p-2 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="Previous image"
                            >
                                <ChevronRight size={18}/>
                            </button>
                            <button
                                type="button"
                                onClick={next}
                                disabled={index === safeAttachments.length - 1}
                                className="absolute end-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-black/70 p-2 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="Next image"
                            >
                                <ChevronLeft size={18}/>
                            </button>
                        </>
                    )}
                </div>

                {hasImages && (
                    <p className="text-sm text-zinc-600">
                        صورة {index + 1} من {safeAttachments.length}
                    </p>
                )}

                {safeAttachments.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                        {safeAttachments.map((attachment, thumbIndex) => (
                            <button
                                key={`${attachment}-${thumbIndex}`}
                                type="button"
                                onClick={() => setIndex(thumbIndex)}
                                className={`overflow-hidden rounded-lg border transition ${
                                    thumbIndex === index
                                        ? "border-zinc-900 ring-2 ring-zinc-300"
                                        : "border-zinc-200 hover:border-zinc-400"
                                }`}
                            >
                                <img
                                    src={attachment}
                                    alt={`thumbnail-${thumbIndex + 1}`}
                                    className="h-14 w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </Dialog>
    );
};

export default AttachmentsPreview;