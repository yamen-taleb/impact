import { UsersIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../../../components/ui/avatar";
import { useVolunteers } from "../../../hooks/use-volunteers";
import { getImageUrl, toArabicNumbers } from "../../../lib/utils";


interface Props {
  campaignId: number;
}

const InitiativeDetailsVolunteersAvatar = ({ campaignId }: Props) => {
  const { data } = useVolunteers({ campaignId });

  const volunteers = data?.content ?? [];

  if(volunteers.length === 0) return;

  return (
    <div>
      <div className="w-full flex flex-row gap-10">
        <div className="flex flex-row gap-2">
          <UsersIcon />
          <h1>
            عدد الطلاب المتطوعين في هذه المبادرة هو{" "}
            {toArabicNumbers(volunteers.length) + " " + (
              volunteers.length === 2 ? "طالبين" 
              : volunteers.length <= 10 && volunteers.length > 2 ? "طلاب" 
              : "طالب" 
            )}
          </h1>
        </div>

        <AvatarGroup className="grayscale">
          {volunteers.slice(0, 3).map((v) => (
            <Avatar key={v.applicationId}>
              <AvatarImage src={(v?.photo ? getImageUrl(v.photo) : "") || ""} />
              <AvatarFallback>
                {v.firstName?.[0]}
                {v.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          ))}

          {volunteers.length > 3 && (
            <AvatarGroupCount className="right-1">
              +{volunteers.length - 3}
            </AvatarGroupCount>
          )}
        </AvatarGroup>
      </div>
    </div>
  );
};

export default InitiativeDetailsVolunteersAvatar;