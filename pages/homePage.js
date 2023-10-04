import React, { useEffect, useState } from "react";
import Layaout from "../components/Layaout";
import StudentsForm from "../components/studentsForm";
import ComputerForm from "../components/computerForm";
import MainScreen from "../components/mainScreen";

const HomePage = () => {
  const [visible, setVisible] = useState("Home");
  const [loading, setloading] = useState({});

  const verPantalla = (value) => {
    setVisible(value);
  };

  useEffect(() => {
    verPantalla(visible);
  }, [visible]);

  return (
    <Layaout setVisible={setVisible} visible={visible}>
      {visible === "student" && <StudentsForm loading={loading} setloading={setloading} />}
      {visible === "computer" && <ComputerForm loading={loading} />}
      {visible === "Home" && <MainScreen setloading={setloading} setVisible={setVisible} />}
    </Layaout>
  );
};

export default HomePage;
