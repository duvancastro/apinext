/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Layaout from "../components/Layaout";
import StudentsForm from "../components/studentsForm";
import ComputerForm from "../components/computerForm";
import MainScreen from "../components/mainScreen";
const homePage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visible, setVisible] = useState("");
  const [inStudent, setInStudent] = useState(false);
  const [inComputer, setInComputer] = useState(false);
  const [inHome, setInHome] = useState(true);
  const [loading, setloading] = useState({})

  const verPantalla = (value) => {
    switch(value){
      case "student":
        setInStudent(true);
        setInComputer(false);
        setInHome(false);
        break;
        case "computer":
          setInStudent(false);
          setInComputer(true);
          setInHome(false);
          break;
          case "Home":
            setInStudent(false);
            setInComputer(false);
            setInHome(true);
            break;
            default:
              setInStudent(false);
              setInComputer(false);
              setInHome(true);
              break;
    }
  };
  useEffect(() => {
    verPantalla(visible);
  }, [visible]);

  return (
    <Layaout setVisible={setVisible} visible={visible}>
      {inStudent ? <StudentsForm loading={loading} setloading={setloading} /> : inComputer? <ComputerForm loading={loading}/>:inHome? <MainScreen setloading={setloading} setVisible={setVisible}/>:''}
    </Layaout>
  );
};

export default homePage;
