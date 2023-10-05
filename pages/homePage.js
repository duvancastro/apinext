import React, { useEffect, useState } from "react";
import Layaout from "../components/Layaout";
import StudentsForm from "../components/StudentsForm";
import ComputerForm from "../components/ComputerForm";
import MainScreen from "../components/MainScreen";

const HomePage = () => {
  const [visible, setVisible] = useState("Home");
  const [loading, setloading] = useState({});
  const [visibleTable, setVisibleTable] = useState('student')

  const verPantalla = (value) => {
    setVisible(value);
  };

  useEffect(() => {
    verPantalla(visible);
  }, [visible]);

  return (
    <Layaout setVisible={setVisible} visible={visible} visibleTable={visibleTable} setVisibleTable={setVisibleTable}>
      {visible === "student" && <StudentsForm loading={loading} setloading={setloading} visible={visible} setVisible={setVisible} />}
      {visible === "computer" && <ComputerForm loading={loading} />}
      {visible === "Home" && <MainScreen setloading={setloading} setVisible={setVisible} visibleTable={visibleTable} visible={visible} />}
      {visible === "editStudent" && <StudentsForm loading={loading} setloading={setloading} visible={visible} setVisible={setVisible}/>}
    </Layaout>
  );
};

export default HomePage;
