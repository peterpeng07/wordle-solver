import React, { useState } from 'react';
import { Link } from "react-router-dom";


export default function First() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");
  const [fifth, setFifth] = useState("");


  return (
    <form onSubmit>
      <div>Letters You Know</div>
      <input type="text" value={first} onChange={(e) => setFirst(e.target.value)} />
      <input type="text" value={second} onChange={(e) => setSecond(e.target.value)} />
      <input type="text" value={third} onChange={(e) => setThird(e.target.value)} />
      <input type="text" value={fourth} onChange={(e) => setFourth(e.target.value)} />
      <input type="text" value={fifth} onChange={(e) => setFifth(e.target.value)} />
      <br />
      <Link to='/include'>Next</Link >
    </form>

  )
}