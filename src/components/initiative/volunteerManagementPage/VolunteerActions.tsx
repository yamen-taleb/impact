import { Button } from "../../../components/ui/button";

interface Props {
  status: string;

  onAccept: () => void;
  onReject: () => void;
  onRestore: () => void;
  onDismiss: () => void;
}

const VolunteerActions = ({
  status,
  onAccept,
  onReject,
  onRestore,
  onDismiss,
}: Props) => {
  if (status === "PENDING") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <Button 
          className="h-10 hover:cursor-pointer border shadow-sm border-zinc-300 hover:bg-zinc-200"
          onClick={onAccept}
        >
          قبول
        </Button>

        <Button
          variant="destructive"
          className="h-10 hover:cursor-pointer border shadow-sm border-red-300"
          onClick={onReject}
        >
          رفض
        </Button>
      </div>
    );
  }

  if (status === "APPROVED") {
    return (
      <Button
        variant="destructive"
        className="w-[50%] h-10 hover:cursor-pointer border shadow-sm border-red-300"
        onClick={onDismiss}
      >
        فصل المتطوع
      </Button>
    );
  }

  return (
    <Button
      className="w-[50%] h-10 hover:cursor-pointer border shadow-sm border-zinc-300 hover:bg-zinc-200"
      onClick={onRestore}
    >
      إعادة المتطوع
    </Button>
  );
};

export default VolunteerActions;