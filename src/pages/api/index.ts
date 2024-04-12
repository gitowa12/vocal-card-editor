

import { supabase } from "@/util/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req :NextApiRequest, res:NextApiResponse){
  
  const body = req.body;
  const jwt = req.headers.authorization;

  switch(req.method){

    case "GET":
      const { data:getData, error:getError } = await supabase
      .from('editorData')
      .select('*')
      .order('updated_at', { ascending: false });
      if(getError){
        return res.status(500).json({error:getError.message});
      }

      return res.status(200).json(getData);


    case "POST":
      const { data:postData, error:postError } = await supabase
      .from('editorData')
      .insert([
        { quillContents:null ,
          iconsData:null
        },
      ])
      .select()

      if(postError){
        return res.status(500).json({error:postError.message});
      }

      return res.status(201).json(postData);

              
  }
}


