import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";
import {cn} from "../../lib/utils.ts";

interface Props {
    url?: string,
    width: string,
    height?: string,
    letterSize?: string,
    firstName?: string,
    lastName?: string,
}

const UserAvatar = ({url, width, height, letterSize = "text-3xl", firstName, lastName}: Props) => {

    const getInitials = (first: string, last: string) => {
        const isArabic = /[\u0600-\u06FF]/.test(first);
        return isArabic ? first.charAt(0) : `${first.charAt(0)}${last.charAt(0)}`;
    };

    return (
        <Avatar className={cn(width, height, "rounded-none")}>
            <AvatarImage src={url} className="w-full object-cover object-center"/>
            <AvatarFallback
                className={cn(
                    "w-full flex items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-500",
                    letterSize
                )}
            >
                {(firstName && lastName) ? (
                    <h3 className="text-center">{getInitials(firstName, lastName)}</h3>
                ) : (
                    <h3>أثر</h3>
                )}
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;