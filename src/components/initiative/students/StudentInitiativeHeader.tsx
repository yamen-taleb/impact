import { useParams } from "react-router";
import { useGetUserById } from "../../../hooks/use-user";

const StudentInitiativeHeader = () => {
    const { id } = useParams();

    const { user, isLoading } = useGetUserById(id);

    if (isLoading) {
        return <header className="mb-6">جاري التحميل...</header>;
    }

    return (
        <header className="mb-6">
            <h1 className="text-2xl">
                <span className="font-bold text-black">ساعات التطوع للطالب </span>
                <span className="font-light text-zinc-600">{user?.firstName} {user?.lastName}</span>
            </h1>

            <p className="mt-1 text-sm text-zinc-600 font-[Thamanyah2]">
                عرض ملخص ساعات التطوع في المبادرات للطالب
            </p>
        </header>
    );
};

export default StudentInitiativeHeader;