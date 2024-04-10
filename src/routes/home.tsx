import { styled } from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-y: scroll;
  grid-template-rows: 0fr 1fr 5fr;
  margin: 0 25px 0 0;
`;

const Title = styled.h1`
  font-size: 42px;
  text-align: center;
`

export default function Home() {
  return (
    <Wrapper>
      <Title>지원에게 말해줘</Title>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}
