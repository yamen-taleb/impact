import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import syrianGovernorates from "../../data/syrianGovernorates.json";
import SelectField from "../SelectField.tsx";

interface governorateProps {
    value: string;
    arabic: string;
    english: string;
}
const GovernorateSelect = ({field, disabled}) => {
    const governorates = syrianGovernorates;
  return (
      // <Select
      //     value={value}
      //     onValueChange={handleChange}
      // >
      //     <SelectTrigger
      //         className={`w-full border-0 bg-none border-b-2 border-b-gray-300 disabled:border-b-zinc-500 disabled:opacity-100 disabled:text-zinc-600 rounded-none ${
      //             disabled ? "" : "cursor-pointer hover:bg-accent"
      //         }`}
      //     >
      //         <SelectValue
      //             placeholder={
      //                 governorates?.find((governorate: governorateProps) => governorate.value === value)?.arabic ||
      //                 "اختر محافظة"
      //             }
      //         />
      //     </SelectTrigger>
      //     <SelectContent>
      //         {governorates?.map((governorate: governorateProps) => (
      //             <SelectItem key={governorate.value} value={governorate.value}>
      //                 {governorate.arabic}
      //             </SelectItem>
      //         ))}
      //     </SelectContent>
      // </Select>
      <SelectField/>
  );
};

export default GovernorateSelect;