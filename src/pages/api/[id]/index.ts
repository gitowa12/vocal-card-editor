import { supabase } from "@/features/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { notFound } from "next/navigation";

export default async function handler (req :NextApiRequest, res:NextApiResponse){

  const {id} = req.query;
  const body = req.body;

  switch(req.method){
    case "GET":
      const { data: getData, error: getError } = await supabase
        .from('quillData')
        .select('*')
        .eq("id",id)
        .single();

      if(getError){
        return res.status(500).json({error:getError.message});
      }
      if(!getData ){
        return notFound();
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
      if(!putData ){
        return notFound();
      }
  
      return res.status(200).json(putData);

    case "DELETE":
      console.log("DELETE Successed")
      return res.status(200).json({ data: 'DELETE Successed' });
  }
}