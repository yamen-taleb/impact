interface Props {
    description: string;
    proposedByName: string;
}

const InitiativeDetailsDescription = ({description, proposedByName}: Props) => {
    return (
        <article className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:col-span-2">

            <div className="flex flex-col">
                <h2 className="text-lg font-bold text-zinc-900">مقدم المبادرة</h2>
                <p className="whitespace-pre-line text-sm leading-7 text-zinc-700 font-[Thamanyah2]">
                    {proposedByName}
                </p>
            </div>

            <div className="flex flex-col">
                <h2 className="text-lg font-bold text-zinc-900">تفاصيل المبادرة</h2>
                <p className="whitespace-pre-line text-sm leading-7 text-zinc-700 font-[Thamanyah2]">
                    {description}
                </p>
            </div>
        </article>
    );
};

export default InitiativeDetailsDescription;

