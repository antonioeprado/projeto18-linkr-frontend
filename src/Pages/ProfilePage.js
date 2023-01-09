import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Constants/Header";
import Post from "../Components/Post/Post";
import Trending from "../Components/TimelinePage/Trending";
import {
  PageStyle,
  PageTitle,
  StyledMain,
} from "../Components/Constants/PageTheme";
import { NoPostsMessage } from "../Components/Post/PostStyledComponents";
import { AuthContext } from "../Components/Context/authContext";
import useWindowDimensions from "../Components/Services/windowDimensions";
import Searchbox from "../Components/Constants/Searchbox";
import { TooltipProvider } from "react-tooltip";
import jwtDecode from "jwt-decode";

function ProfilePage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const { width } = useWindowDimensions();
  const myUser = jwtDecode(token);
  console.log(user);

  useEffect(() => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(`http://localhost:4000/user/${id}`, config)
      .then((res) => {
        if (res.data.posts[0].id === null) {
          delete res.data.posts;
        }
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <Header />
      <TooltipProvider>
        <StyledMain width={width}>
          <PageStyle>
            {width < 840 && <Searchbox />}
            <PageTitle>{user?.username}'s posts</PageTitle>
            {user?.posts ? (
              user.posts.map((post, index) => (
                <Post
                  key={index}
                  myUser={myUser}
                  token={token}
                  username={user.username}
                  userImage={user.userImage}
                  userId={Number(id)}
                  post={post}
                />
              ))
            ) : (
              <NoPostsMessage>
                <h1>There are no posts yet.</h1>
                <button onClick={() => window.location.reload()}>Reload</button>
              </NoPostsMessage>
            )}
          </PageStyle>
          <Trending />
        </StyledMain>
      </TooltipProvider>
    </>
  );
}

export default ProfilePage;
