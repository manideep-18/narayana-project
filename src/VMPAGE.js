// HomePage.js
import React, { useState } from "react";
import "./VMPAGE.css";

const HomePage = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleInputChange1 = (e) => {
    setInput1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setInput2(e.target.value);
  };

  const handleButton1Click = () => {
    // Handle button 1 click
    console.log("Button 1 Clicked:", input1);
  };

  const handleButton2Click = () => {
    // Handle button 2 click
    console.log("Button 2 Clicked:", input2);
  };

  return (
    <div className="homePageContainer">
      <div className="centeredContent">
        <h1>Welcome to the VMPAGE</h1>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Input 1"
            value={input1}
            onChange={handleInputChange1}
          />
          <input
            type="text"
            placeholder="Input 2"
            value={input2}
            onChange={handleInputChange2}
          />
        </div>
        <div className="buttonContainer">
          <button onClick={handleButton1Click}>Button 1</button>
          <button onClick={handleButton2Click}>Button 2</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
