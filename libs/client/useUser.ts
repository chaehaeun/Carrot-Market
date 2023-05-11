import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
import useSWR from 'swr';

export default function useUser() {
  const router = useRouter();
  const {data,error} = useSWR("api/user/me");
  // data가 있으면 로그인이 되어있는 상태
  // data가 없으면 로그인이 안되어있는 상태
  // 로그인이 되어있는 상태에서 로그인 페이지로 가면 로그인 페이지가 아닌 메인 페이지로 이동

  useEffect(() => {
    if(data && !data.ok) {
      router.push("/enter");
    }
  }, [data, router]);

  return {user : data?.profile, isLoading: !error && !data};
}

