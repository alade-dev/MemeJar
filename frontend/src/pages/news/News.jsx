import { AuthService, SuiService } from "../../hooks/zkLogin";
import { useCallback, useEffect, useState, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const News = () => {
  const [balance, setBalance] = useState("0");
  const [address, setAddress] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.hash.substr(1));
        const jwtToken = params.get("id_token");
        // console.log("jwtToken", jwtToken);
        if (jwtToken == null) {
          // setUser(false)
        }

        sessionStorage.setItem("sui_jwt_token", jwtToken || "");
      } catch (error) {
        console.error("Error handling callback:", error);
      }
    };

    handleCallback();
  }, []);

  const suiService = useMemo(() => new SuiService(), []);

  const getBalance = useCallback(async () => {
    try {
      if (AuthService.isAuthenticated()) {
        setBalance(await suiService.getFormattedBalance(AuthService.walletAddress()));
        setAddress(AuthService.walletAddress());
      }
    } catch (error) {
      console.log({ error });
    }
  }, [suiService]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const sliceAddress = (address) => {
    if (!address) return '';
    const start = address.slice(0, 6);
    const end = address.slice(-6);
    return `${start}...${end}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied!');
    });
  };

  return (
    <div className='bg-primary text-white h-full p-6 relative overflow-y-scroll no-scrollbar'>
      <ToastContainer />
      <div className="bg-white xl:ml-10 text-primary p-2 items-center w-fit flex gap-2 relative rounded-md">
        <h1 className='font-semibold text-xs lg:text-base'>Earn:</h1>
        <p className='text-xs lg:text-base'>{balance} Sui</p>
        <p
          className="ml-2 text-xs lg:text-base cursor-pointer"
          onClick={() => copyToClipboard(address)}
        >
          {sliceAddress(address)}
        </p>
      </div>
      <h1 className='font-bold text-2xl text-secondary text-center mt-9'> News & Updates </h1>
      <div>
        <div className='bg-white-200 rounded-lg text-primary py-4 px-2 my-6 relative'>
          <h1 className='font-semibold text-xl text-primary'>Contests Voting</h1>
          <p className='text-sm leading-7 text-gray-800'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque delectus ratione laborum, tempora eius ab minus ipsum vero ullam.
          </p>
          <p className='text-right font-bold text-sm mt-2'>12th Dec, 2024</p>
        </div>
        <div className='bg-white-200 rounded-lg text-primary py-4 px-2 my-6 relative'>
          <h1 className='font-semibold text-xl text-primary'>Contests Voting</h1>
          <p className='text-sm leading-7 text-gray-800'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque delectus ratione laborum, tempora eius ab minus ipsum vero ullam.
          </p>
          <p className='text-right font-bold text-sm mt-2'>12th Dec, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default News;