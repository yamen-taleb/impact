import { Outlet } from "react-router";
import AuthenticatedHeader from "../components/AuthenticatedHeader";
import {UserProvider} from "../context/UserContext.tsx";

const AuthenticatedLayout = () => {
    return (
        <div className="min-h-screen bg-zinc-50">
            <UserProvider>
                <AuthenticatedHeader />
                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <Outlet />
                </main>
            </UserProvider>
        </div>
    );
};

export default AuthenticatedLayout;

