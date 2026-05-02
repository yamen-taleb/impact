import type { Volunteer } from '../../../schemas/volunteerSectionSchema';
import { AttendanceCalendar } from './AttendanceCalendar';
import { BackpackIcon, GraduationCapIcon, MailIcon, Phone } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";

import "./userCard.css";
import { useState } from 'react';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';

interface Props {
    volunteer: Volunteer;
}

type DialogType =
  | "accept"
  | "reject"
  | "review"
  | "dismiss"
  | null;


const UserCard = ({volunteer}: Props) => {

  const [openDialog, setOpenDialog] = useState<DialogType>(null);
  const [reason, setReason] = useState("");

  const closeDialog = () => {
    setOpenDialog(null);
    setReason("");
  };

  const requiresReason =
    openDialog === "reject" || openDialog === "dismiss";

  const getDialogTitle = () => {
    switch (openDialog) {
      case "accept":
        return `هل أنت متأكد من أنك تريد قبول الطالب ${volunteer.firstName}؟`;

      case "reject":
        return `هل أنت متأكد من أنك تريد رفض الطالب ${volunteer.firstName}؟`;

      case "review":
        return `هل أنت متأكد من أنك تريد إعادة الطالب ${volunteer.firstName}؟`;

      case "dismiss":
        return `هل أنت متأكد من أنك تريد فصل الطالب ${volunteer.firstName}؟`;

      default:
        return "";
    }
  };

  const handleConfirm = () => {
    console.log({
      action: openDialog,
      volunteerId: volunteer.id,
      reason,
    });

    closeDialog();
  };

  return (
    <div className="card">
      <div className="card-pattern-grid" />
      <div className="card-overlay-dots" />
      <div className="bold-pattern">
        <svg viewBox="0 0 100 100">
          <path strokeDasharray="15 10" strokeWidth={10} stroke="#000" fill="none" d="M0,0 L100,0 L100,100 L0,100 Z" />
        </svg>
      </div>

      <div className="card-title-area">
        <div className='flex flex-row items-center gap-2 px-2'>
          <img className='w-[30%] rounded-full' src={volunteer.photo} alt="" />
          <span>{volunteer.firstName + " " + volunteer.lastName}</span>
        </div>
        <span className="card-tag font-[Thamanyah2]">{volunteer.sutdentNumber}</span>
      </div>

      <div className="card-body">
        <div className="feature-grid">
          <div className="feature-item hover:cursor-default">
            <MailIcon className='feature-icon p-[1px] text-white w-[1.4em] h-[1.4em] flex items-center justify-center bg-[--secondary] border-[0.12em] border-[--text] rounded-[0.3em] shadow-[0.2em_0.2em_0_rgba(0,0,0,0.2)]' />
            <span className="feature-text font-[Thamanyah2]">{volunteer.email}</span>
          </div>

          <div className="feature-item">
            <Phone className='feature-icon p-[1px] text-white w-[1.4em] h-[1.4em] flex items-center justify-center bg-[--secondary] border-[0.12em] border-[--text] rounded-[0.3em] shadow-[0.2em_0.2em_0_rgba(0,0,0,0.2)]' />
            <span className="feature-text font-[Thamanyah2]"><h4>{volunteer.phoneNumber}</h4></span>
          </div>

          <div className="feature-item">
            <BackpackIcon className='feature-icon p-[1px] text-white w-[1.4em] h-[1.4em] flex items-center justify-center bg-[--secondary] border-[0.12em] border-[--text] rounded-[0.3em] shadow-[0.2em_0.2em_0_rgba(0,0,0,0.2)]' />
            <span className="feature-text font-[Thamanyah2]">{volunteer.college}</span>
          </div>

          <div className="feature-item">
            <GraduationCapIcon className='feature-icon p-[1px] text-white w-[1.4em] h-[1.4em] flex items-center justify-center bg-[--secondary] border-[0.12em] border-[--text] rounded-[0.3em] shadow-[0.2em_0.2em_0_rgba(0,0,0,0.2)]' />
            <span className="feature-text font-[Thamanyah2]">السنة: {volunteer.academicYear}</span>
          </div>
        </div>
        
        <div className="card-description font-[Thamanyah2]">
          {volunteer.motivationLetter}
        </div>

        <AttendanceCalendar disabled={volunteer.status !== "ACCEPTED"} />

        <div className='flex flex-col gap-5'>
          <div className="card-actions flex flex-row justify-between items-center">

              <button className="card-button bg-[--secondary] hover:bg-[--secondary-hover]">المزيد من التفاصيل</button>

              <div className="stamp">
                  {(volunteer.status === "PENDING_APPROVAL") ? (
                    <h3 className="text-orange-500 w-[150.8%] absolute">قيد - المراجعة</h3>
                  ) : (volunteer.status === "ACCEPTED") ? (
                    <h3 className="text-green-500">مقبول</h3>
                  ) : (volunteer.status === "REMOVED") ? (
                    <h3 className="text-red-500">مفصول</h3>
                  ) : (
                    <h3 className="text-red-500">مرفوض</h3>
                  )}
              </div>
          </div>

          {(volunteer.status === "PENDING_APPROVAL") ? (
            <div className='flex flex-row gap-2'>
              <button 
                className="card-button w-1/2 bg-[--secondary] hover:bg-[--secondary-hover]"
                onClick={() => setOpenDialog("accept")}
              >
                قبول الطالب
              </button>

              <button 
                className="card-button w-1/2 bg-red-700 hover:bg-red-800"
                onClick={() => setOpenDialog("reject")}
              >
                رفض الطالب
              </button>
            </div>
            // Add Dialoge to confirm student absence
          ) : (volunteer.status === "ACCEPTED") ? (
            <button
              className="card-button w-full bg-red-700 hover:bg-red-800"
              onClick={() => setOpenDialog("dismiss")}
            >
              فصل الطالب
            </button>
          ) : (volunteer.status === "REMOVED") ? (
            <button
              className="card-button w-full bg-orange-500 hover:bg-orange-600"
              onClick={() => setOpenDialog("review")}
            >
              إعادة الطالب
            </button>
          ) : (
            <button
              className="card-button w-full bg-orange-500 hover:bg-orange-600"
              onClick={() => setOpenDialog("review")}
            >
              إعادة الطالب
            </button>
          )}
        </div>
      </div>

      <div className="dots-pattern">
        <svg viewBox="0 0 80 40">
          <circle fill="#000" r={3} cy={10} cx={10} />
          <circle fill="#000" r={3} cy={10} cx={30} />
          <circle fill="#000" r={3} cy={10} cx={50} />
          <circle fill="#000" r={3} cy={10} cx={70} />
          <circle fill="#000" r={3} cy={20} cx={20} />
          <circle fill="#000" r={3} cy={20} cx={40} />
          <circle fill="#000" r={3} cy={20} cx={60} />
          <circle fill="#000" r={3} cy={30} cx={10} />
          <circle fill="#000" r={3} cy={30} cx={30} />
          <circle fill="#000" r={3} cy={30} cx={50} />
          <circle fill="#000" r={3} cy={30} cx={70} />
        </svg>
      </div>
      <div className="accent-shape" />
      <div className="corner-slice" />

      {/* Dialog */}
      <Dialog
        open={openDialog !== null}
        onOpenChange={() => closeDialog()}
      >
        <DialogContent className="bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {getDialogTitle()}
            </DialogTitle>
          </DialogHeader>

          {requiresReason && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 font-[Thamanyah2]">
                يرجى كتابة السبب قبل المتابعة
              </p>

              <Textarea
                placeholder="اكتب السبب هنا..."
                value={reason}
                className='font-[Thamanyah2]'
                onChange={(e) =>
                  setReason(e.target.value)
                }
              />
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={handleConfirm}
              disabled={
                requiresReason && !reason.trim()
              }
            >
              تأكيد
            </Button>
            
            <Button
              variant="outline"
              onClick={closeDialog}
            >
              إلغاء
            </Button>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


export default UserCard;
