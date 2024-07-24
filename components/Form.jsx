
import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit}) => {
  return (
   <section className ="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
      {type} ed evolvi il tuo potenziale
      </p>
      <form
        onSubmit={handleSubmit} 
        className="mt-10 w-full max-w-2xl flex flex-col gab-7 glassmorphism"
        >
        <label> <span className="font-satoshi font-semibold text-base text-gray-700">Prompt tuo</span>
        <textarea value={post.prompt} onChange={(e) => setPost({ ...post, prompt: e.target.value})} placeholder="scrivi qui il prompt" required className="form_textarea"/>
        </label>

        <label> <span className="font-satoshi font-semibold text-base text-gray-700">tags {' '}<span className="font-normal">tag per il tuo prompot #</span></span>
        <input value={post.tag} onChange={(e) => setPost({ ...post, tag: e.target.value})} placeholder="scrivi qui il tag" type="text" required className="form_input"/>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4 py-5">
        <Link href="/" className='text-gray-500 text-sm'>
          Cancella
        </Link>
        <button type='submit' disabled={submitting} className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
          
          {submitting ? `${type}ing...` : type}
        </button>
        </div>
      </form>
    </section>
  )
}

export default Form;