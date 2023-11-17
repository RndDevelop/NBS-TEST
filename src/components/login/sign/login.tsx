import { useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";

import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../../createAccount/auth-components";
import { AppThunkDispatch } from "../../store/store";
import { setUser } from "../../store/user";
import { loginUser } from "../../api/userLogin";
import { useDispatch } from "react-redux";
import { useQuery, useMutation } from "react-query";
import { signQuery } from "../../api/authApi";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userId, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppThunkDispatch>();
  const appDispatch = useDispatch();

  //인풋란 데이터 가져오기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "userId") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // 로그인 리덕스 thunk , persist 사용
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    if (userId === "" || password === "") return;

    try {
      dispatch(loginUser({ userId, password })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          // appDispatch(setUser({ userId: userId, isLoading: true }));
          navigate("/");
        }
      });
    } catch (rejectedValueOrSerializedError) {
      console.log("error", rejectedValueOrSerializedError);
    }
  };

  //리엑트 쿼리
  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError("");
  //   if (isLoading || email === "" || password === "") return;
  //   try {
  //     //axios 비동기 통신
  //     signQuery("/login", { email: email, password: password });
  //     navigate("/");
  //   } catch (rejectedValueOrSerializedError) {}
  // };

  return (
    <Wrapper>
      <Title>Log into 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="userId"
          value={userId}
          placeholder="Email"
          type="userId"
        />
        <Input
          onChange={onChange}
          value={password}
          name="password"
          placeholder="Password"
          type="password"
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account?{" "}
        <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
