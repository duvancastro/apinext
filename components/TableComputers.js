/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Style from '../styles/table.module.css'

const TableComputers = ({ setloading, setVisible }) => {
  const [computadoras, setComputadoras] = useState([]);
  const [deleteComputer, setDeleteComputer] = useState('');

  const edit = (computer) => {
    setVisible("computer");
    setloading(computer);
  };

  const computerDelete = async () => {
    if (deleteComputer !== '') {
      const response = await fetch(`/api/computer?computerMac=${deleteComputer}`, {
        method: 'DELETE'
      });

      switch (response.status) {
        case 200:
          alert(`${response.status} COMPUTADORA ELIMINADA CON ÉXITO`);
          break;
        case 404:
          alert(`${response.status} LA COMPUTADORA NO EXISTE`);
          break;
        default:
          alert(`${response.status} ERROR EN EL SERVIDOR`);
          break;
      }
      setDeleteComputer('');
    }
  };

  useEffect(() => {
    computerDelete();
    fetch('/api/computer')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setComputadoras(data.data);
        }
      })
      .catch((error) => {
        console.error('Error al obtener la lista de computadoras:', error);
      });
  }, [deleteComputer]);

  return (
    <div className={Style.table}>
    <table >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Computer Number</th>
          <th scope="col">Room Number</th>
          <th scope="col">MAC Address</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {computadoras.map((computer, index) => (
          <tr key={computer.ID}>
            <th scope="row">{index + 1}</th>
            <td>{computer.computerNumber}</td>
            <td>{computer.computerRoom}</td>
            <td>{computer.computerMac}</td>
            <td>
              <button onClick={() => edit(computer)}>Edit</button>
            </td>
            <td>
              <button onClick={() => setDeleteComputer(computer.computerMac)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default TableComputers;
