import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import smtpTransport from "@/libs/server/email";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body; // 요청 바디에서 email과 phone을 가져옴
  const user = phone ? { phone: phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false, error: "No user info" });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid : process.env.TWILIO_MESSAGE_SERVICE_SID,
    //   to : process.env.PHONE_NUMBER!,
    //   // !는 해당 변수가 null이 아님을 확신할 때 사용함
    //   body : `Your Carrot verification code is ${payload}`,
    // })
    // console.log(message)
  } else if (email) {
    // const mailOptions = {
    // from: process.env.MAIL_ID,
    // to: email,
    // subject: "Nomad Carrot Authentication Email",
    // text: `Authentication Code : ${payload}`,
    // };
    // const result = await smtpTransport.sendMail(
    //     mailOptions,
    //     (error, responses) => {
    //       if (error) {
    //         console.log(error);
    //         return null;
    //       } else {
    //         console.log(responses);
    //         return null;
    //       }
    //     }
    //   );
    //   smtpTransport.close();
    //   console.log(result);
  }

  return res.json({
    ok: true,
  }); // 200 OK 응답을 반환
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });

// pscale connect carrot-market
// antmsqlqjsdmf16wkflsk?
