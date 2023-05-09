import {withIronSessionApiRoute} from "iron-session/next"

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOption = {
  cookieName: "carrotsession",
  password: process.env.SECRET_COOKIE_PASSWORD!,

}

export function withApiSession(fn:any) {
 return withIronSessionApiRoute(fn, cookieOption) 
}