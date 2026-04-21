import HeaderAvatar from "./HeaderAvatar.tsx";
import Navbar from "./Navbar.tsx";
import AppTittle from "./AppTitle.tsx";

const AuthenticatedHeader = () => {

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
            <div className="mx-32 flex items-center justify-between px-4 py-3 sm:px-6">
                <AppTittle/>
                <Navbar/>
                <HeaderAvatar/>
            </div>
        </header>
    );
};

export default AuthenticatedHeader;






