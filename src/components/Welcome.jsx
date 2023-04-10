// import "bootstrap/dist/css/bootstrap.min.css";
import React, {useContext} from "react";
import { Loader } from "./";
import {default as ethereum} from '../images/ethereum.png';
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";


const Input = ({placeholder, name, type, value, handleChange}) => (
  <input
   placeholder={placeholder}
   type={type}
   step="0.0001"
   value={value}
   onChange={(e)=> handleChange(e,name)}
   className="my-2 outline-none bg-transparent rounded w-100 p-1 px-2 text-white border-none"
  />
);


const Welcome = () => {

  const { connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading, currentBalance }  = useContext(TransactionContext);

  // console.log(connectWallet);

  // const connectWallet = () => {};
  const handleSubmit = (e)=>{
      const {addressTo, amount, keyword, message} = formData;

      e.preventDefault();

      if(!addressTo || !amount || !keyword || !message) return;

      sendTransaction();
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          {/* <div className='d-flex justify-content-center'> */}
          <h1 className="text-white text-left py-2 text-3xl sm:text-5xl">
            Send Crypto
            <br />
            Across the World
          </h1>
          <p className="text-white text-left font-light text-base mt-4">
            Explore the crypto world.
            <br />
            Buy and sell cryptocurrencies easily across the world
          </p>

          {/* </div> */}
          {/* <div class="d-flex justify-content-center "> */}
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="btn btn-primary text-center mb-2"
            >
              Connect Wallet
            </button>

          )}
         
          <br />
          {/* </div> */}
          <div className="my-3">
            <div class="d-flex justify-content-start text-white">
              <div class="p-2 border border-white border-opacity-5">
                Reliability
              </div>
              <div class="p-2 border border-white border-opacity-5">
                Security
              </div>
              <div class="p-2 border border-white border-opacity-5">
                Ethereum
              </div>
            </div>
            <div class="d-flex justify-content-start text-white">
              <div class="p-2 border border-white border-opacity-5">
                Web 3.0{" "}
              </div>
              <div class="p-2 border border-white border-opacity-5">
                Low Fees
              </div>
              <div class="p-2 border border-white border-opacity-5">
                Blockchain
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">

         
            
            {currentBalance ? ( 
               <div className="bg-dark p-4 mb-4">
            <div className="d-flex flex-row">
               <h5 className="text-white">Balance </h5> <img src={ethereum} alt="ethereum" className="cursor-pointer border rounded-circle mx-2" style={{width: "30px",height: "30px"}}/>
            </div>
            <h5 className="text-success mt-2">0.{currentBalance} ETH</h5>
          </div>

            ):(
              <div className="bg-dark p-4 mb-4">
            <div className="d-flex flex-row">
               <h5 className="text-white">Connect Wallet to see balance</h5> <img src={ethereum} alt="ethereum" className="cursor-pointer border rounded-circle mx-2" style={{width: "30px",height: "30px"}}/>
            </div>
          </div>
            )};
            
           
          <div class="card eth-card white-glassmorpism" style={{ width: "22rem",height: "13rem" }}>
           <img src={ethereum} alt="ethereum" className="cursor-pointer border rounded-circle m-2" style={{width: "30px",height: "30px"}}/>
           {/* <span className="text-end text-white px-4">Balance</span> */}
            <div class="card-body">
              <h5 class="card-title"> </h5>
              <div class="m-2 text-white" style={{position: "absolute",bottom: "0",left: "0"}}>
              <h5 class="card-subtitle mb-2 text-white"> {shortenAddress(currentAccount)}</h5>
              <p class="card-text">
                Ethereum
              </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 blue-glassmorphism my-4">

            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="keyword (GIF)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

            {isLoading ? 
            (
              <Loader />
            ):
            (
              <button
              type="button"
              onClick={handleSubmit}
              className="w-100 rounded mt-2 p-2 bg-transparent text-white border border-white"
              >
                Send Now
              </button>
            )
          }

          </div>

        </div>

      </div>
    </div>
  );
};

export default Welcome;
