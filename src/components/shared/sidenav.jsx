import { Link, useNavigate } from "react-router-dom";
import { Grid, Package, Key, User } from "react-feather";
import { userData } from "../../utils";

export default function SideNav() {
  const navigate = useNavigate();

  const dashboardURL =
    userData()?.userRole === "company" ? "/company/dashboard" : "/dashboard";

  const isLoggedIn = userData()?.token?.length;

  const signOut = () => {
    localStorage.clear();
    navigate("/signin", { replace: true });
  };

  return (
    <>
      <header className="w-1/12 flex flex-col justify-between items-center py-2 px-5 bg-white max-h-screen sticky top-0">
        <div className="flex flex-col items-center">
          {/* <h1 className="font-medium text-xl text-blue-200 mt-10">
            <Link to="/"></Link>
          </h1> */}
          <nav className="hidden md:flex mt-10 md:mt-20 font-medium">
            <ul className="flex flex-col space-y-5 md:space-y-10">
              <li>
                <Link
                  to={dashboardURL}
                  className="hover:underline underline-offset-2 px-4 py-1 tracking-wider"
                >
                  <div className="tooltip tooltip-right" data-tip="Dashboard">
                    <Grid />
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:underline underline-offset-2 px-4 py-1 tracking-wider"
                >
                  <div className="tooltip tooltip-right" data-tip="Profile">
                    <User />
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="hidden md:flex">
          {isLoggedIn ? (
            <button className="btn btn-xs" onClick={signOut}>
              Sign out
            </button>
          ) : (
            <Link href="/auth/signin">
              <Button className="bg-slate-800">Sign in</Button>
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
