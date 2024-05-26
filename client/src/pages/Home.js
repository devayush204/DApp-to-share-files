import React from 'react'
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import Upload from "../artifacts/contracts/Upload.sol/Upload.json"
import "./Home.css"
import FileUpload from "../components/FileUpload";
import Display from "../components/Display";
import Modal from "../components/Modal";
import DocShareModal from '../components/DocShareModal';


const Home = () => {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [docmodal, setdocmodal] = useState(false)
  


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
  }, []);


  return (
    <div>
      <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
       {!docmodal && (
        <button className="share1" onClick={() => setdocmodal(true)}>
          Share Document
        </button>
      )}
      {docmodal && (
        <DocShareModal setdocmodal={setdocmodal} contract={contract}></DocShareModal>
      )}
       {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
      
        <h1>File Sharing DApp</h1>
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
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
    </div>
  )
}

export default Home
