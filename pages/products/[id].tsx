import type { NextPage } from "next";
import Button from "../../components/button";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useSWR, { mutate, useSWRConfig } from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import useUser from "@/libs/client/useUser";

interface ProductWithUser extends Product {
  // Product의 모든 필드도 가지고, user라는 User 타입 필드를 하나 더 가지게 됨
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relateProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );

  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);

  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...data, isLiked: !data.isLiked }, false); // 유저에게 미리 결과를 보여주고 서버로 요청을 보내는 것
    // mutate(
    //   "/api/users/me",
    //   (prev: any) => {
    //     ok: !prev.ok;
    //   },
    //   false
    // ); // 이 키 값을 가진 데이터를 변경하겠다는 의미

    // 해당 화면에서 얻은 데이터만 변경하기를 원한다면, bound mutate를 사용하면 되고
    // 다른 화면의 데이터를 변경하기를 원한다면, unbound mutate를 사용해야 함
    // 만약 캐시 데이터를 변경하고 싶은게 아니라, 다시 요청해서 불러오고 싶다면 키 값을 제외하고 나머지 인자를 전부 지워버리면 됨, 단순히 refetch하겠다는 말
    toggleFav({});
  };

  return (
    <Layout canGoBack>
      <div className="px-4 py-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex items-center py-3 space-x-3 border-t border-b cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.product?.user?.name}
                {/* user를 포함하고 있지 않기 때문에 interface를 extend 해주지 않으면 안됨 */}
              </p>
              <Link
                href={`/users/profiles/${data?.product?.user?.name}`}
                className="text-xs font-medium text-gray-500"
              >
                View profile &rarr;
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <span className="block mt-3 text-2xl text-gray-900">
              ${data?.product?.price}
            </span>
            <p className="my-6 text-gray-700 ">{data?.product?.description}</p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                onClick={onFavClick}
                type="button"
                className={cls(
                  "flex items-center justify-center p-3 hover:bg-gray-100 rounded-md",
                  data?.isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400 hover:text-gray-500"
                )}
              >
                {data?.isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                )}
                <span className="sr-only">좋아요 버튼</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="grid grid-cols-2 gap-4 mt-6 ">
            {data?.relateProducts?.map((product) => (
              <div key={product.id}>
                <Link
                  href={`/products/${product.id}`}
                  className="w-full h-56 mb-4 bg-slate-300"
                />
                <Link href={`/products/${product.id}`}>
                  <h3 className="-mb-1 text-gray-700">{product.name}</h3>
                </Link>
                <span className="text-sm font-medium text-gray-900">
                  ${product.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
