'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';
import React from 'react'

const nav = () => {
    const {data:session}= useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(()=>{
        const setUpProviders = async() => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders();
    },[])
  return (
    <nav className="flex-between w-full mb-a6 pt-3">
        <Link href="/" className="flex gab-3 flex-center">
            <Image src="/assets/images/logo.svg"
            alt="ubs logo"
            width={30}
            height={30}
            className="object-contain"/>
            <p className="logo_text"> Urbiness </p>
        </Link>
     
    <div className="sm:flex hidden">
        {session?.user ? (
            <div className="flex gap-3 md:gap-5">
                <Link href="create-prompt" className="black_btn">
                Aggiungi post
                </Link>
                <button type="button" onClick={signOut} className="outline_btn">
                    Sign out
                </button>
                <Link href="/profile">
                <Image 
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className ="rounded-full"
                    alt="profile"
                    />
                </Link>
            </div>
            ): (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button
                        type ="button"
                        key={provider.name}
                        onClick={()=> signIn(provider.id)}
                        className="black_btn">
                            Sign in
                        </button>
                    ))}
                </>
        )}
    </div>

       { /* da mobile*/}
        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                    <Image 
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className ="rounded-full"
                    alt="profile"
                    onClick={()=>setToggleDropdown((prev) => !prev)}
                    />
                {toggleDropdown &&(
                    <div className='dropdown'>
                        <Link
                        href="/profile"
                        className="dropdown_link"
                        onClick={()=> setToggleDropdown(false)}>
                            Mio profilo
                        </Link>
                        <Link
                        href="/create-prompt"
                        className="dropdown_link"
                        onClick={()=> setToggleDropdown(false)}>
                            crea prompt
                        </Link>
                        <button type="button"
                        onClick={()=>{
                            setToggleDropdown(false);
                            signOut;
                        }}
                        className="mt-5 w-full black_btn"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
                </div>
            ):(<>
                {providers && Object.values(providers).map((provider) => (
                    <button
                    type ="button"
                    key={provider.name}
                    onClick={()=> signIn(provider.id)}
                    className="black_btn">
                        Sign in
                    </button>
                ))}
            </>)}
        </div>
    </nav>
  )
}

export default nav