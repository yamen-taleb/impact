import Dialog from "../Dialog.tsx";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleDeleteApplication: () => void;
}

const ApplicationWithdrawDialog = ({ open, handleDeleteApplication, setOpen }: Props) => {
  return (
    <div>
        <Dialog
            open={open}
            title="هل أنت متأكد أنك تريد سحب هذا الطلب؟"
            actionButtonName="سحب الطلب"
            actionButtonClassName="bg-red-600 text-white hover:bg-red-700"
            descriptionClassName="font-[Thamanyah2]"
            description={"هذا الإجراء لا يمكن التراجع عنه. سيتم سحب الطلب نهائيًا ولم يعد بإمكانك المشاركة بالمبادرة."}
            onAction={handleDeleteApplication}
            onCancel={() => setOpen(false)}
        />
    </div>
  );
};

export default ApplicationWithdrawDialog;