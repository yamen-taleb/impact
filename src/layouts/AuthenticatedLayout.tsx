import { Navigate, Outlet, useLocation } from "react-router";
import AuthenticatedHeader from "../components/AuthenticatedHeader";
import {UserProvider} from "../context/UserContext.tsx";
import {CategoryProvider} from "../context/CategoryContext.tsx";
import {CollegeProvider} from "../context/CollegeContext.tsx";
import {useUserContext} from "../context/UserContext.tsx";
import Loader from "../components/Loader.tsx";

const AuthenticatedShell = () => {
    const { currentUser, isLoading } = useUserContext();
    const location = useLocation();

    if (isLoading) {
        return (
            <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
                <Loader className="w-full max-w-sm" />
            </main>
        );
    }

    if (currentUser?.isBanned && location.pathname !== "/expelled") {
        return <Navigate to="/expelled" replace />;
    }

    if (currentUser && !currentUser.isBanned && location.pathname === "/expelled") {
        return <Navigate to="/initiatives" replace />;
    }

    const showHeader = location.pathname !== "/expelled";

    return (
        <>
            {showHeader && <AuthenticatedHeader />}
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </>
    );
};

const AuthenticatedLayout = () => {
    return (
        <div className="min-h-screen bg-zinc-50">
            <UserProvider>
                <CategoryProvider>
                    <CollegeProvider>
                        <AuthenticatedShell />
                    </CollegeProvider>
                </CategoryProvider>
            </UserProvider>
        </div>
    );
};

export default AuthenticatedLayout;

