/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

const studentsForm = ({loading,setloading,visible,setVisible}) => {
 
const [name, setname] = useState(loading.name||'');
const [lastname, setlastname] = useState(loading.lastName||'');
const [IDnumber, setIDnumber] = useState(loading.IDnumber||'');
  const reset=()=>{
    setloading('')
    setname('')
    setlastname('')
    setIDnumber('')
  }

  useEffect(() => {
    visible==='student'?(reset('')):null
    
  }, [visible])
  async function createStudent(event) {
    event.preventDefault();
    const formData = {
      name: name,
      lastname: lastname,
      IDnumber: IDnumber,
    };
    console.log(formData);
    const response = await fetch("/api/students", {
      method: "POST",
      body: JSON.stringify(formData),
    });
reset()
    switch (response.status) {
        case 201:
          alert(`ESTUDIANTE CREADO CON EXITO`)
          break;
        case 409:
            alert(`EL ESTUDIANTE YA EXISTE`)
          break;
    
        default:
          alert(`ERROR EN EL SERVER`)
          break;
      }
      setVisible('Home')
    }

  async function editStudent(event) {
    event.preventDefault();
    const formData = {
      name: name,
      lastName: lastname,
      IDnumber: IDnumber,
    };
    console.log(formData);
    const response = await fetch("/api/students", {
      method: "PATCH",
      body: JSON.stringify(formData),
    });
 reset()
    switch (response.status) {
        case 200:
          alert(`${response.status} ESTUDIANTE ACTUALIZADO CON EXITO`)
          break;
        case 404:
            alert(`${response.status} EL ESTUDIANTE NO EXISTE`)
          break;
    
        default:
          alert(`${response.status} ERROR EN EL SERVER`)
          break;
      }
      setVisible('Home')

  }

  const numero=(e)=>{
    if(!isNaN(e.target.value)){
      setIDnumber(e.target.value);
    }else{
      alert('Por favor, ingrese solo números.');
    }
  }
  
  return (
    <div>
      <form onSubmit={(e)=>{visible==='student'? createStudent(e):editStudent(e)}}>
        <div >
        <h2>{visible==='student'?'Create student':'Edit student'}</h2>
        </div>
        <div className="grid">
          <label >
            First name
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              required
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </label>

          <label >
            Last name
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              required
              value={lastname}
          onChange={(e) => {
            setlastname(e.target.value);
          }}
            />
          </label>
        </div>

        <label>identification number</label>
        <input
          type="IDnumber"
          name="IDnumber"
          placeholder="IDnumber"
          required
          value={IDnumber}
          onChange={numero}
        />
        <small>Please fill out all fields</small>

        <button type="submit">{visible==='student'?'Register student':'Edit student'}</button>
      </form>
    </div>
  );
};

export default studentsForm;
