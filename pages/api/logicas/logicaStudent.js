import pool from "../../../components/conexion/bd";
async function existing(IDnumber) {
  const checkStudentSQL = "SELECT * FROM `students` WHERE `IDnumber` = ?";
  const checkStudentValues = [IDnumber];
  // Obten una conexión del pool
  const connection = await pool.getConnection();
  const existingStudent = await connection.query(
    checkStudentSQL,
    checkStudentValues
  );
  // Libera la conexión de vuelta al pool
  connection.release();
  return existingStudent;
}
const createStudent = async (data) => {
  try {
    // JSON.parse(
    const inf = JSON.parse(data)

    // Obten una conexión del pool
    const connection = await pool.getConnection();
    const existingStudent = await existing(inf.IDnumber);
    connection.release();

    if (existingStudent[0].length > 0) {
      return { status: 409, message: "El estudiante ya existe" };
    } else {
      // Ejecuta la consulta dentro de la conexión
      const sql =
        "INSERT INTO `students` (`name`, `lastName`, `IDnumber`) VALUES (?,?,?)";
      const values = [inf.name, inf.lastname, inf.IDnumber];
      const result = await connection.query(sql, values);

      // Libera la conexión de vuelta al pool
      connection.release();
      console.log(result[0].insertId);
    
      return {
        status: 201,
        message: `Estudiante creado con éxito`,
      };
    }
  } catch (err) {
    console.error(`Error al crear el estudiante: ${err}`);
    throw { status: 500, message: `ERROR interno en el server: ${err}` };
  }
};
const getStudents = async () => {
  try {
    // Obten una conexión del pool
    const connection = await pool.getConnection();
    // Ejecuta la consulta dentro de la conexión
    const sql = "SELECT * FROM `students`";
    const result = await connection.query(sql);
    // Libera la conexión de vuelta al pool
    connection.release();
    console.log(result[0]);
    return {
      status: 200,
      message: `Lista de estudiantes obtenida con éxito`,
      data: result[0],
    };
  } catch (err) {
    console.error(`ERROR interno en el server:: ${err}`);
    throw { status: 500, message: `ERROR interno en el server: ${err}` };
  }
};
const getStudentIDnumber = async (IDnumber) => {
  try {
    console.log(`entro`);
    // Obten una conexión del pool
    const connection = await pool.getConnection();
    // Ejecuta la consulta dentro de la conexión
    const sql = "SELECT * FROM `students` WHERE `IDnumber` =?";
    const values = [IDnumber];
    const result = await connection.query(sql, values);
    // Libera la conexión de vuelta al pool
    connection.release();
    console.log(result[0]);
    return {
      status: 200,
      message: `Estudiante obtenido con éxito`,
      data: result[0],
    };
  } catch (err) {
    console.error(`ERROR interno en el server:: ${err}`);
    throw { status: 500, message: `ERROR interno en el server: ${err}` };
  }
};
const patchStudent = async (data) => {
  try {
    // Obten una conexión del pool
    const connection = await pool.getConnection();
    const inf = JSON.parse(data)
    console.log(inf);
    const existingStudent = await existing(inf.IDnumber);
    console.log(`existingStudent: ${existingStudent}`);
    if (existingStudent[0].length > 0) {
      const sql = `UPDATE students SET ${Object.entries(inf).reduce(
        (acc, [key, value]) =>
          key !== "IDnumber"
            ? acc.length > 0
              ? `${acc}, ${key} = '${value}'`
              : `${key} = '${value}'`
            : acc,
        ""
      )} WHERE IDnumber = ${inf.IDnumber}`;

      console.log(sql);

      const update = await connection.query(sql);
      // Libera la conexión de vuelta al pool
      connection.release();
      console.time(update);
      console.timeEnd(update);
      return {
        status: 200,
        message: `Estudiante actualizado con éxito`,
      };
    } else {
      console.log(`Estudiante no existe`);
      connection.release();
      return { status: 404, message: "El estudiante no existe" };
    }
  } catch (err) {
    console.error(`ERROR interno en el server:: ${err}`);
    throw { status: 500, message: `ERROR interno en el server: ${err}` };
  }
};
const deleteStudent = async (IDnumber) => {
  try {
    // Obten una conexión del pool
    const connection = await pool.getConnection();
    const existingStudent = await existing(IDnumber);
    connection.release();
    if (existingStudent[0].length > 0) {
      const sql = "DELETE FROM `students` WHERE `IDnumber` =?";
      const values = [IDnumber];
      const result = await connection.query(sql, values);
      connection.release();
      return {
        status: 200,
        message: `Estudiante eliminado con éxito`,
      };
    } else {
      console.log(`Estudiante no existe, `);
      return { status: 404, message: "El estudiante no existe" };
    }
  } catch (err) {
    console.error(`ERROR interno en el server:: ${err}`);
    throw { status: 500, message: `ERROR interno en el server: ${err}` };
  }
};
export {
  createStudent,
  getStudents,
  getStudentIDnumber,
  patchStudent,
  deleteStudent,
};
