import React from "react";
import { useForm, FieldErrors } from "react-hook-form";

// https://react-hook-form.com/api/useform/

interface LoginForm {
  username: string;
  email: string;
  password: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });
  // register : input 을 등록하는 함수
  // watch : input(value)을 감시하는 함수
  // handleSubmit : submit 이벤트를 처리하는 함수
  // 첫번째 인자로 form이 유효할 때 실행할 함수를 받음, 두번째 인자로 form이 유효하지 않을 때 실행할 함수를 받음
  // form이 유효할 때 실행할 함수는 form의 데이터를 인자로 받음

  const onValid = (data: LoginForm) => {
    console.log("valid");
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required!",
          minLength: {
            message: "Username should be longer than 5 chars.",
            value: 5,
          },
        })}
        type="text"
        placeholder="User name"
      />
      <input
        {...register("email", {
          required: "Email is required!",
          validate: {
            // validate : 유효성 검사를 할 수 있는 함수를 받음
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed!",
          },
        })}
        type="email"
        placeholder="User email"
        className={`${Boolean(errors.email?.message) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      {/* errors.email이 존재하면 errors.email.message를출력 */}
      <input
        {...register("password", { required: "Password is required!" })}
        type="password"
        placeholder="Password"
      />
      <button type="submit">계정 만들기</button>
    </form>
  );
};

export default Form;
