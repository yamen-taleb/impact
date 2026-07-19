import { LucideGanttChartSquare, UserCog, UserPen } from "lucide-react";
import { useGetStudents } from "../../../hooks/use-students";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../../lib/utils";
import UserAvatar from "../../user/UserAvatar";

interface Props {
    description: string;
    proposedByName: string;
    managedByName: string;
    currentUserRole: string;
}

const InitiativeDetailsDescription = ({description, proposedByName, managedByName, currentUserRole}: Props) => {


    const { data } = useGetStudents({
        page: 0,
        size: 1000,
    });

    const proposedUser = data?.content?.find(
        (user: any) => (user.firstName + " " + user.lastName) === proposedByName
    );
    
    const managedUser = data?.content?.find(
        (user:any) => (user.firstName + " " + user.lastName) === managedByName
    );

    const proposedAvatar = proposedUser?.photo
    ? getImageUrl(proposedUser.photo)
    : "";

    const managedAvatar = managedUser?.photo    
    ? getImageUrl(managedUser.photo)
    : "";


    return (
        <article className="w-full flex flex-row justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:col-span-2">
            <div className="w-[50%] flex flex-col gap-4">
                <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                        <UserPen />
                        <h2 className="text-lg font-bold text-zinc-900">مقدم المبادرة</h2>
                    </div>
                    {(currentUserRole === "Manager" || currentUserRole === "Admin")  && proposedUser ? (
                        <Link
                            to={`/profile/${proposedUser.userId}`}
                            className="text-blue-600 hover:underline flex flex-row gap-2 items-center"
                        >
                            <UserAvatar url={proposedAvatar} width="w-[10%]" firstName={managedUser?.firstName} lastName={managedUser?.lastName}/>                            <p>{proposedByName}</p>
                        </Link>
                    ) : (
                        <div className="flex flex-row gap-2 items-center">
                            {/* <img className="w-[10%] rounded-full" src={proposedUser.photo} alt={proposedByName} /> */}
                            {proposedUser?.photo && (
                                <UserAvatar url={proposedAvatar} width="w-[10%]" firstName={managedUser?.firstName} lastName={managedUser?.lastName}/>
                            )}
                            <p>{proposedByName}</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                        <LucideGanttChartSquare />
                        <h2 className="text-lg font-bold text-zinc-900">تفاصيل المبادرة</h2>
                    </div>
                    <p className="whitespace-pre-line text-sm leading-7 text-zinc-700 font-[Thamanyah2]">
                        {description}
                    </p>
                </div>
            </div>
            <div className="w-[50%]">
                {managedByName && (
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-2">
                            <UserCog />
                            <h2 className="text-lg font-bold text-zinc-900">مدير المبادرة</h2>
                        </div>
                        {(currentUserRole === "Manager")  && managedUser ? (
                            <Link
                                to={`/profile/${managedUser.userId}`}
                                className="text-blue-600 hover:underline flex flex-row gap-2 items-center"
                            >
                                {/* <img className="w-[10%] rounded-full" src={managedUser.photo} alt={managedByName} /> */}
                                <UserAvatar url={managedAvatar} width="w-[10%]" firstName={managedUser?.firstName} lastName={managedUser?.lastName}/>
                                <p>{managedByName}</p>
                            </Link>
                        ) : (
                            <div className="flex flex-row gap-2 items-center">
                                {managedUser?.photo && (
                                    <UserAvatar url={managedAvatar} width="w-[10%]" firstName={managedUser?.firstName} lastName={managedUser?.lastName}/>
                                )}
                                <p>{managedByName}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
};

export default InitiativeDetailsDescription;

