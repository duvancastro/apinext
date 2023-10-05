import React from 'react'
import TableStudents from './TableStudents'
const MainScreen = ({setloading,setVisible}) => {
  return (
    <div>
        <TableStudents setloading={setloading} setVisible={setVisible}/>
    </div>
  )
}
export default MainScreen