import React from 'react'
import TableStudents from './TableStudents'
import TableComputers from './TableComputers'
import Style from '../styles/mainScreen.module.css'
const MainScreen = ({setloading,setVisible,visibleTable,visible}) => {
  return (
    <div className={Style.mainCreen}>
      {visible==='Home'&&<div>
      <div>{visibleTable==='student'?'STUDENT':visibleTable==='computer'?'COMPUETER':''}</div>
        {visibleTable==='student'&&<TableStudents setloading={setloading} setVisible={setVisible} />}
        {visibleTable==='computer'&&<TableComputers setloading={setloading} setVisible={setVisible} />}
      </div>}
    </div>
  )
}
export default MainScreen