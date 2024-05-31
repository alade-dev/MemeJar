// Auth.js
import {  useEffect } from "react";
import { AuthService } from "../hooks/zkLogin";
import GoogleLogo from "../assets/icons/google.svg";
import Index from "../pages/Index";
// import { UserContext } from "../utils/UserContext";

const Auth = () => {
  const authService = new AuthService();
  // const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.hash.substr(1));
        const jwtToken = params.get("id_token");
        console.log("jwtToken", jwtToken);

        if (jwtToken) {
          sessionStorage.setItem("sui_jwt_token", jwtToken);
         // Clear the token from the URL
         const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
         window.history.replaceState({ path: newUrl }, "", newUrl);

         // Navigate to home page after login
         window.location.href = "/";
        }
      } catch (error) {
        console.error("Error handling callback:", error);
      }
    };

    handleCallback();
  }, []);



  return (
    <div className="bg-primary grid items-center place-content-center h-[100vh]">
      <div>
        <h1 className="text-6xl text-center text-white font-bold">
          Welcome <br /> to <br />{" "}
          <span className="text-tcolor"> MemeJar </span>
        </h1>
        <p className="text-sm font-thin text-center text-white italic">
          Where Memes Meet SocialFi
        </p>
        <div className="text-center">
          {AuthService.isAuthenticated() == true ? (
            <Index />
          ) : (
            <div
              className="text-white-200 cursor-pointer py-4 px-4 my-3 flex items-center mx-auto bg-primary rounded-lg text-xl hover:bg-secondary hover:text-primary border-white border-2"
              onClick={() => authService.login()}
            >
              <img
                src={GoogleLogo}
                alt="Google logo"
                width={20}
                style={{ marginRight: 10 }}
              />
              Sign-in with Google
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
