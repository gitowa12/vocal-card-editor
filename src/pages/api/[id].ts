import { supabase } from "@/features/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { notFound } from "next/navigation";

export default async function handler (req :NextApiRequest, res:NextApiResponse){

  const {id} = req.query;
  
  let { data, error } = await supabase
  .from('quillData')
  .select('*').eq("id",id).single();
  if(error){
    return res.status(500).json({error:error.message});
  }
if(!data ){
  notFound()
}

  return res.status(200).json(data);

}