"use client";

import {useState, useEffect, Suspense} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile'

const MyProfile = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const fetchPosts = async () =>{
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          console.log(data);
          setPosts(data);
        }
        if (session?.user.id) fetchPosts();
      }, []);


    const handleEdit = (post) =>{
            router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = async (post) =>{
        const hasConfirmed = confirm("sei sicuro di voler eliminare?");
        if (hasConfirmed) {
          try {
            await fetch(`api/prompt/${post._id.toString()}`,{
              method: 'DELETE'
            });
            const filteredePosts = posts.filter((p) => p._id !== post._id)

            setPosts(filteredePosts);
          } catch (error) {
            console.log(error)
          }

        }
    }
  return (
    <Suspense>
    <Profile
        name="My"
        desc="pagina personale"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}   
    />
    </Suspense>
  )
}

export default MyProfile