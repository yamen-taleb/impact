import HeaderAvatar from "./HeaderAvatar.tsx";
import Navbar from "./Navbar.tsx";
import AppTittle from "./AppTitle.tsx";
import { useUserContext } from "../context/UserContext.tsx";
import { getUserRole } from "../lib/utils.ts";

const AuthenticatedHeader = () => {
    const role = getUserRole();

    return (
        <header className={`sticky top-0 z-50 border-b-2 bg-white shadow-sm ${
                (role === "User") 
                ? "border-black" 
                : (role === "Admin")
                ? "border-green-600"
                : "border-red-600"
            }`}
        >
            <div className="mx-32 flex items-center justify-between px-4 py-3 sm:px-6">
                <AppTittle/>
                <Navbar/>
                <HeaderAvatar/>
            </div>
        </header>
    );
};

export default AuthenticatedHeader;






