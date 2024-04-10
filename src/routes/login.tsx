import { useState } from "react";
import { auth } from "../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Password, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('')

    if (isLoading || email==="" || password ==="") return;
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (e) {
      //setError
      if (e instanceof FirebaseError){
        setError(e.message)
      }
    } finally {
      setLoading(false);
    }
  };
  const passwordReset = () => {
    sendPasswordResetEmail(auth, email)
      try{
        {alert("비밀번호 변경 메일을 보내드렸습니다.")}
      }catch(e){
        setError("등록되지 않은 사용자입니다.")
      }
  }
  return (
    <Wrapper>
      <Title>지원에게 말해줘!</Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name="email" value={email} placeholder="이메일" type="email" required />
        <Input onChange={onChange} name="password" value={password} placeholder="비밀번호" type="password" required />
        <Input onChange={onChange} type="submit" value={isLoading ? "Loading..." : "Login"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 없으신가요?{" "} <Link to="/create-account">회원가입 &rarr;</Link>
      </Switcher>
      <Password onClick={passwordReset}>
        비밀번호를 잊으셨나요?
      </Password>
      <GithubButton/>
    </Wrapper>
  );
}
