import pool from "../../../components/conexion/bd"

const getRegister = async() => {
    try {
        // Obten una conexión del pool
        const connection = await pool.getConnection();
        // Ejecuta la consulta dentro de la conexión
        const sql = "SELECT * FROM `register`";
        const result = await connection.query(sql);
        // Libera la conexión de vuelta al pool
        connection.release();
        console.log(result[0]);
        return {
            status: 200,
            message: `Registro obtenido con éxito`,
            data: result[0],
        };
        } catch (err) {
        throw { status: 500, message: `ERROR interno en el server: ${err}` };
    }

}

export {getRegister}