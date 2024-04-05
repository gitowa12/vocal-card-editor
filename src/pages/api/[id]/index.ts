import { supabase } from "@/features/supabaseClient";
import { isValidUUID } from "@/util/isValidUUID";
import { NextApiRequest, NextApiResponse } from "next";
import { notFound } from "next/navigation";

export default async function handler (req :NextApiRequest, res:NextApiResponse){

  const {id} = req.query;
  const body = req.body;

  if (!isValidUUID(id)) {
    return res.status(400).json({
      errorCode:"400",
      error: 'Invalid input syntax for type uuid.',
    });
  }

  switch(req.method){
    case "GET":

      const { data: getData, error: getError } = await supabase
        .from('quillData')
        .select('*')
        .eq("id",id)
        .single();

      if(getError){
        return res.status(500).json({errorCode:getError.code,error:getError.message});
      }
      
      if(!getData ){
        return res.status(404).json({errorCord:"404", message: "Not Found" });
      }

      return res.status(200).json(getData);

    case "PUT":
      
      const { data: putData, error: putError } = await supabase
        .from('quillData')
        .update({ 'contents': body })
        .eq('id', id)
        .select();
          
      if(putError){
        return res.status(500).json({error:putError.message});
      }

      return res.status(200).json(putData);

    case "DELETE":
      
      const { error :deleteError } = await supabase
        .from('quillData')
        .delete()
        .eq('id', id)

        if(deleteError){
          return res.status(500).json({error:deleteError.message});
        }
              
        return res.status(200).json({ data: 'DELETE Successed' });
  }
}