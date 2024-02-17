import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
// import BackgroundEffect from "./components/fon/BackgroundEffect.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		{/* <BackgroundEffect> */}
			<App />
		{/* </BackgroundEffect> */}
	</React.StrictMode>
);
