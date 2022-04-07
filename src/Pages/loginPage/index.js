import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import config from "../../Component/data/config";
import { getUserProfile } from "../../lib/fetchApi";
import { login } from "../../slice/authSlice";
import "./index.css";

const LoginPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = new URLSearchParams(window.location.hash).get(
			"#access_token"
		);

		if (token !== null) {
			const setUserProfile = async () => {
				try {
					const response = await getUserProfile(token);
					dispatch(
						login({
							accessToken: token,
							user: response,
						})
					);
				} catch (e) {
					toast.error(e);
				}
			};

			setUserProfile();
		}
	});

	const getSpotifyLinkAuth = () => {
		const state = Date.now().toString();
		const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

		return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
	};

	return (
		<div className="home">
			<div className="auth__content">
					<a className="btn btn-login" href={getSpotifyLinkAuth()}>
						LOG IN WITH SPOTIFY
					</a>
			</div>
		</div>
	);
};

export default LoginPage;