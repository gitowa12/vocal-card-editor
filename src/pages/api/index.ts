import { supabase } from "@/features/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req :NextApiRequest, res:NextApiResponse){
  const body = req.body;

  switch(req.method){

    case "GET":
      const { data:getData, error:getError } = await supabase
      .from('quillData')
      .select('*')
      if(getError){
        return res.status(500).json({error:getError.message});
      }

      return res.status(200).json(getData);


    case "POST":
      const { data:postData, error:postError } = await supabase
      .from('quillData')
      .insert([
        { contents:null },
      ])
      .select()

      if(postError){
        return res.status(500).json({error:getError.message});
      }

      return res.status(201).json(postData);

              
  }
}


