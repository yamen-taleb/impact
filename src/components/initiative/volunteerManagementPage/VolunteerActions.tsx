import { Button } from "../../../components/ui/button";

interface Props {
  status: string;

  onAccept: () => void;
  onReject: () => void;
  onRestore: () => void;
  onDismiss: () => void;
  percentage: number;
}

const VolunteerActions = ({
  status,
  onAccept,
  onReject,
  onRestore,
  onDismiss,
  percentage,
}: Props) => {

  if (status === "PENDING") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <Button 
          className="h-10 hover:cursor-pointer border shadow-sm border-zinc-300 hover:bg-zinc-200"
          disabled={percentage?.percentage === 100 ? true : false}
          onClick={onAccept}
        >
          قبول
        </Button>

        <Button
          variant="destructive"
          className="h-10 hover:cursor-pointer border shadow-sm border-red-300"
          disabled={percentage?.percentage === 100 ? true : false}
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
        disabled={percentage?.percentage === 100 ? true : false}
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
      disabled={percentage?.percentage === 100 ? true : false}
    >
      إعادة المتطوع
    </Button>
  );
};

export default VolunteerActions;