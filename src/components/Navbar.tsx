import {Calendar, ChartNoAxesColumn, FolderKanban, Home, Lightbulb} from "lucide-react";
import {Link, useLocation} from "react-router";


const Navbar = () => {
    const { pathname } = useLocation();

    const navLinks = [
        { label: "الرئيسية", href: "/", icon: Home },
        { label: "المبادرات", href: "/initiatives", icon: Lightbulb },
        { label: "مبادراتي", href: "/my-initiatives", icon: FolderKanban },
        { label: "أنشطتي", href: "/my-applications", icon: Calendar },
        { label: "الاحصائيات", href: "/statistics", icon: ChartNoAxesColumn }
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <nav className="hidden gap-1 sm:flex">
            {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                    <Link
                        key={link.href}
                        to={link.href}
                        className={`relative rounded-lg px-3 py-2 text-sm font-medium transition flex items-center gap-2 ${
                            isActive(link.href)
                                ? "bg-zinc-100 text-zinc-900"
                                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                        }`}
                    >
                        <Icon size={16} />
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Navbar;