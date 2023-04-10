import { useContext } from "react";
import React from "react";

import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  return (
    <div className="col-lg-4 mb-4 text-white">
      <div class="card bg-transparent border border-white" style={{ width: "20rem" }}>
        {/* <img src="..." class="card-img-top" alt="..." /> */}
        <div class="card-body text-center">
          <h5 class="card-title">Transactions</h5>
         
          <a href={`https://goerli.etherscan.io/address/${addressFrom}`} target="_blank" rel="nooper noreferrer"> <p class="card-text">
           From: {shortenAddress(addressFrom)}
          </p></a>
        
         
          <a href={`https://goerli.etherscan.io/address/${addressTo}`} target="_blank" rel="nooper noreferrer"> <p class="card-text">
           To: {shortenAddress(addressTo)}
          </p></a>
        
         <p class="card-text">Amount: {amount} ETH</p>
         {message && (
             <>
              <br />
              <p className="text-white">Message: {message}</p>
             </>
         )}
         <div className="text-success bg-dark rounded p-3">
             {timestamp}
         </div>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, transactions, isLoading } = useContext(TransactionContext);
  return (
    // <h1>Transactions</h1>
    <div className="gradient-bg-transactions">
      <div className="container p-5">
        {currentAccount ? (
          <h2 className="text-white text-center">Latest Transaction</h2>
        ) : (
          <h2 className="text-white text-center">
            Connect your Metamask to see the latest transaction
          </h2>
        )}
      </div>
      <div className="container">
        <div className="row">
          {transactions.reverse().map((transactions, i) => (
           
            <TransactionCard key={i} {...transactions} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
