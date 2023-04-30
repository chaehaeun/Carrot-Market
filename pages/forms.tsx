import React from "react";
import { useForm, FieldErrors } from "react-hook-form";

// Less code (c)
// Better validation
// Better Erros (set, clear, display)
// Have control over inputs
// Dont deal with events (c)
// Easier Inputs (c)

interface LoginForm {
  username: string;
  email: string;
  password: string;
}

const Form = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
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
        {...register("email", { required: "Email is required!" })}
        type="email"
        placeholder="User email"
      />
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
