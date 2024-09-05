import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "../components/FileUpload";
import Display from "../components/Display";
import Modal from "../components/Modal";
import DocShareModal from "../components/DocShareModal";

const Home = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [docmodal, setdocmodal] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();

    // Load points from local storage
  }, []);

  useEffect(() => {
    const storedPoints = localStorage.getItem("points");
    if (storedPoints) {
      setPoints(storedPoints);
    }
    // console.log(points);
  }, [points]);

  const handlePointsEarned = (newPoints) => {
    setPoints(newPoints);
  };

  return (
    <div>
      <nav className="navHome">
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
        <button className="share1" onClick={() => setdocmodal(true)}>
          Share Document
        </button>
        <div className="pointsDiv">Points: {points}</div>
      </nav>
      {docmodal && (
        <DocShareModal
          setdocmodal={setdocmodal}
          contract={contract}
        ></DocShareModal>
      )}

      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>Data independent Platform</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <p className="accdetails" style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
          onPointsEarned={handlePointsEarned}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </div>
  );
};

export default Home;
