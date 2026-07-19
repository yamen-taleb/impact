"use client";

import { useState } from "react";
import { ArrowRight, UserPlusIcon } from "lucide-react";
import { Link } from "react-router";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";

import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { getUserRole } from "../../../lib/utils";
import { useGetMyUser } from "../../../hooks/use-user";
import { useApplyToCampaign, useGetUserApplications } from "../../../hooks/use-application";

interface Props {
  backHref?: string;
  campaignId: number;
  initiativeStatus: string;
}

const InitiativeDetailsActions = ({
  backHref = "/initiatives",
  campaignId,
  initiativeStatus
}: Props) => {
  const userRole = getUserRole();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [motivation, setMotivation] = useState("");
  
  const { currentUser } = useGetMyUser();
  const currentUserId = Number( currentUser?.userId );
  const { mutate: applyToCampaign } = useApplyToCampaign();

  const isProfileIncomplete =
        !currentUser?.academicYear ||
        !currentUser?.birthdate ||
        !currentUser?.collegeName ||
        !currentUser?.description ||
        !currentUser?.location ||
        !currentUser?.phone ||
        !currentUser?.studentNumber;
        

        // console.log(currentUser);
    const { data, isLoading, error } = useGetUserApplications({
      userId: currentUser?.userId,
      // status: filterStatus === "ALL" ? undefined : filterStatus,
    });
    console.log(data?.applications.content);
    const currentApplication = data?.applications?.content?.find(
      (a: any) => a.campaignId === campaignId
    );

  const handleApply = () => {
    if (!currentUserId) {
      return;
    }

    applyToCampaign(
      {
        campaignId,
        studentId: currentUserId,
        motivationLetter: motivation,
      },
      {
        onSuccess: () => {
          setOpenDialog(false);
          setMotivation("");
        },
      }
    );
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={backHref}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
        >
          <ArrowRight size={16} />
          العودة للمبادرات
        </Link>

        {((userRole === "User" || userRole === "Admin") && !isProfileIncomplete && (initiativeStatus === "ONGOING")) && (
          currentApplication ? (
              <Link to="/my-applications">
                  لقد قمت بالتقدم لهذه المبادرة!
              </Link>
          ) : (
              <button
                type="button"
                onClick={() => setOpenDialog(true)}
                className="inline-flex gap-2 items-center rounded-lg bg-black px-4 py-[0.35rem] text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                التطوع في المبادرة
                <UserPlusIcon />
              </button>
          )
        )}
      </div>

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        <DialogContent className="bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              لماذا تريد التطوع في هذه المبادرة؟
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Textarea
              placeholder="اكتب سبب رغبتك بالتطوع..."
              value={motivation}
              onChange={(e) =>
                setMotivation(e.target.value)
              }
              className="font-[Thamanyah2]"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpenDialog(false);
                setMotivation("");
              }}
            >
              إلغاء
            </Button>

            <Button
              onClick={handleApply}
              disabled={!motivation.trim()}
            >
              التقدم للمبادرة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InitiativeDetailsActions;