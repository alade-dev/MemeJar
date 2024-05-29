import { useCallback, useEffect, useState, useMemo } from "react";
import { AuthService, SuiService } from "./zkLogin";

function Home() {
  const [balance, setBalance] = useState("0");
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.hash.substr(1));
        const jwtToken = params.get("id_token");
        console.log("jwtToken", jwtToken);

        sessionStorage.setItem("sui_jwt_token", jwtToken || "");
        //window.location.href = "/notes";
      } catch (error) {
        console.error("Error handling callback:", error);
      }
    };

    handleCallback();
  }, []);

  const authService = new AuthService();

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
    } finally {
    }
  }, [suiService]);

  const logout = async () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  if (AuthService.isAuthenticated()) {
    walletAddress = AuthService.walletAddress();
  }

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {AuthService.isAuthenticated() ? (
              <Wallet
                address={walletAddress || ""}
                amount={balance}
                symbol="SUI"
                destroy={logout}
              />
            ) : (
              <utton
            className="text-white-200 py-4 px-4 my-3 flex items-center mx-auto bg-primary rounded-lg text-xl hover:bg-secondary hover:text-white-200"
            onClick={() => authService.login()}
          >
              
                Login with Google
              </utton>
            )}
         
    </nav>
  );
}

export default Home;