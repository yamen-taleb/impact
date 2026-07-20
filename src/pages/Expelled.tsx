import { ShieldAlert } from "lucide-react";

const Expelled = () => {
    return (
        <section className="flex min-h-[70vh] items-center justify-center px-4 py-8 sm:px-6">
            <div className="w-full max-w-2xl rounded-3xl border border-red-200 bg-gradient-to-b from-white to-red-50 p-8 text-center shadow-sm sm:p-10">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                    <ShieldAlert size={30} />
                </div>

                <h1 className="mb-3 text-2xl font-bold text-red-800 sm:text-3xl">
                    تم إيقاف الحساب
                </h1>

                <p className="mx-auto max-w-xl text-base leading-8 text-red-900/80 sm:text-lg">
                    عذرا، لا يمكنك الوصول إلى المنصة حاليا لأن هذا الحساب موقوف.
                    إذا كنت ترى أن هذا الإجراء تم بالخطأ، يرجى التواصل مع إدارة اتحاد الطلبة.
                </p>
            </div>
        </section>
    );
};

export default Expelled;
