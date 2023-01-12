import NoPostsMessage from "../Components/NoPostsMessage/NoPostsMessage";
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";
import LoadingMessage from "../Components/LoadingMessage/LoadingMessage";
import Post from "../Components/TimelinePage/Post";

export default function verifyIfPosts(posts, token, modals, states ) {

  console.log(token)

  const {setOpenDeleteModal, openDeleteModal, setOpenRepostModal, openRepostModal} = modals
  const {setDisabled, disabled, loading, error, edit, setEdit, setPostToDelete} = states

  if (posts && !loading) {
    if (posts.length > 0) {
      return posts.map((post, index) => (
        <Post
        setPostToDelete={setPostToDelete}
          setOpenDeleteModal={setOpenDeleteModal}
          modals={{ setOpenDeleteModal, setOpenRepostModal }}
          edition={{ edit, setEdit }}
          disable={{ setDisabled, disabled }}
          key={index}
          token={token}
          user={{
            userId: post.userId,
            userName: post.userName,
            userImage: post.userImage,
          }}
          content={{
            postId: post.postId,
            likesCount: post.likesCount,
            likedBy: post.likedBy,
            postDescription: post.postDescription,
            url: post.url,
            repostsCount: post.repostsCount,
            commentsCount: post.commentsCount,
          }}
          metadata={{
            linkTitle: post.linkTitle,
            linkDescription: post.linkDescription,
            linkUrl: post.linkUrl,
            linkImage: post.linkImage,
          }}
        />
      ));
    }
    return <NoPostsMessage />;
  } else if (error) {
    return <ErrorMessage />;
  } else if (loading) {
    return <LoadingMessage />;
  }
}
