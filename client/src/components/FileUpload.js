import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import { toast } from "react-toastify";
import { Hourglass } from "react-loader-spinner";

const FileUpload = ({ contract, account, provider, onPointsEarned  }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const [loader, setLoader] = useState(false);
  const [ipfsHash, setIpfsHash] = useState("");

  const getFileType = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
    if (['mp4', 'webm', 'ogg'].includes(extension)) return 'video';
    if (extension === 'pdf') return 'pdf';
    return 'unknown';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        setLoader(true);
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `f09f0107f030d4d76c51`,
            pinata_secret_api_key: `0c8cf7007580f84f512e18bc779fbaf35bfb9197cbd22309e905ae1272b7b67a`,
            "Content-Type": "multipart/form-data",
          },
        });

        const fileType = getFileType(file);
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}?type=${fileType}`;
        await contract.add(account, ImgHash);
        setIpfsHash(resFile.data.IpfsHash);
        toast.success("File uploaded successfully");
        setFileName("No file selected");
        setFile(null);

        // Add points to local storage
        const currentPoints = parseInt(localStorage.getItem('points') || '0');
        const newPoints = currentPoints + 100;
        localStorage.setItem('points', newPoints.toString());
        
        // Notify parent component about points change
        onPointsEarned(newPoints);

      } catch (e) {
        setLoader(false);
        toast.error("An unexpected error occurred");
        console.log(e);
      }
    }
    setLoader(false);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="top">
      {loader && (
        <div className='loader'>
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        </div>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose file
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">File: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
      {ipfsHash && (
        <div style={{marginTop:"50px"}}>
          <p style={{color:"white"}}>Hash: {ipfsHash}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;