import {Link} from "react-router";
import AtharLogo2 from "../assets/Logo/AtharLogo2";

const AppTittle = () => {
  return (
      <Link
          to="/"
          className="w-[10%] flex items-center gap-2 transition hover:opacity-80"
      >
          <AtharLogo2 className={"w-full"} />
      </Link>
  );
};

export default AppTittle;