import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../../../components/ui/avatar";

import { useVolunteers } from "../../../hooks/use-volunteers";

interface Props {
  campaignId: number;
}

const InitiativeDetailsVolunteersAvatar = ({ campaignId }: Props) => {
  const { data } = useVolunteers({ campaignId });

  const volunteers = data?.content ?? [];

  return (
    <div>
      <div className="w-full flex flex-row gap-10">
        <h1>
          عدد الطلاب المتطوعين في هذه المبادرة هو{" "}
          {volunteers.length} طالب
        </h1>

        <AvatarGroup className="grayscale">
          {volunteers.slice(0, 3).map((v) => (
            <Avatar key={v.applicationId}>
              <AvatarImage src={v.photo || ""} />
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