import { getRegister } from "./logicas/logicaRegister";

export default async function handler(req,res){

    switch(req.method){
        case'GET':
        const result = await getRegister();
        getResponse(result,res);


    }
}

function getResponse(result,res){
    switch(result.status){
        case 200:
            res.status(200).json({message:result.message,data:result.data});
            break;
              default:
                res.status(500).json({ error: `${result.message}` });
                break;
    }

}