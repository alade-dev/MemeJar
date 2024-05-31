import { createContext } from 'react'
import { useCallback, useEffect, useState, useMemo } from "react";
import { AuthService, SuiService } from "./../hooks/zkLogin";


export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
    

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
  












    const value = {
   
    


    }

  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContext;

