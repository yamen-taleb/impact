import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";

interface Props {
  open: boolean;
  title: string;
  loading?: boolean;
  reason?: string;
  setReason?: (value: string) => void;
  reasonRequired?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}


const ConfirmActionDialog = ({
  open,
  title,
  loading,
  reason,
  setReason,
  reasonRequired,
  onClose,
  onConfirm,
}: Props) => {
  
  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-md">{title}</DialogTitle>
        </DialogHeader>

        {reasonRequired && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-[Thamanyah2]">
              يرجى كتابة السبب
            </p>

            <Textarea
              value={reason}
              onChange={(e) =>
                setReason?.(e.target.value)
              }
              placeholder="اكتب السبب هنا..."
              className="font-[Thamanyah2] placeholder:text-zinc-500"
            />
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
          >
            إلغاء
          </Button>

          <Button
            disabled={loading || (reasonRequired &&!reason?.trim())}
            onClick={onConfirm}
          >
            {loading
              ? "جارٍ التنفيذ..."
              : "تأكيد"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
  
export default ConfirmActionDialog;