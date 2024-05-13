import abi from "./contract/VotingContract.json";
import { useState, useEffect } from "react";
import Vote from "./components/vote";
import Voters from "./components/voters";
import VOTER from "./VOTER.png";
import "./App.css";
const ethers = require("ethers");

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x25B707DA9656CB3b55B59156fCACDC49dA7C0558";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  // console.log(state);
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%"}}>
      <h1 style={{textAlign:"center"}}>DIGITAL INDIA KA DIGITAL VOTE</h1>
      <img src={VOTER} className="rounded mx-auto d-block" alt=".." />
      <p
        class="text-muted lead"
        style={{ marginTop: "10px", marginLeft: "5px", textAlign:"center" }}
      >
        <h5>Connected Account - {account}</h5>
      </p>
      <div className="container">
        <Vote state={state} />
        <Voters state={state} />
      </div>
    </div>
  );
}

export default App;