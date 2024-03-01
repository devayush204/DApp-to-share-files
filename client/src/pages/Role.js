import React from 'react'
import styles from "./role.module.css"
import {Link} from "react-router-dom"

const Role = () => {
  return (
    <div className={styles.roleContainer}>
      <div class={styles.card}>
  <div class={styles.bg}>
  <input type="radio" id="judge" name="role" value="judge" />
        <label htmlFor="judge">Judge</label>
        <p>A judge presides over legal proceedings, interpreting and applying the law to make impartial decisions.</p>
  </div>
  <div class={styles.blob}></div>
</div>
<div class={styles.card}>
  <div class={styles.bg}>
  <input type="radio" id="lawyer" name="role" value="lawyer" />
        <label htmlFor="lawyer">Lawyer</label>
        <p>A lawyer provides legal advice, represents clients in court, and advocates for their interests.</p>
  </div>
  <div class={styles.blob}></div>
</div>
<div class={styles.card}>
  <div class={styles.bg}>
  <input type="radio" id="client" name="role" value="client" />
        <label htmlFor="client">Client</label>
        <p>A client seeks legal assistance or representation from lawyers to address their legal needs or issues.</p>
  </div>
  <div class={styles.blob}></div>
</div>
  
      <div className={styles.next}>
      <Link className={styles.linker} to="/dashboard">
        next
      </Link>
      </div>
    </div>
  )
}

export default Role
