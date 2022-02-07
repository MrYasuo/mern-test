import { createContext, useEffect, useRef, useState } from "react";

interface AppContext {
	userName: string;
	token: string;
	posts: PostsData[];
	updatedPosts: React.MutableRefObject<boolean>;
	setUserName: React.Dispatch<React.SetStateAction<string>>;
	setToken: React.Dispatch<React.SetStateAction<string>>;
	setPosts: React.Dispatch<React.SetStateAction<PostsData[]>>;
}

interface PostsData {
	_id: string;
	content: string;
	author: {
		name: string;
	};
	updatedAt: string;
}

const AppContext = createContext<Partial<AppContext>>({});

export default function AppContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [userName, setUserName] = useState<string>("");
	const [token, setToken] = useState<string>("");
	const [posts, setPosts] = useState<PostsData[]>([]);
	const updatedPosts = useRef<boolean>(false);
	const appContext = {
		userName,
		token,
		posts,
		setUserName,
		setToken,
		setPosts,
		updatedPosts: updatedPosts,
	};
	return (
		<AppContext.Provider value={appContext}>{children}</AppContext.Provider>
	);
}

export { AppContext };
