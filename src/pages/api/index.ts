import { supabase } from "@/features/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req :NextApiRequest, res:NextApiResponse){
  let { data, error } = await supabase
  .from('quillData')
  .select('*')
  if(error){
    return res.status(500).json({error:error.message});
  }
//   console.log('Data:', data);
// console.log('Error:', error);
  return res.status(200).json(data);
  // return res.status(200).json(data);a
}