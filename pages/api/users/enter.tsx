import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  console.log(req.body.email);
  res.status(200).end();
}
