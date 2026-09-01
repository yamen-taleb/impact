import Loader from "../Loader.tsx";
import ErrorDisplay from "../ErrorDisplay.tsx";
import PaginationLinks from "./PaginationLinks.tsx";
import type {Initiative} from "../../schemas/initiativePageSchema.ts";

interface Props {
    initiatives: Initiative[];
    children: React.ReactNode;
    isLoading: boolean;
    error: never;
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
}

const BaseInitiatives = ({initiatives, children, isLoading, error, page, setPage, totalPages}: Props) => {
  return (
      <div>
          {isLoading ? (
              <Loader className="ml-10" />
          ) : error ? (
              <ErrorDisplay message="حدث خطأ أثناء تحميل المبادرات" className="ml-10" />
          ) : initiatives.length > 0 ?
              children
           : (
              <p className="rounded-lg ml-10 border border-dashed border-zinc-300 bg-white px-4 py-6 text-center text-sm font-medium text-zinc-500 font-[Thamanyah2]">
                  لا يوجد مبادرات حتى الآن...
              </p>
          )}
          {totalPages > 1 && (
              <PaginationLinks page={page} setPage={setPage} totalPages={totalPages} />
          )}
      </div>
  );
};

export default BaseInitiatives;
