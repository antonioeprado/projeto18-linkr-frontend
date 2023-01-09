import styled from "styled-components";
import PostLink from "./PostLink";
import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {
  LoadingMessage,
  NoPostsMessage,
  ErrorMessage,
} from "./SmallComponents/AlternativeMessages";
import { AuthContext } from "../Context/authContext";
import { Tooltip, TooltipWrapper, TooltipProvider } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { LikeButton, LikedButton } from "./SmallComponents/LikeButtons";
import { TiPencil } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Post({ loading, setLoading, setIsOpen, setDeletePost, openModal}) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [edit, setEdit] = useState([]);
  const [editedDescription, setEditedDescription] = useState({});
  const { token } = useContext(AuthContext);
  const { userId } = jwtDecode(token);

  //https://linkr-api-9ik9.onrender.com/

  function handleLikedBy(arr) {
    let string;

    if (arr.find((e) => e.userId === userId)) {
      if (arr.length > 2) {
        string = `Você ${arr[arr.length - 1].username} e outras ${
          arr.length - 2
        } pessoas`;
        return string;
      }
      if (arr.length === 2) {
        string = `Você e ${arr[arr.length - 1].username} curtiram`;
        return string;
      } else {
        return (string = "Você curtiu");
      }
    }

    if (arr.length > 2) {
      string = `${arr[arr.length - 1].username} , ${
        arr[arr.length - 2].username
      } e outras ${arr.length - 2} pessoas`;
      return string;
    } else if (arr.length === 2) {
      string = `${arr[arr.length - 1].username} , ${
        arr[arr.length - 2].username
      } curtiram`;
      return string;
    } else {
      return (string = `${arr[arr.length - 1].username}, curtiu`);
    }
  }

  function sendNewDescription(e, postId) {
    e.preventDefault();
    console.log(postId);
    setLoading(true);

    const config = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJ1c2VyUGljdHVyZSI6Imh0dHBzOi8va2JpbWFnZXMxLWEuYWthbWFpaGQubmV0L2FmY2Q4NjUzLTNiMjctNDQyMy1iZWU5LTU3MGZiMTQ0MWFlZC8zNTMvNTY5LzkwL0ZhbHNlL3ByaWRlLWFuZC1wcmVqdWRpY2UtNzEuanBnIiwic2Vzc2lvbklkIjoxNTgsImlhdCI6MTY3MzIzMDMzNH0.poYNfisvv3a4b3b4kCuUXtIqH8yDVkkn4K04VN9ivn0`,
      },
      data: {
        description: editedDescription,
      },
    };
    axios(`http://localhost:4000/posts/${postId}`, config)
      .then((a) => {
        setLoading(false);
        setEdit([]);
        console.log(a.data);
      })
      .catch((e) => {
        console.log(e);
        setError(true)
        setLoading(false);
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/all-posts")
      .then((a) => {
        setLoading(false);
        setPosts(a.data);
        console.log(a.data);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  }, [loading, setLoading, liked, edit, posts]);

  console.log(posts);

  return (
    <>
      {posts.length > 0 && !error && !loading && (
        <>
          {posts.map((e, i) => (
            <TooltipProvider>
              <PostStyle key={i}>
                <LeftContainer>
                  <UserProfilePicture alt="user-profile" src={e.userImage} />
                  {e.likedBy.length > 0 && (
                    <>
                      {e.likedBy.find((l) => l.userId === userId) && (
                        <>
                          {
                            <LikedButton
                              setDisabled={setDisabled}
                              disabled={disabled}
                              token={token}
                              setLiked={setLiked}
                              liked={liked}
                              e={e}
                            />
                          }
                        </>
                      )}
                      {!e.likedBy.find((l) => l.userId === userId) && (
                        <>
                          {
                            <LikeButton
                              setDisabled={setDisabled}
                              disabled={disabled}
                              token={token}
                              setLiked={setLiked}
                              liked={liked}
                              e={e}
                            />
                          }
                        </>
                      )}
                    </>
                  )}
                  {e.likedBy.length < 1 && (
                    <>
                      {
                        <LikeButton
                          setDisabled={setDisabled}
                          disabled={disabled}
                          token={token}
                          setLiked={setLiked}
                          liked={liked}
                          e={e}
                        />
                      }
                    </>
                  )}
                  <TooltipWrapper tooltipId={e.id}>
                    <LikesCount>{e.likesCount} likes</LikesCount>
                  </TooltipWrapper>
                  <Tooltip
                    id={e.id}
                    content={handleLikedBy(e.likedBy)}
                    place="bottom"
                    className="example"
                  />
                </LeftContainer>
                <RightContainer>
                  <UserName>
                    {e.userId === userId && (
                      <>
                        <EditPencil
                          onClick={() => {
                            setEditedDescription(e.postDescription);
                            edit.includes(e.postId)
                              ? setEdit([])
                              : setEdit([...edit, e.postId]);
                          }}
                        />
                        <TrashCan onClick={() => {
                          openModal();
                          setIsOpen(true);
                          setDeletePost(e.postId);
                        }}/>
                      </>
                    )}

                    {e.userName}
                  </UserName>
                  {edit.includes(e.postId) && (
                    <form
                      onSubmit={(event) => sendNewDescription(event, e.postId)}
                    >
                      <EditDescription
                        disabled={loading}
                        name="description"
                        value={editedDescription}
                        onKeyDown={(e) =>
                          e.key === "Escape" ? setEdit([]) : ""
                        }
                        onChange={(e) => {
                          setEditedDescription(e.target.value);
                        }}
                      ></EditDescription>
                    </form>
                  )}
                  {!edit.includes(e.postId) && (
                    <Description>
                      <ReactTagify
                        tagStyle={{
                          color: "white",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                        tagClicked={(tag) =>
                          navigate(`/hashtag/${tag.substring(1)}`)
                        }
                      >
                        {e.postDescription}
                      </ReactTagify>
                    </Description>
                  )}

                  <PostLink
                    linkTitle={e.linkTitle}
                    linkDescription={e.linkDescription}
                    linkUrl={e.linkUrl}
                    linkImage={e.linkImage}
                  />
                </RightContainer>
              </PostStyle>
            </TooltipProvider>
          ))}
        </>
      )}
      {!error && loading && <LoadingMessage />}
      {!error && !loading && posts.length < 1 && <NoPostsMessage />}
      {error && <ErrorMessage />}
    </>
  );
}

const PostStyle = styled.div`
  height: 232px;
  width: 100%;
  background-color: #171717;
  margin-top: 16px;
  display: flex;
  @media (min-width: 900px) {
    width: 611px;
    height: 276px;
    border-radius: 16px;
  }
`;

const LeftContainer = styled.div`
  margin-top: 17px;
  display: flex;
  flex-direction: column;
  width: 18.4%;
  align-items: center;
  color: white;
`;

const UserProfilePicture = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-top: 9px;
  margin-bottom: 17px;
  object-fit: cover;
`;

const LikesCount = styled.h2`
  text-align: center;
  font-size: 12px;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-family: "Lato";
  width: 76.8%;
`;

const UserName = styled.h1`
  position: relative;
  font-weight: 400;
  font-size: 17px;
  color: white;
  margin-top: 10px;
`;

const Description = styled.p`
  margin-top: 7px;
  font-weight: 400;
  font-size: 15px;
  color: #b7b7b7;
  line-height: 18px;
`;

const EditPencil = styled(TiPencil)`
  position: absolute;
  color: white;
  right: 25px;
  cursor: pointer;
  pointer-events: ${(props) => (props.isOpened ? "none" : "initial")};
`;

const TrashCan = styled(FaTrash)`
  color: white;
  position: absolute;
  right: 0;
  cursor: pointer;
`;

const EditDescription = styled.input``;
