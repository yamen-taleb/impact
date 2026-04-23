interface Props {
    description: string;
}

const InitiativeDetailsDescription = ({description}: Props) => {
    return (
        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:col-span-2">
            <h2 className="text-lg font-bold text-zinc-900">تفاصيل المبادرة</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-zinc-700">
                {description}
            </p>
        </article>
    );
};

export default InitiativeDetailsDescription;

