import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";
import {cn} from "../../lib/utils.ts";

interface Props {
    url?: string,
    width: string,
    height: string,
    letterSize?: string,
    firstName?: string,
    lastName?: string,
}

const UserAvatar = ({url, width, height, letterSize = "text-3xl", firstName, lastName}: Props) => {

    return (
        <Avatar className={cn(width, height, "rounded-none")}>
            <AvatarImage src={url} className="w-full object-cover object-center"/>
            <AvatarFallback
                className={cn(
                    "w-full flex items-center justify-center rounded-2xl bg-slate-200 font-semibold text-slate-500",
                    letterSize
                )}
            >
                {(firstName && lastName) ? (
                    <h3 className="text-center">{firstName?.split("")[0] + lastName?.split("")[0]}</h3>
                ) : (
                    <h3>أثر</h3>
                )}
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;