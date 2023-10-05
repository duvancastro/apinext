/* eslint-disable react-hooks/rules-of-hooks */
import React, {  useState } from "react";

const computerForm = ({loading,setloading}) => {
    const [roomNumber, setRoomNumber] = useState(loading.roomNumber||"");
    const [computerNumber, setComputerNumber] = useState(loading.computerNumber||"");
    const [computerMac, setComputerMac] = useState(loading.computerMac||"");
    async function onSubmit(event) {
      event.preventDefault();
      const data = {
        roomNumber: roomNumber,
        computerNumber: computerNumber,
        computerMac: computerMac,
      };
      console.log(data);
  
      const response = await fetch("/api/computer", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setloading('')
      setComputerMac("");
      setComputerNumber("");
      setRoomNumber("");
      switch (response.status) {
        case 201:
          alert(`COMPUTADOR REGISTRADO CON EXITO`)
          break;
        case 409:
            alert(`EL COMPUTADOR YA EXISTE`)
          break;
    
        default:
          alert(`ERROR EN EL SERVER`)
          break;
      }
    }

    const numero = (e, who) => {
        if (!isNaN(e.target.value)) {
            switch (who) {
              case 'setRoomNumber':
                setRoomNumber(e.target.value);
                break;
              case 'setComputerNumber':
                setComputerNumber(e.target.value);
                break;
              default:
                alert("Campo no reconocido");
            }
          } else {
            alert("Por favor, ingrese solo números.");
          }
      }






  return (
    <div>
      <form onSubmit={onSubmit}>
      <div >
        <h2>Create computer</h2>
        </div>
        <div className="grid">
          <label >
          room number
            <input
              type="text"
              name="roomNumber"
              placeholder="room number"
              required
              value={roomNumber}
              onChange={(e)=>{numero(e,'setRoomNumber')}}
            />
          </label>

          <label >
          computer number
            <input
              type="text"
              name="computerNumber"
              placeholder="compute nNumber"
              required
              value={computerNumber}
              onChange={(e)=>{numero(e,'setComputerNumber')}}
            />
          </label>
        </div>

        <label >computer MAC</label>
        <input
          type="computerMac"
          name="computerMac"
          placeholder="computer MAC"
          required
          value={computerMac}
          onChange={(e)=>{
            setComputerMac(e.target.value)
          }}
        />
        <small>Please fill out all fields</small>

        <button type="submit">Create computer</button>
      </form>
    </div>
  );
};

export default computerForm;
