import {ArrowRight} from "lucide-react";
import {Link} from "react-router";

interface Props {
    backHref?: string;
}

const InitiativeDetailsActions = ({backHref = "/initiatives"}: Props) => {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Link
                to={backHref}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
            >
                <ArrowRight size={16} />
                العودة للمبادرات
            </Link>
            <button
                type="button"
                className="inline-flex items-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
                المشاركة في المبادرة
            </button>
        </div>
    );
};

export default InitiativeDetailsActions;

