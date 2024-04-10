import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('')
    console.log(name, email, password);

    if (isLoading || name === "" || email==="" || password ==="") return;
    try {
      setLoading(true)
      const credentials = await createUserWithEmailAndPassword(auth, email, password)
      console.log(credentials.user)
      await updateProfile(credentials.user, {
        displayName: name
      })
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
  return (
    <Wrapper>
      <Title>회원가입</Title>
      <Form onSubmit={onSubmit}>
        <Input onChange={onChange} name="name" value={name} placeholder="이름" type="text" required />
        <Input onChange={onChange} name="email" value={email} placeholder="이메일" type="email" required />
        <Input onChange={onChange} name="password" value={password} placeholder="비밀번호" type="password" required />
        <Input onChange={onChange} type="submit" value={isLoading ? "Loading..." : "계정 만들기"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 있으신가요?{" "}  <Link to="/login">로그인 &rarr; </Link>
      </Switcher>
      <GithubButton/>
    </Wrapper>
  );
}
