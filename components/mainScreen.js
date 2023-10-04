import React from 'react'
import TableStudents from './tableStudents'
const mainScreen = ({setloading,setVisible}) => {
  return (
    <div>
        <TableStudents setloading={setloading} setVisible={setVisible}/>
    </div>
  )
}

export default mainScreen