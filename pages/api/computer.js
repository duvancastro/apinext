import { deleteComputer, getComputer, getComputerRoom, getComputers, patchComputer, postComputer } from "./logicas/logicaComputer"
export default async function handler(req, res) {
  const data = req.body
  console.log(data)
  const computerMac = req.query.computerMac
  const computerRoom=req.query.computerRoom
  const  computerMacBody  = data.computerMac
  let result = ""
  switch (req.method) {
    case "POST":
      result = await postComputer(data)
      postResponse(result, res)
      break
    case "GET":
      if (computerMac) {
        result = await getComputer(computerMac)
      }else if(computerRoom){
        result = await getComputerRoom(computerRoom)
      } else {
        result = await getComputers()
      }
      getResponse(result, res)
      break
    case "PATCH":
      if (computerMacBody) {
        result = await patchComputer(data)
        patchResponse(result, res)
      } else {
        res.status(500).json({ error: "No 1se pudo actualizar el recurso" })
      } 
      break
    case "DELETE":
      if (computerMac) {
        result = await deleteComputer(computerMac)
        deleteResponse(result, res)
      } else {
        res.status(500).json({ error: "No se pudo eliminar el recurso" })
      }
      break
    default:
      res.status(500).json({ error: "No se pudo actualizar el recurso" })
      break
  }
}
const postResponse = (result, res) => {
  switch (result.status) {
    case 201:
      res.status(201).json({ message: `${result.message}` })
      break
    case 409:
      res.status(409).json({ message: `${result.message}` })
      break

    default:
      res.status(500).json({ message: `${result.message}` })
      break
  }
}
const patchResponse = (result, res) => {
  switch (result.status) {
    case 200:
      res.status(200).json({ message: `${result.message}` })
      break
    case 400:
      res.status(400).json({ message: `${result.message}` })
      break

    default:
      res.status(500).json({ message: `${result.message}` })
      break
  }
}
const deleteResponse = (result, res) => {
  switch (result.status) {
    case 200:
      res.status(200).json({ message: `${result.message}` })
      break
    case 404:
      res.status(404).json({ message: `${result.message}` })
      break

    default:
      res.status(500).json({ message: `${result.message}` })
      break
  }
}
const getResponse = (result, res) => {
  switch (result.status) {
    case 200:
      res.status(200).json({ message: `${result.message}`,data:result.data})
      break
    case 400:
      res.status(400).json({ message: `${result.message}` })
      break
    default:
      res.status(500).json({ message: `${result.message}` })
      break
  }
}
