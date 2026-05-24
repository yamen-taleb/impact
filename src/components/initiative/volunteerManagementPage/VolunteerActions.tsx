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
        <Button onClick={onAccept}>
          قبول
        </Button>

        <Button
          variant="destructive"
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
        onClick={onDismiss}
      >
        فصل المتطوع
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      onClick={onRestore}
    >
      إعادة المتطوع
    </Button>
  );
};

export default VolunteerActions;