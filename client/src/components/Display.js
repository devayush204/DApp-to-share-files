import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const [salt, setsalt] = useState("a6h2")
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      const generateHash = () => {
          const timestamp = Date.now().toString();
          const randomString = Math.random().toString(36).substring(2, 7);
          const data = timestamp + randomString;
          const hash = crypto.createHash('md5').update(data).digest('hex').substring(0, 10);
          setsalt(hash);
        }
        generateHash()
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
      console.log("second",str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} className="dispcont" key={i} target="_blank">
            <img
              key={i}
              src={item}
              alt="new"
              className="image-list"
            >
              
            </img>
            <p className="hash-value">{item.split("s/")[1] + salt}</p>
          </a>
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
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;