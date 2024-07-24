"use client";

import {useState, useEffect} from "react"
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick})  => {
  return ( 
    <div className="mt-16 prompt_layout">
         {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            />
         ))}
    </div>
  )

}
const feed = () => {
  const[posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const[searchText, setSearchText]= useState('');
  



  const filteredPrompts = (searchText) =>{
    const regex = new RegExp(searchText, "i");

    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag)||
        regex.test(item.prompt)
    );

  };

  const handleSearchChange = (e) =>{
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    
    setSearchTimeout(setTimeout(()=>{ 
    const searchedResults = filteredPrompts(e.target.value);
      setSearchResults(searchedResults);
    
  }, 500)
  );
  };

  const handleTagClick = (tagName) => {

    setSearchText(tagName);

    const searchResults = filteredPrompts(tagName);
    setSearchResults(searchResults);
  };

  useEffect(()=>{
    const fetchPosts = async () =>{
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);


  return (
  <section className="feed">
    <form className="relative w-full flex-center">
    <input type="text"
    placeholder="cerca il prompt"
    value={searchText}
    onChange={handleSearchChange}
    className="search_input peer"
    required
    />
    </form>
    <PromptCardList 
      data={searchResults}
      handleTagClick={handleTagClick}
    />
  </section>  
  
  
  )
}

export default feed