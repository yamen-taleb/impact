import {useEffect, useRef, useState} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog.tsx"
import { Button } from "../ui/button"
import {Delete} from "lucide-react";

export function AccountDeleteOverlay() {
    const [open, setOpen] = useState(false);
    const dialogRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: PointerEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown, true);
        return () => document.removeEventListener("pointerdown", handlePointerDown, true);
    }, [open]);

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger>
                    <Button
                        className="absolute bottom-0 right-0 w-full bg-black hover:bg-gray-900 h-[40px] flex flex-row gap-10 cursor-pointer text-red-500 hover:text-red-600 rounded-none">
                        <h3>حذف الحساب</h3>
                        <Delete/>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent
                    ref={dialogRef}
                    className="bg-gray-50 shadow-lg  ring-0 max-w-none rounded-lg p-6"
                    onEscapeKeyDown={() => setOpen(false)}
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-bold">هل أنت متأكد أنك تريد حذف حسابك؟</AlertDialogTitle>
                        <AlertDialogDescription className="text-base">
                            هذا الإجراء دائم ولا يمكن التراجع عنه. سيتم فقدان جميع بياناتك.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpen(false)}>اِلغاء</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 text-white hover:bg-red-700"
                            onClick={() => {
                                console.log("Account deleted");
                                setOpen(false);
                            }}
                        >
                            حذف الحساب
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
