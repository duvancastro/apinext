import {createStudent, deleteStudent, patchStudent} from "./logicas/logicaStudent";
import {getStudents} from "./logicas/logicaStudent";
import { getStudentIDnumber } from "./logicas/logicaStudent";
export default async function handler(req, res) {
  const data = req.body;
  const IDnumberBody=data
const {IDnumber}=req.query

  switch(req.method){
    case'POST':
    const result = await createStudent(data);
    postResponse(result,res);
    break;
    case'GET':
    console.log(IDnumber)
    if (IDnumber) {
      const result= await getStudentIDnumber(IDnumber)
      getResponse(result,res)
    } else {
      const result = await getStudents();
      getResponse(result,res);
    }
    break;
    case'PATCH':
    
    if(IDnumberBody){
    const result = await patchStudent(data);
    patchResponse(result,res)
    }else{
      res.status(500).json({ error: "No se pudo actualizar el estudiante" });
    }
  
    break;
    case'DELETE':
    if(IDnumber.length>0){
      const result = await deleteStudent(IDnumber);
      deleteResponse(result,res)
    }
    else{
      res.status(500).json({ error: "No se pudo eliminar el estudiante" });
    }
    default:
      res.status(500).json({ error: "Method not allowed" });
      break;


  }}

  function deleteResponse(result,res){
    switch(result.status){
      case 200:
        res.status(200).json({message:result.message});
        break;
        case 404:
          res.status(404).json({ message: `el estudiante no existe ` });
        case 500:
          res.status(500).json({ error: `${result.message}` });
          break;
          default:
            res.status(500).json({ error: `${result.message}` });
            break;
    }
  }
function patchResponse(result,res){
  switch(result.status){
    case 200:
      res.status(200).json({message:result.message,data:result.data});
      break;
      case 500:
        res.status(500).json({ error: `${result.message}` });
        break;
        default:
          res.status(500).json({ error: `${result.message}` });
          break;
  }
}
function getResponse(result,res){
  switch(result.status){
    case 200:
      res.status(200).json({message:result.message,data:result.data});
      break;
      case 500:
        res.status(500).json({ error: `${result.message}` });
        break;
        default:
          res.status(500).json({ error: `${result.message}` });
          break;
  }
}
function postResponse(result,res) {
  switch (result.status) {
    case 201:
      res.status(201).json({ message: result.message });
      break;
    case 409:
      res.status(409).json({ message: result.message });
      break;

    default:
      res.status(500).json({ message: result.message });
      break;
  }
}
