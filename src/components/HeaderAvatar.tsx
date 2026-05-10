import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "./ui/popover.tsx";
import UserAvatar from "./user/UserAvatar.tsx";
import { Link } from "react-router";
import {LogOut, User, Clock} from "lucide-react";
import { useState } from "react";
import keycloak from "../lib/keycloak.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button.tsx";
import { useGetMyUser } from "../hooks/use-user.ts";

const HeaderAvatar = () => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

	const {currentUser, isLoading} = useGetMyUser();

	if(isLoading){
		return null;
	} 


	const handleLogout = async () => {
		try {
			localStorage.removeItem("token");
			localStorage.removeItem(
					"refreshToken"
			);

			await keycloak.logout({
				redirectUri:
				window.location.origin,
			});
			} catch (error) {
			console.error(
				"Logout failed:",
				error
			);
		}
	};

  return (
    <>
      <Popover>
				<PopoverTrigger asChild>
					<button className="relative flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-zinc-100">
						<UserAvatar
								url={currentUser?.photo}
								width="w-9"
								height="h-9"
								letterSize={"text-lg"}
								firstName={currentUser?.firstName}
								lastName={currentUser?.lastName}
						/>
					</button>
				</PopoverTrigger>
				<PopoverContent
					className="w-48 rounded-xl border border-zinc-200 bg-white shadow-lg ring-0"
					side="bottom"
					align="end"
				>
					<div className="space-y-0.5">
						<div className="border-b border-zinc-200 px-4 py-3">
							<p className="text-sm font-semibold text-zinc-900">
									{currentUser?.firstName} {currentUser?.lastName}
							</p>
							<p className="text-xs text-zinc-500 font-[Thamanyah2]">{currentUser?.email}</p>
						</div>

						<Link
							to="/profile"
							className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
						>
							<User size={16} />
							<span>الملف الشخصي</span>
						</Link>

						<Link
							to={`/student-initiatives-participation/${currentUser?.id}`}
							className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
						>
							<Clock size={16}/>
							<span>سجل التطوع</span>
						</Link>
						<button
							onClick={() =>
								setOpenLogoutDialog(
									true
								)
							}
							className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
						>
							<LogOut size={16} />
							<span>تسجيل الخروج</span>
						</button>
					</div>
				</PopoverContent>
      </Popover>

      <Dialog
        open={openLogoutDialog}
        onOpenChange={
          setOpenLogoutDialog
        }
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="font-[Thamanyah2]">
              هل أنت متأكد من أنك
              تريد تسجيل الخروج؟
            </DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setOpenLogoutDialog(
                  false
                )
              }
            >
              إلغاء
            </Button>

            <Button
              variant="destructive"
              onClick={handleLogout}
            >
              تأكيد تسجيل الخروج
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  	</>
  );
};

export default HeaderAvatar;