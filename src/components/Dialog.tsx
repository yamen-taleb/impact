import { type ReactElement, type ReactNode, useCallback, useEffect, useRef, useState } from "react";
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
} from "./ui/alert-dialog.tsx"
import {cn} from "../lib/utils.ts";

interface Props {
    trigger?: ReactElement;
    buttonName?: string;
    buttonIcon?: ReactNode;
    buttonClassName?: string;
    title: string;
    titleClassName?: string;
    description?: ReactNode;
    descriptionClassName?: string;
    children?: ReactNode;
    actionButtonName?: string;
    actionButtonClassName?: string;
    cancelButtonName?: string;
    cancelButtonClassName?: string;
    contentClassName?: string;
    showFooter?: boolean;
    closeOnAction?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onAction?: () => void;
    onCancel?: () => void;
}

const Dialog = ({
    trigger,
    title,
    titleClassName,
    description,
    descriptionClassName,
    children,
    actionButtonName = "Confirm",
    actionButtonClassName,
    cancelButtonName = "اِلغاء",
    cancelButtonClassName,
    contentClassName,
    showFooter = true,
    closeOnAction = true,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    onAction,
    onCancel,
}: Props) =>  {

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isControlled = typeof controlledOpen === "boolean";
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const dialogRef = useRef<HTMLDivElement | null>(null);

    const setOpen = useCallback((nextOpen: boolean) => {
        if (!isControlled) {
            setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
    }, [isControlled, onOpenChange]);

    const handleCancel = useCallback(() => {
        onCancel?.();
        setOpen(false);
    }, [onCancel, setOpen]);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: PointerEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
                handleCancel();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown, true);
        return () => document.removeEventListener("pointerdown", handlePointerDown, true);
    }, [open, handleCancel]);

    const handleAction = useCallback(() => {
        onAction?.();
        if (closeOnAction) {
            setOpen(false);
        }
    }, [closeOnAction, onAction, setOpen]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent
                ref={dialogRef}
                className={cn("bg-gray-50 shadow-lg ring-0 rounded-lg p-6 w-[min(92vw,42rem)]", contentClassName)}
            >
                <AlertDialogHeader>
                    <AlertDialogTitle className={cn("text-lg font-bold", titleClassName)}>{title}</AlertDialogTitle>
                    {description && <AlertDialogDescription className={descriptionClassName}>
                        {description}
                    </AlertDialogDescription>}
                    {children}
                </AlertDialogHeader>
                {showFooter && (
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            variant="outline"
                            size="default"
                            className={cancelButtonClassName}
                            onClick={handleCancel}
                        >
                            {cancelButtonName}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            variant="default"
                            size="default"
                            className={cn("bg-red-600 text-white hover:bg-red-700", actionButtonClassName)}
                            onClick={handleAction}
                        >
                            {actionButtonName}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Dialog;