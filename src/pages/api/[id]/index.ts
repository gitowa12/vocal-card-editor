import { supabase } from "@/util/supabaseClient";
import { isValidUUID } from "@/util/isValidUUID";
import { NextApiRequest, NextApiResponse } from "next";
import { notFound } from "next/navigation";

export default async function handler (req :NextApiRequest, res:NextApiResponse){

  const {id} = req.query;
  const body = req.body;

  switch(req.method){
    case "GET":

      const { data: getData, error: getError } = await supabase
        .from('editorData')
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

      const parsedBody = JSON.parse(body)
      console.log('parsedBody',parsedBody)

      const quillData = JSON.stringify(parsedBody.quillData);
      // console.log("quillData",quillData)
      const iconsData = JSON.stringify(parsedBody.icons);
      const userId = parsedBody.userId;
      const title = parsedBody.title;
      const artist = parsedBody.artist;
      // console.log("title & artist",{titleData,artistData})
        
      const { data: putData, error: putError } = await supabase
        .from('editorData')
        .update({ 
          // 'user_id': userId,
          'quillContents': quillData,
          'iconsData':iconsData,
          'title':title,
          'artist':artist,
         })
        .eq('id', id)
        .select();
          
      if(putError){
        return res.status(500).json({error:putError.message});
      } 

      return res.status(200).json(putData);

    case "DELETE":
      
      const { error :deleteError } = await supabase
        .from('editorData')
        .delete()
        .eq('id', id)

        if(deleteError){
          return res.status(500).json({error:deleteError.message});
        }
              
        return res.status(200).json({ data: 'DELETE Successed' });
  }
}