import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined; // global.client의 타입을 지정
}

const client = global.client || new PrismaClient(); // global.client가 없으면 새로운 PrismaClient를 생성
// ReferenceError: global is not defined
// global은 Node.js에서 전역 객체를 의미하는데, 브라우저에서는 global이 없다.

if (process.env.NODE_ENV === "development") global.client = client; // 개발 환경일 때 global.client에 client를 할당

export default client; // client를 export
