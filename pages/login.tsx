import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        // Loading state while checking session status
        return <div>Loading...</div>;
    }

    if (session) {
        // Redirect if the user is already signed in
        router.replace("/movies");
        return null;
    }

    return (
        <div>
            You are not signed in
            <button onClick={() => signIn()}>Sign In</button>
        </div>
    );
};

export default Login;
