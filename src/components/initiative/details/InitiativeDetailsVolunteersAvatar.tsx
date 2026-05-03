import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../../../components/ui/avatar";

const InitiativeDetailsVolunteersAvatar = () => {

  return (
    <div>
      <div className="w-full flex flex-row gap-10">
        <h1>عدد الطلاب المتطوعين في هذه المبادرة هو 52 طالب</h1>

        <AvatarGroup className="grayscale">
          <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
          <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
          <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
          <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <AvatarGroupCount className="right-1">+49</AvatarGroupCount>
        </AvatarGroup>
      </div>
    </div>
  );
};

export default InitiativeDetailsVolunteersAvatar;
