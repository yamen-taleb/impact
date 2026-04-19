import {Delete} from "lucide-react";
import Dialog from "../Dialog.tsx";
import {Button} from "../ui/button.tsx";

export function AccountDeleteOverlay() {
    const handleDeleteAccount = () => {
        console.log("Account deleted");
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
                actionButtonName="حذف الحساب"
                actionButtonClassName="bg-red-600 text-white hover:bg-red-700"
                onAction={handleDeleteAccount}
            />
        </div>
    )
}
