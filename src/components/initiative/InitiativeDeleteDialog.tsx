import Dialog from "../Dialog.tsx";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleDeleteInitiative: () => void;
}

const InitiativeDialog = ({ open, handleDeleteInitiative, setOpen }: Props) => {
    return (
        <div>
            <Dialog
                open={open}
                title="هل أنت متأكد أنك تريد حذف هذه المبادرة؟"
                actionButtonName="حذف المبادرة"
                actionButtonClassName="bg-red-600 text-white hover:bg-red-700"
                descriptionClassName="font-[Thamanyah2]"
                description={"هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المبادرة نهائيًا"}
                onAction={handleDeleteInitiative}
                onCancel={() => setOpen(false)}
            />
        </div>
    );
};

export default InitiativeDialog;
