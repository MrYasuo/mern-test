import { useContext, MouseEvent, useState, useRef, useEffect } from "react";
import { AppContext } from "../contexts";

export default function Home() {
	const { posts, userName, token, setPosts, updatedPosts } =
		useContext(AppContext);
	const [content, setContent] = useState("");
	const [editState, setEditState] = useState(false);
	const [editContent, setEditContent] = useState("");
	// Create a new post
	const handleCreatePost = async (e: MouseEvent) => {
		e.preventDefault();
		await fetch("http://localhost:8000/api/v1/posts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ content }),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.posts && posts) {
					setPosts?.([...posts, res.posts]);
				}
			})
			.catch((err) => console.error(err));
		setContent("");
	};
	// Convert ISO date to readable date format
	const handleDate = (date: string) => {
		const newDate = new Date(date);
		const year = newDate.getFullYear();
		const month = newDate.getMonth() + 1;
		const day = newDate.getDate();
		const hour = newDate.getHours();
		// include the zero before single digit minutes
		const minute = newDate.getMinutes();
		return `${day}-${month}-${year} ${hour}:${
			minute < 10 ? "0" + minute : minute
		}`;
	};
	// Delete a post
	const handleDeletePost = async (id: string) => {
		await fetch(`http://localhost:8000/api/v1/posts/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				alert(res.status);
				// can either use filter or splice (prefer filter)
				setPosts?.((prev) => {
					return prev.filter((post) => post._id !== id);
				});
			})
			.catch((err) => alert(err));
	};

	interface PostsData {
		_id: string;
		content: string;
		author: {
			name: string;
		};
		updatedAt: string;
	}

	// Replace a post content by mutating the state
	// ! NOTICE that you must create a shallow copy of the prevState to keep the rule of immutability
	// Can also use JSON.parse(JSON.stringify(prevState))
	const replacePost = (index: number, post: PostsData[], content: string) => {
		return [
			...post.slice(0, index),
			{ ...post[index], content },
			...post.slice(index + 1),
		];
	};

	// Now PUT request and setPosts to update the state
	const handleEditPost = async (index: number, id: string) => {
		if (editState) {
			setPosts?.((prev) => {
				return replacePost(index, prev, editContent);
			});
			await fetch(`http://localhost:8000/api/v1/posts/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ content: editContent }),
			})
				.then((res) => res.json())
				.then((res) => alert(res.status))
				.catch((err) => alert(err));
			setEditState(false);
		} else {
			setEditState(true);
		}
	};
	return (
		<>
			{userName && (
				<form id="tweet">
					<textarea
						placeholder="Tweet something..."
						name="content"
						style={{
							height: "100px",
							width: "100%",
							textAlign: "left",
							padding: "10px 20px",
							wordWrap: "break-word",
							resize: "none",
						}}
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<input
						type="submit"
						value="Tweet"
						style={{ width: "10%", right: "0", marginTop: "10px" }}
						onClick={handleCreatePost}
					/>
				</form>
			)}
			<div id="post-container">
				{posts?.map((post, index) => {
					return (
						<div key={post._id} className="post">
							<p
								style={{
									textAlign: "justify",
									wordWrap: "break-word",
									padding: "20px",
								}}>
								{post.content}
							</p>
							<div className="post-description">
								<div style={{ width: "100%", display: "flex" }}>
									<p
										style={{
											textDecoration: "underline",
											whiteSpace: "nowrap",
										}}>
										by {post.author.name}
									</p>
									<p style={{ textDecoration: "underline", width: "100%" }}>
										Updated: {handleDate(post.updatedAt)}
									</p>
									<div>
										<div style={{ width: "100%", display: "flex" }}>
											<p
												style={{
													textAlign: "right",
													textDecoration: "underline",
													padding: "20px 0",
													userSelect: "none",
													cursor: "pointer",
													color: editState ? "red" : "white",
												}}
												onClick={() => handleEditPost(index, post._id)}>
												{editState ? "OK" : "Edit"}
											</p>
											<p
												style={{
													textDecoration: "underline",
													padding: "20px",
													userSelect: "none",
													cursor: "pointer",
												}}
												onClick={() => handleDeletePost(post._id)}>
												Delete
											</p>
										</div>
									</div>
								</div>
								{editState && (
									<textarea
										onChange={(e) => setEditContent(e.target.value)}
										style={{ resize: "none", height: "100%", padding: "20px" }}
										value={editContent || post.content}></textarea>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
