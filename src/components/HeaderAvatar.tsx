import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover.tsx";
import UserAvatar from "./user/UserAvatar.tsx";
import { Link, useNavigate } from "react-router";
import userData from "../data/userData.json";
import {LogOut, User} from "lucide-react";

const HeaderAvatar = () => {

    const navigate = useNavigate();
    const user = userData.personalInfo;

    const handleLogout = () => {
        navigate("/login");
    };

    return (
      <Popover>
          <PopoverTrigger asChild>
              <button className="relative flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-zinc-100">
                  <UserAvatar
                      url={user?.avatar}
                      width="w-9"
                      height="h-9"
                      letterSize={"text-lg"}
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
                          {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-zinc-500">{user?.email}</p>
                  </div>

                  <Link
                      to="/profile"
                      className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
                  >
                      <User size={16} />
                      <span>الملف الشخصي</span>
                  </Link>

                  <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                  >
                      <LogOut size={16} />
                      <span>تسجيل الخروج</span>
                  </button>
              </div>
          </PopoverContent>
      </Popover>
  );
};

export default HeaderAvatar;