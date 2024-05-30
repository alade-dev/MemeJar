import { AuthService, SuiService } from "../main/pages/zkLogin";
import { useCallback, useEffect, useState, useMemo, useContext } from "react";

const News = () => {
    const [balance, setBalance] = useState("0");
  const authService = new AuthService();
  // const {setUser} = useContext(UserContext)

  

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.hash.substr(1));
        const jwtToken = params.get("id_token");
        console.log("jwtToken", jwtToken);
        if(jwtToken == null){
          setUser(false)
        }

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
        <div className='bg-primary text-white h-full p-6 relative overflow-y-scroll no-scrollbar' >
            <div className="bg-white w-full text-primary p-2  flex gap-2 rounded-md fixed top-4 ">
                <h1 className='font-semibold uppercase'>
                    Earn:
                </h1>
                <p>
                    {balance} Sui
                </p>
            </div>
            <h1 className='font-bold text-2xl text-secondary text-center mt-9'> News & Updates </h1>
            <div className=''>

                <div className='bg-white-200 rounded-lg text-primary py-4 px-2 my-6 relative'>
                    <h1 className='font-semibold text-xl text-primary'>Contests Voting</h1>
                    <p className='text-sm leading-7 text-gray-800'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque delectus ratione laborum, tempora eius ab minus ipsum vero ullam.
                    </p>

                    <p className='text-right font-bold text-sm mt-2'>12th Dec, 2024 </p>

                </div>

                <div className='bg-white-200 rounded-lg text-primary py-4 px-2 my-6 relative'>
                    <h1 className='font-semibold text-xl text-primary'>Contests Voting</h1>
                    <p className='text-sm leading-7 text-gray-800'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque delectus ratione laborum, tempora eius ab minus ipsum vero ullam.
                    </p>

                    <p className='text-right font-bold text-sm mt-2'>12th Dec, 2024 </p>

                </div>



            </div>
        </div>

    )
}

export default News