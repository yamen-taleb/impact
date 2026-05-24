import VolunteerDetails from "./VolunteerDetails";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion"


interface Props {
  campaignId: number;
}

const Volnteer = ({campaignId}: Props) => {
  return (
      <div>
        <Accordion
          type="single"
          collapsible
          // defaultValue="cards"
          className="w-full"
        >
          <AccordionItem value="cards">
            <AccordionTrigger className="text-lg">عرض تفاصيل الطلاب المتطوعين</AccordionTrigger>
            <AccordionContent className="pt-10">
              <VolunteerDetails campaignId={campaignId} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  );
};

export default Volnteer;
