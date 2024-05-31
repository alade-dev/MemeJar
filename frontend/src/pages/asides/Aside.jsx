import { Link } from "react-router-dom";
import { AsideBar } from "../../constants";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
// import { useContext } from "react";
import { AuthService } from "../../hooks/zkLogin";

const Aside = ({ handlePageChange }) => {
  // const { user, setUser } = useContext(UserContext)
  // const authService = new AuthService();

  const handleSignOut = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <div className="bg-primary text-white h-full p-6 relative">
      <div className="leading-none mb-6">
        <h1 className="font-bold text-center text-5xl text-tcolor"> MemeJar</h1>
        <p className="text-sm font-light text-center text-blue-50">
          {" "}
          Where Memes Meet SocialFi
        </p>
      </div>

      <div className="">
        {AsideBar.map((aside) => {
          return (
            <ul key={aside.id} className="p-2 py-1">
              <li
                className=" rounded-lg px-2 py-2 font-semibold text-lg text-white-200 hover:bg-[#a3b0f7fd] hover:text-primary cursor-pointer flex gap-3 items-center"
                onClick={() => handlePageChange(aside.title)}
              >
                <img src={aside.icon} alt="icon.alt" width={24} height={24} />
                <a href="" className="">
                  {aside.title}
                </a>
              </li>
            </ul>
          );
        })}
      </div>

      <div
        className="bg-[#667bf0fd] text-white rounded-full p-3 text-center font-bold mt-12 hover:bg-[#a3b0f7fd]"
        onClick={() => handlePageChange("Create")}
      >
        <button className="text-xl"> Create Post </button>
      </div>

      <div className="absolute bottom-5 right-[50%]  ">
        <button className="flex items-center gap-2 mb-3">
          {" "}
          <FaUser /> Profile{" "}
        </button>

        <button onClick={handleSignOut}>
          <Link to="/auth" className="flex items-center">
            <FaSignOutAlt />
            <p className="pl-2">Sign out </p>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Aside;
