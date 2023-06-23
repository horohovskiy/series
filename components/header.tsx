import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";


const Header = () => {

    const { data: session, status } = useSession({required: true});

    return (
        <header>
            <div className="container">
                <Link href="/"><img src="/logo-series-white.png"/></Link>
                <span>
                    <Link href="/search" className="search">
                        Search Movie
                    </Link>
                    <button onClick={() => signOut()}>Sign Out</button>
                    <div className="account-inline">
                        <p>{session?.user?.name}</p>
                        {session?.user?.image && <img src={session.user.image} />}
                    </div>
                </span>
            </div>
        </header>
    );
};
export default Header;
