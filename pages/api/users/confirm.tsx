import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType }  from "@/libs/server/withHandler";
import {withIronSessionApiRoute} from "iron-session/next"
import { withApiSession } from '@/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  console.log(req.session)
  const { token } = req.body;
  const tokenExist = await client.token.findUnique({ // 토큰이 존재하는지 확인함
    where: {
      payload: token,
    },
  })
  if(!tokenExist) return res.status(404).end()
  req.session.user = {
    id: tokenExist.userId,
  }
  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: tokenExist.userId, // 토큰이 존재하면 해당 토큰을 삭제함
    }
  }) // 토큰을 삭제함
  res.json({ok:true})
}


export default withApiSession((withHandler("POST", handler)));

