/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'

const tableStudents = ({setloading ,setVisible}) => {
    const [estudiantes, setEstudiantes] = useState([]);
const edit=(student)=>{
  setVisible("student");
  setloading(student);
}
  useEffect(() => {
    // Realiza una solicitud a tu API para obtener los datos de estudiantes
    fetch('/api/students')
      .then((response) => response.json())
      .then((data) => {
        // Verifica si la respuesta contiene datos válidos
        if (data && data.data && Array.isArray(data.data)) {
          setEstudiantes(data.data); // Almacena los datos en el estado local
        }
      })
      .catch((error) => {
        console.error('Error al obtener la lista de estudiantes:', error);
      });
  }, []);
  return (
    <table>
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
            {/* Agrega más celdas según tus datos */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default tableStudents