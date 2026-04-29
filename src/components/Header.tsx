import { useNavigate } from "@tanstack/react-router";
import { clientDb } from "@/lib/db";
import { SiteLogo } from "./coreLayout/SiteLogo";

export default function Header() {
	const auth = clientDb.useAuth();
	const navigate = useNavigate();
	const signOut = () => {
		clientDb.auth.signOut().then(() => {
			navigate({ to: "/login" });
		});
	};

	return (
		<header className="p-4 px-8 flex justify-between border-b-neutral-200 items-center bg-white shadow-sm">
			<SiteLogo />
			{auth.user && (
				<button type="button" onClick={signOut}>
					Sign Out
				</button>
			)}
		</header>
	);
}
