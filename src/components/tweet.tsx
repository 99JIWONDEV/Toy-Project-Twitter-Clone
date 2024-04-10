import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const ModifyButton = styled.button`
  background-color: grey;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const [isEditing, setIsEdting] = useState(false);
  const [editedTweet, setEditedTweet] = useState(tweet);
  const onDelete = async () => {
    const ok = confirm("정말 삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const onEdit = async () => {
    if (user?.uid !== userId) return;
    try {
      const tweetRef = doc(db, "tweets", id);
      await updateDoc(tweetRef, {
        tweet: editedTweet,
      });
      setIsEdting(false);
      alert("Tweet updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update tweet");
    }
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <>
            <DeleteButton onClick={onDelete}>삭제</DeleteButton> <ModifyButton onClick={() => setIsEdting(true)}>수정</ModifyButton>
          </>
        ) : null}
      </Column>

      <Column>{photo ? <Photo src={photo} /> : null}</Column>

      {isEditing && (
        <div>
          <textarea value={editedTweet} onChange={(event) => setEditedTweet(event.target.value)} style={{ width: "100%", minHeight: "100px", margin: "10px 0", backgroundColor: "black", color: "white", fontSize: "18px", padding: "5px" }} />
          <button onClick={onEdit} style={{ backgroundColor: "#ff8db1", color: "white", border: "none", borderRadius: "5px", fontSize: "12px", fontWeight: "600", padding: "5px 10px", cursor: "pointer" }}>
            저장
          </button>
          <button onClick={() => setIsEdting(false)} style={{ backgroundColor: "grey", color: "white", border: "none", borderRadius: "5px", fontSize: "12px", fontWeight: "600", padding: "5px 10px", cursor: "pointer", marginLeft:" 15px" }}>
            취소
          </button>
        </div>
      )}
    </Wrapper>
  );
}
