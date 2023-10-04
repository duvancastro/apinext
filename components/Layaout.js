import { useState } from "react";
import Header from "./header";
const Layaout = ({ children, setVisible,visible }) => {


  
  return (
    <div>
      <Header setVisible={setVisible}visible={visible}/>
      {children}
    </div>
  );
};

export default Layaout;
