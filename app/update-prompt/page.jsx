"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParamas= useSearchParams();
  const promptId = searchParamas.get("id");


  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

    useEffect(() => {
        const getPromptDetails = async () =>{
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            
            setPost({
                prompt: data.prompt,
                tag: data.tag,

            })
            console.log(data.prompt)
        }
        console.log(promptId);
        if (promptId) getPromptDetails();
    }, [promptId]);
 
    const UpdatePrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!promptId) return alert ("Prompt id non trovato")
        try {
          const response = await fetch(`/api/prompt/${promptId}`,{
            method: "PATCH",
            body: JSON.stringify({
              prompt: post.prompt,
              tag: post.tag
            }),
          });
    
          if (response.ok) {
            router.push("/");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsSubmitting(false);
        }
      };



  return (
    <Suspense>
      
    <Form
    type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={UpdatePrompt}
    />
    </Suspense>
  );
};

export default EditPrompt;