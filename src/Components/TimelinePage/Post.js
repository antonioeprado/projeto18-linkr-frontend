import styled from "styled-components";
import { FiHeart } from "react-icons/fi";
import PostLink from "./PostLink";
import axios from "axios";
import { useEffect, useState } from "react";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

export default function Post({ loading, setLoading }) {
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:4000/all-posts")
			.then((a) => {
				console.log(a.data);
				setLoading(false);
				setPosts(a.data);
			})
			.catch((e) => {
				setLoading(false);
				setError(true);
				console.log(e);
			});
	}, [loading]);

	//https://linkr-api-9ik9.onrender.com/

	useEffect(() => {
		axios
			.get("http://localhost:4000/all-posts")
			.then((a) => {
				console.log(a.data);
				setLoading(false);
				setPosts(a.data);
			})
			.catch((e) => {
				setLoading(false);
				setError(true);
				console.log(e);
			});
	}, [loading]);

	return (
		<>
			{posts.length > 0 && !error && !loading && (
				<>
					{posts.map((e, i) => (
						<PostStyle key={i}>
							<LeftContainer>
								<UserProfilePicture
									alt='user-profile'
									src={e.userImage}
								/>
								<LikeIcon />
								<LikesCount>{e.likesCount} likes</LikesCount>
							</LeftContainer>
							<RightContainer>
								<UserName>{e.userName}</UserName>
								<Description>
									<ReactTagify
										tagStyle={tagStyle}
										tagClicked={(tag) =>
											navigate(`/hashtag/${tag.substring(1)}`)
										}>
										{e.postDescription}
									</ReactTagify>
								</Description>
								<PostLink
									linkTitle={e.linkInfo.linkTitle}
									linkDescription={e.linkInfo.linkDescription}
									linkUrl={e.linkInfo.linkUrl}
									linkImage={e.linkInfo.linkImage}
								/>
							</RightContainer>
						</PostStyle>
					))}
				</>
			)}
			{!error && loading && (
				<>
					<LoadingMessage>
						<div>
							<h1>Loading posts...</h1>
						</div>
					</LoadingMessage>
				</>
			)}
			{!error && !loading && posts.length < 1 && (
				<NoPostsMessage>
					<h1>There are no posts yet.</h1>
				</NoPostsMessage>
			)}
			{error && (
				<ErrorMessage>
					<div>
						<h1>ERROR</h1>
						<h2>
							An error occured while trying to fetch the posts, please refresh
							the page clicking the button down below.
						</h2>
						<button>Reload</button>
					</div>
				</ErrorMessage>
			)}
		</>
	);
}

const PostStyle = styled.div`
	height: 70vw;
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

const LoadingMessage = styled.div`
	margin-top: 25px;
	display: flex;
	width: 100%;
	justify-content: center;
	> div {
		height: 50px;
		width: 60%;
		border-radius: 15px;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		> h1 {
			font-family: "Lato";
			font-weight: 600;
			font-size: 18px;
		}
	}
`;

const ErrorMessage = styled.div`
	margin-top: 25px;
	font-family: "Lato";
	display: flex;
	justify-content: center;
	width: 100%;
	> div {
		height: 125px;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		> h1 {
			color: red;
			font-weight: 800;
			font-size: 20px;
			margin-bottom: 5px;
		}
		> h2 {
			font-size: 14px;
			margin-bottom: 10px;
			width: 90%;
			text-align: justify;
		}
		> button {
			background-color: #1877f2;
			border-radius: 5px;
			width: 112px;
			height: 22px;
			border: none;
			color: #ffffff;
			font-family: "Lato";
			font-weight: 700;
			font-size: 13px;
		}
	}
`;

const NoPostsMessage = styled.div`
	margin-top: 25px;
	display: flex;
	width: 100%;
	justify-content: center;
	> h1 {
		font-family: "Lato";
		font-weight: 600;
		font-size: 18px;
		color: #efefef;
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

const LikeIcon = styled(FiHeart)`
	margin-bottom: 12px;
	font-size: 22px;
`;

const LikesCount = styled.h2`
	text-align: center;
	font-size: 12px;
`;

const RightContainer = styled.div`
	display: flex;
	flex-direction: column;
	font-family: "Lato";
	width: 76.8%;
`;

const UserName = styled.h1`
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
