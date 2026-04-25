import VolunteerDetails from "./VolunteerDetails";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../../../components/ui/avatar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion"



const Volnteer = () => {

  // Change This Role between Admin and User
  let role = "Admin";

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


        {(role === "Admin" || role === "SuperAdmin") && (
          <Accordion
            type="single"
            collapsible
            // defaultValue="cards"
            className="w-full"
          >
            <AccordionItem value="cards">
              <AccordionTrigger className="text-lg">عرض تفاصيل الطلاب</AccordionTrigger>
              <AccordionContent className="pt-10">
                <VolunteerDetails />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        
      </div>
  );
};

export default Volnteer;
