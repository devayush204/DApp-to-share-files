import { useEffect, useState } from "react";
import "./Display.css";
import { MD5 } from "crypto-js";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const [salt, setSalt] = useState("a6h2");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Hash copied to clipboard!");
  };

  const generateHash = (index) => {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 7);
    const data = timestamp + randomString + index.toString(); // Include index in the data
    const originalHash = MD5(data).toString().substring(0, 10);
    let updatedSalt = originalHash;
    for (let i = 0; i < 10; i++) {
      const randomDigits = Math.random().toString().substring(2, 7);
      updatedSalt += MD5(timestamp + randomDigits).toString().substring(0, 10);
    }

    return updatedSalt;
  };

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;

    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }

const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log("second", str_array);
      const images = str_array.map((item, i) => {
        const updatedSalt = generateHash(i); // Call generateHash with the index for each document

         // Extract file name from the URL
      const fileName = item.split("/").pop();
      const hashValue = `${fileName}${updatedSalt}`;
     
        return (
          <div className="singleidcontainer">
            <div>
            <a href={item} className="dispcont" key={i} target="_blank">
              <img
                key={`a-${i}`}
                src={item}
                alt="new"
                className="image-list"
              />
            </a>
            </div>
            <div>
            <p className="hash-value">{hashValue}</p>
           
            </div>
            <button
              className="copy-button"
              onClick={() => copyToClipboard(hashValue)}
            >
              copy
            </button>
           
              
          </div>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter account Address"
        className="address"
      />
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};

export default Display;
