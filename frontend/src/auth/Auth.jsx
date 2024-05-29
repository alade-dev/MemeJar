import { useCallback, useEffect, useState, useMemo } from "react";
import { AuthService, SuiService } from "../pages/main/pages/zkLogin";
import GoogleLogo from "../assets/icons/google.svg";
import Index from "../pages/Index";


const Auth = () => {
    const [balance, setBalance] = useState("0");
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
  
  
    let walletAddress;
    const suiService = useMemo(() => new SuiService(), []);
  
    const getBalance = useCallback(async () => {
      try {
        if (AuthService.isAuthenticated()) {
          setBalance(
            await suiService.getFormattedBalance(AuthService.walletAddress())
          );
        }
      } catch (error) {
        console.log({ error });
      } 
    }, [suiService]);
  
    const logout = async () => {
      sessionStorage.clear();
      window.location.href = "/login";
    };
  
    if (AuthService.isAuthenticated()) {
      walletAddress = AuthService.walletAddress();
  
      console.log(walletAddress)
    }
  
    useEffect(() => {
      getBalance();
    }, [getBalance]);
  
    console.log(balance)
  
  


  return (
    <div className=" bg-[#080] grid items-center place-content-center h-[100vh]">
      <div>
        <h1 className="text-6xl  text-center text-white font-bold ">
          Welcome <br /> to <br />{" "}
          <span className="text-tcolor"> MemeJar </span>
        </h1>
        <p className="text-sm font-thin text-center text-white italic">
          Where Memes Meet SocialFi
        </p>
        <div className="text-center">
          {AuthService.isAuthenticated() ? (
            <Index/>
          ) : (
            <button
              className="text-white-200 py-4 px-4 my-3 flex items-center mx-auto bg-primary rounded-lg text-xl hover:bg-secondary hover:opacity-70 hover:text-primary "
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth