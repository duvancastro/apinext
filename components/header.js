import React from "react";
import Style from '../styles/Home.module.css'
const header = ({ setVisible, visible }) => {
  return (
    <nav >
         <ul >
        <li >
          <strong>Home</strong>
        </li>
      </ul>
      <ul>
        <li>
          <button
          
            onClick={
              visible === "student"
                ? () => setVisible("")
                : () => setVisible("student")
            }
          >
            Create Student
          </button>
        </li>
        <li>
          <button
           
            onClick={
              visible === "computer"
                ? () => setVisible("")
                : () => setVisible("computer")
            }
          >
            Create Computer
          </button>
        </li>
        <li>
          <button
        
            onClick={
              visible === "Home"
                ? () => setVisible("")
                : () => setVisible("Home")
            }
          >
            Home
          </button>
        </li>

      </ul>
   
    </nav>
  );
};

export default header;
