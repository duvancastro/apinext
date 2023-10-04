import pool from "../../../components/conexion/bd"

async function existing(computerMac){
  const checkComputerSQL = `SELECT * FROM computer WHERE computerMac ='${computerMac}'`;
  // Obten una conexión del pool
  const connection = await pool.getConnection();
  const existingComputer = await connection.query(checkComputerSQL);
  // Libera la conexión de vuelta al pool
  connection.release();
  return existingComputer;
}
const postComputer = async (data) => {
  try {
    //JSON.parse()
    const inf = JSON.parse(data);
    console.log(inf)
    const existingComputer = await existing(inf.computerMac);
    if (existingComputer[0].length > 0) {
      console.log("Ya existe un computador con este mac")

      return {
        status: 400,
        message: "Ya existe un computador con este mac",
      };
    } else {
      const connection = await pool.getConnection();
      const sql =
        "INSERT INTO `computer` (`computerNumber`, `computerRoom`, `computerMac`) VALUES (?,?,?)";
      const values = [inf.computerNumber, inf.roomNumber, inf.computerMac];
      const result = await connection.query(sql, values);
      console.log(result)
      connection.release();
      return {
        status: 201,
        message: `Computador registradocon exito`,
      };
    }
  } catch (err) {
    throw { status: 500, message: `Error : ${err}` };
  }
};
const deleteComputer=async(computerMac)=>{
  try {
    const connection = await pool.getConnection();
    const existingComputer = await existing(computerMac);
    connection.release();
    if (existingComputer[0].length > 0) {
      const sql = `DELETE FROM computer WHERE computerMac ='${computerMac}'`;
      const result = await connection.query(sql);
      connection.release();
      return {
        status: 200,
        message: `Computador eliminado con exito`,
      };
    } else {
      return {
        status: 404,
        message: "No existe el computador",
      };
    }
  } catch (err) {
    throw { status: 500, message: `Error : ${err}` };
  }
}
const getComputers = async () => {
  try {
    // Obten una conexión del pool
    const connection = await pool.getConnection();
    const result=await connection.query(`SELECT * FROM computer`)
    // Libera la conexión de vuelta al pool
    connection.release();
    return {
      status: 200,
      message: `Lista de computadores obtenida con éxito`,
      data: result[0],
    };
  } catch (err) {
    throw { status: 500, message: `Error : ${err}` };
  }
};
const getComputer= async (computerMac)=>{
  console.log(`ComputerMac`)
  try{
    const existingComputer= await existing(computerMac)
    if(existingComputer){

      const connection=await pool.getConnection()
      const result=await connection.query(`SELECT * FROM computer WHERE computerMac = '${computerMac}'`)
      connection.release()
      return {
      status:200,
      message:`computer obtenido con exito`,
      data:result[0]  
    }
  }else{
    return {
      status:404,
      message:"No existe el computador"
  }
  }
}catch(err){
    throw { status: 500, message: `Error : ${err}` };
  }
}
const getComputerRoom = async(computerRoom)=>{
  try {
    const connection=await pool.getConnection()
    const result=await connection.query(`SELECT * FROM computer WHERE computerRoom = '${computerRoom}'`)
    connection.release()
    return {
      status:200,
      message:`Lista de computer por sala obtenido con exito`,
      data:result[0]  
    }
  } catch (err) {
    throw { status: 500, message: `Error : ${err}` };
    
  }
}

const patchComputer = async (data) => {
  try {
    //json.parse()
    const inf=data
    const connection=await pool.getConnection()
    const existingComputer= await existing(inf.computerMac)
    connection.release()
    if (existingComputer[0].length > 0) {
      const sql =`UPDATE computer SET ${Object.entries(inf).reduce(
        (acc, [key, value]) =>
        key!=='computerMac'?
        acc.length>0 ?
        `${acc}, ${key} = ${value}`:
        `${key} = ${value}`:acc,''
      )} WHERE computerMac = '${inf.computerMac}'`
      const result = await connection.query(sql);
      connection.release();
      return {
        status: 200,
        message: `Computador actualizado con éxito`,
      };
    }else{
      return {
        status:404,
        message:"No existe el computador"
      }
    }
  } catch (err) {
    throw { status: 500, message: `Error : ${err}` };
    
  }
}



export{ postComputer,deleteComputer,getComputers,getComputer, patchComputer,getComputerRoom};
