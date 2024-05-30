import { useCallback, useEffect, useState, useMemo, useContext } from "react";
import { AuthService, SuiService } from "../pages/main/pages/zkLogin";
import GoogleLogo from "../assets/icons/google.svg";
import Index from "../pages/Index";
import UserContext from "../utils/UserContext";


const Auth = () => {
  const {} = useContext(UserContext)

  const authService = new AuthService();
  

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.hash.substr(1));
        const jwtToken = params.get("id_token");
        console.log("jwtToken", jwtToken);
        sessionStorage.setItem("sui_jwt_token", jwtToken || "");

      } catch (error) {
        console.error("Error handling callback:", error);
      }
    };

    handleCallback();
  }, []);





  return (
    <div className="bg-primary grid items-center place-content-center h-[100vh]">
      <div>
        <h1 className="text-6xl  text-center text-white font-bold ">
          Welcome <br /> to <br />{" "}
          <span className="text-tcolor"> MemeJar </span>
        </h1>
        <p className="text-sm font-thin text-center text-white italic">
          Where Memes Meet SocialFi
        </p>
        <div className="text-center">
          {/* {AuthService.isAuthenticated() ? (
            <>
              <Index />

            </>
          ) : ( */}
            <button
              className="text-white-200 py-4 px-4 my-3 flex items-center mx-auto bg-primary rounded-lg text-xl hover:bg-secondary  hover:text-primary border-white border-2"
              onClick={() => authService.login()}
            >
              <img
                src={GoogleLogo}
                alt="Google logo"
                width={20}
                style={{ marginRight: 10 }}
              />
              Sign-in with Google
            </button>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

export default Auth