import React, {useEffect, useState} from 'react';
import { createContext } from 'react';
import {ethers} from 'ethers';
// import Web3 from 'web3';

import {contractABI,contractAddress} from '../utils/constants';

export const TransactionContext =   createContext();
// var web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/43ce85e19d394c70b9557beb404c3f85"));
const { ethereum } = window;


const getEthereumContract = () =>{
     const provider = new ethers.providers.Web3Provider(ethereum);
     const signer = provider.getSigner();
     const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    
     return transactionContract;

    //  console.log({
    //      provider,
    //      signer,
    //      transactionContract
    //  });
}

 export const TransactionProvider = ({children})=>{

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([])
    const [currentBalance, setcurrentBalance] = useState(0)

    // const Balance = () => {
    //     const balance = web3.eth.getBalance("0x2d4bB07f04A6e1231dE4C37d70D9ec67557763a2").web3.utils.fromWei("ether")
    //     setcurrentBalance(balance);
    // }
   

    const handleChange= (e, name) =>{
        setFormData((prevState)=>({...prevState,[name]: e.target.value }));
    }

    // const Balanace = async () => {
    //     const provider = new ethers.providers.Web3Provider(ethereum);
    //     const balance = await provider.getBalance("0x2d4bB07f04A6e1231dE4C37d70D9ec67557763a2");
    //     console.log(balance)
    //     setcurrentBalance(balance)
    // }

    const getAllTransactions = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");

           const transactionContract = getEthereumContract();

           const availableTransactions = await transactionContract.getAllTransactions();
           
           const structuredTransactions = availableTransactions.map((transaction)=>({
               addressTo: transaction.reciever,
               addressFrom: transaction.sender,
               timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
               message: transaction.message,
               keyword: transaction.keyword,
               amount: parseInt(transaction.amount._hex) / (10 ** 18)
           }));

           console.log(structuredTransactions);
           setTransactions(structuredTransactions);
           console.log(availableTransactions);
        }catch(error){
            console.log(error);

            throw new Error("No ethereum object.");
        }
    }

   
    const checkIfWalletIsConnected = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({method: 'eth_accounts' });
    
            // console.log(accounts);
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                const provider = new ethers.providers.Web3Provider(ethereum);
                const balance = provider.getBalance(accounts[0])
                const Walletb = await balance
                console.log(Walletb.toString())
                setcurrentBalance(Walletb.toString())
                getAllTransactions();
            }else{
                console.log("No Accouonts Found");
            }
        }catch(error){
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const checkIfTransactionExist = async () =>{
        try{
         const transactionContract = getEthereumContract();
         const transactionCount = await transactionContract.getTransactionsCount();

         window.localStorage.setItem("transactionCount", transactionCount)
        }catch(error){
            console.log(error);

            throw new Error("No ethereum object.");
        }
    }

    const sendTransaction = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");

            //get tyhe daTA FROM THE FORM 
            const {addressTo, amount, keyword, message} = formData;

            const transactionContract = getEthereumContract();
            const parseAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parseAmount._hex,
                }]
            })

          const transactionHash = await transactionContract.addToBlockchain(addressTo, parseAmount, message, keyword);

          setIsLoading(true);
          console.log(`Loading - ${transactionHash.hash}`);
          await transactionHash.wait();

          setIsLoading(false);
          console.log(`success - ${transactionHash.hash}`);

          const transactionCount = await transactionContract.getTransactionsCount();
          setTransactionCount(transactionCount.toNumber());
        
        }catch(error){
            console.log(error);

            throw new Error("No ethereum object.");
        }

    }

    const connectWallet = async ()=>{
        try{
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        }catch(error){
          console.log(error);

          throw new Error("No ethereum object.");
        }
    }

    useEffect(()=>{
      checkIfWalletIsConnected();
      checkIfTransactionExist();
   
    },[]);
    // const name = "sandeep";
    return(
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction,transactions, isLoading, currentBalance}}>
            {children}
        </TransactionContext.Provider>
    )
}
// export default TransactionProvider;