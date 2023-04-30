import React from "react";
import { useForm } from "react-hook-form";

// Less code (c)
// Better validation
// Better Erros (set, clear, display)
// Have control over inputs
// Dont deal with events (c)
// Easier Inputs (c)

const Form = () => {
  const { register } = useForm();
  // register : input 을 등록하는 함수
  // watch : input(value)을 감시하는 함수

  return (
    <form>
      <input
        {...register("username")}
        type="text"
        placeholder="User name"
        required
      />
      <input
        {...register("email")}
        type="email"
        placeholder="User email"
        required
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">계정 만들기</button>
    </form>
  );
};

export default Form;
