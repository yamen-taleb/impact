import { type ReactElement, type ReactNode, useCallback, useState } from "react";
import {
    Dialog as ShadcnDialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

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
    isActionDisabled?: boolean;
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
                    isActionDisabled,
                }: Props) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

    const isControlled = typeof controlledOpen === "boolean";
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = useCallback(
        (nextOpen: boolean) => {
            if (!isControlled) {
                setUncontrolledOpen(nextOpen);
            }
            onOpenChange?.(nextOpen);
        },
        [isControlled, onOpenChange]
    );

    const handleCancel = useCallback(() => {
        onCancel?.();
        setOpen(false);
    }, [onCancel, setOpen]);

    const handleAction = useCallback(() => {
        onAction?.();

        if (closeOnAction) {
            setOpen(false);
        }
    }, [closeOnAction, onAction, setOpen]);

    return (
        <ShadcnDialog open={open} onOpenChange={setOpen}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

            <DialogContent
                className={cn(
                    "bg-gray-50 shadow-lg ring-0 rounded-lg p-6 w-[min(92vw,42rem)]",
                    contentClassName
                )}
            >
                <DialogHeader>
                    <DialogTitle className={cn("text-lg font-bold", titleClassName)}>
                        {title}
                    </DialogTitle>

                    {description && (
                        <DialogDescription className={descriptionClassName}>
                            {description}
                        </DialogDescription>
                    )}

                    {children}
                </DialogHeader>

                {showFooter && (
                    <DialogFooter>
                        <Button
                            variant="outline"
                            size="default"
                            className={cancelButtonClassName}
                            onClick={handleCancel}
                        >
                            {cancelButtonName}
                        </Button>

                        <Button
                            variant="default"
                            size="default"
                            disabled={isActionDisabled}
                            className={cn(
                                "bg-red-600 text-white hover:bg-red-700",
                                actionButtonClassName,
                                isActionDisabled && "cursor-not-allowed opacity-50"
                            )}
                            onClick={handleAction}
                        >
                            {actionButtonName}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </ShadcnDialog>
    );
};

export default Dialog;
