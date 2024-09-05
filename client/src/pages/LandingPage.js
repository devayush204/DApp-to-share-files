import React from "react";
import styles from "./Landingpage.module.css";
import {Link} from "react-router-dom"

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div>
          <h5 className={styles.name}>Crypto Crafters</h5>
        </div>
        <div className={styles.links}>
          <h3>About</h3>
          <h3>Blogs </h3>
          <h3>Pages</h3>
          <h3>Contact</h3>
        </div>
        <div>
          <button className={styles.connect_button}>
          <Link to={"/dashboard"}>
          Start Sharing
          </Link>
          </button>
        </div>
      </div>

      <div className={styles.container2}>
        <div className={styles.subcontainer}>
          <div>
            <p className={styles.text}>To Share ,Upload and Secure Documents</p>
            <p className={styles.text2}>
            Data &nbsp; independent <br />
            Platform
                
            </p>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btn1}>Contact Us</button>
            <button className={styles.btn1}>Secure your files</button>
          </div>
          <div className={styles.imgContainer2}>
            <img src="/file.png" alt="" />
          </div>
        </div>
        <div className={styles.imgDiv}>
          <img src="/About 1 1.png" />
        </div>
      </div>


      <div className={styles.container3}>
      <div className={styles.shadow1}></div>
      <div className={styles.shadow2}></div>
      <div className={styles.shadow3}></div>
        <div className={styles.bg}>
            <img src="/bg.png" alt="" />
        </div>
      <div className={styles.subContainer3}>
        <h1 className={styles.subContainer3_heading}>
        Our blockchain e-vault's competitive edge
        </h1>
        <h3 className={styles.subContainer3_SubHeading}>
        Transform data management with our blockchain e-vault.
        </h3>
        <h3 className={styles.subContainer3_SubHeading}>
        Elevate user experience, foster community, and build brand loyalty effortlessly.
        </h3>
        <h3 className={styles.subContainer3_SubHeading}>
        Our guide ensures security, transparency, and a seamless, user-centric platform.
        </h3>
        <button className={styles.getstartbtn}>get Started</button>
      </div>
      </div>


    {/* <div className={styles.container4}>
    <div>
        <h1>how it works?</h1>
    </div>
    </div> */}

    </div>
  );
};

export default LandingPage;
