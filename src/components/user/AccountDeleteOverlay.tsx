import {Delete} from "lucide-react";
import Dialog from "../Dialog.tsx";
import {Button} from "../ui/button.tsx";
import {useUserContext} from "../../context/UserContext.tsx";
import {useDeleteUser} from "../../hooks/use-user.ts";
import {toast} from "sonner";

export function AccountDeleteOverlay() {
    const {currentUser} = useUserContext();
    const { mutate: deleteUser, isPending } = useDeleteUser();

    const handleDeleteAccount = () => {
        if (!currentUser?.userId) {
            toast.error("لا يمكن تحديد هوية المستخدم لحذف الحساب.");
            return;
        }
        deleteUser(currentUser.userId);
    };

    return (
        <div>
            <Dialog
                trigger={
                    <Button className="absolute bottom-0 right-0 w-full bg-black hover:bg-gray-900 h-[40px] flex flex-row gap-10 cursor-pointer text-red-500 hover:text-red-600 rounded-none">
                        <h3>حذف الحساب</h3>
                        <Delete />
                    </Button>
                }
                title="هل أنت متأكد أنك تريد حذف حسابك؟"
                titleClassName="text-lg font-bold"
                description="هذا الإجراء دائم ولا يمكن التراجع عنه. سيتم فقدان جميع بياناتك."
                descriptionClassName="text-base"
                actionButtonName={isPending ? "جاري الحذف..." : "حذف الحساب"}
                actionButtonClassName="bg-red-600 text-white hover:bg-red-700"
                onAction={handleDeleteAccount}
                isActionDisabled={isPending}
            />
        </div>
    )
}
