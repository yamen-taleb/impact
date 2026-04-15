import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";
import userData from "../../data/userData.json";
import {cn} from "../../lib/utils.ts";

interface Props {
    url?: string
    width: string,
    height: string
}

const UserAvatar = ({url, width, height}: Props) => {
    const currentUser = userData.personalInfo

    return (
        <Avatar className={cn(width, height, "rounded-none")}>
            <AvatarImage src={url} className="w-full object-cover object-center"/>
            <AvatarFallback
                className="flex items-center justify-center rounded-2xl bg-slate-200 text-3xl font-semibold text-slate-500">{currentUser?.firstName.split("")[0]}</AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;