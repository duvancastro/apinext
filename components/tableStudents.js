/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import Style from '../styles/table.module.css'

const TableStudents = ({setloading ,setVisible}) => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [deleteStudent, setdeleteStudent] = useState('');
const edit=(student)=>{
  setVisible("editStudent");
  setloading(student);
}
const studentDelete=async()=>{
  if(deleteStudent!==''){
    console.log(deleteStudent)
    const response = await fetch(`/api/students?IDnumber=${deleteStudent}`, {
      method: "DELETE"
    });
    switch (response.status) {
      case 200:
        alert(`${response.status} ESTUDIANTE ELIMINADO CON EXITO`)
        break;
      case 404:
          alert(`${response.status} EL ESTUDIANTE NO EXISTE`)
        break;
      default:
        alert(`${response.status} ERROR EN EL SERVER`)
        break;
      }
      setdeleteStudent('')
  }
}
  useEffect(() => {

  studentDelete();
    fetch('/api/students')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setEstudiantes(data.data); 
        }
      })
      .catch((error) => {
        console.error('Error al obtener la lista de estudiantes:', error);
      });
  }, [deleteStudent]);
  return (
    <div className={Style.table}>
    <table >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Last name</th>
          <th scope="col">identification number</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {estudiantes.map((student, index) => (
          <tr key={student.ID}>
            <th scope="row">{index+1}</th>
            <td>{student.name}</td>
            <td>{student.lastName}</td>
            <td>{student.IDnumber}</td>
            <td><button onClick={()=>edit(student)}>Edit</button></td>
            <td><button onClick={()=>setdeleteStudent(student.IDnumber)}>Delete</button></td>
            {/* Agrega más celdas según tus datos */}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default TableStudents