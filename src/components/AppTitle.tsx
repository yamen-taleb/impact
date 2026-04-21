import {Link} from "react-router";

const AppTittle = () => {
  return (
      <Link
          to="/"
          className="flex items-center gap-2 transition hover:opacity-80"
      >
          <span className="bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-3xl font-black text-transparent">
                أثر
          </span>
      </Link>
  );
};

export default AppTittle;