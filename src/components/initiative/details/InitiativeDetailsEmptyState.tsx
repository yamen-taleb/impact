import {ArrowRight} from "lucide-react";
import {Link} from "react-router";

interface Props {
    backHref?: string;
}

const InitiativeDetailsEmptyState = ({backHref = "/initiatives"}: Props) => {
    return (
        <section className="mx-auto max-w-4xl rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-zinc-900">لم يتم العثور على المبادرة</h1>
            <p className="mt-3 text-sm text-zinc-600">
                قد يكون الرابط غير صحيح، أو أن المبادرة لم تعد متاحة.
            </p>
            <Link
                to={backHref}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
                <ArrowRight size={16} />
                العودة إلى المبادرات
            </Link>
        </section>
    );
};

export default InitiativeDetailsEmptyState;

