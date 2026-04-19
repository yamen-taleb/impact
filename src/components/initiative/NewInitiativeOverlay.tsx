import {useState} from "react";
import {Plus} from "lucide-react";
import Dialog from "../Dialog.tsx";
import { Button } from "../ui/button.tsx";
import InitiativeForm from "../../forms/initiative/InitiativeForm.tsx";

const NewInitiativeOverlay = () => {
  const [open, setOpen] = useState(false);


  return (
      <Dialog
          open={open}
          onOpenChange={setOpen}
          trigger={
            <Button className="flex h-10 items-center gap-2 rounded-xl bg-black px-4 text-sm text-white hover:bg-gray-900 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0">
              <Plus className="size-4" />
              <span>مبادرة جديدة</span>
            </Button>
          }
          title="إنشاء مبادرة جديدة"
          titleClassName="text-xl font-bold"
          showFooter={false}
          contentClassName="min-w-[50%] max-h-[90vh] overflow-y-auto"
      >
        <InitiativeForm setOpen={setOpen} />
      </Dialog>
  );
};

export default NewInitiativeOverlay;