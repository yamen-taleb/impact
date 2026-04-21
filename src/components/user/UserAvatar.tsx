import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";
import userData from "../../data/userData.json";
import {cn} from "../../lib/utils.ts";

interface Props {
    url?: string
    width: string,
    height: string
    letterSize?: string
}

const UserAvatar = ({url, width, height, letterSize = "text-3xl"}: Props) => {
    const currentUser = userData.personalInfo

    return (
        <Avatar className={cn(width, height, "rounded-none")}>
            <AvatarImage src={url} className="w-full object-cover object-center"/>
            <AvatarFallback
                className={cn(
                    "flex items-center justify-center rounded-2xl bg-slate-200 font-semibold text-slate-500",
                    letterSize
                )}
            >
                {currentUser?.firstName?.charAt(0)?.toUpperCase() ?? "?"}
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;