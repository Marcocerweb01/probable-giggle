
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
// GET lettura
export const GET = async (request, {params}) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')
        if (!prompt) return new Response("prompt non trovati", { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 
//Patch aggiornare
export const PATCH = async (request, {params}) =>{
const {prompt, tag} = await request.json();

try {
    await connectToDB();
   
    const existingPrompt = await Prompt.findById(params.id);

    if(!existingPrompt) return new Response("prompt non trovato", {status: 404})

    existingPrompt.prompt=prompt;
    existingPrompt.tag=tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 201 })
} catch (error) {

    return new Response("Failed to fetch all prompts", { status: 500 })

}
}
// DELETE cancellare
export const DELETE = async(request, {paramas}) =>{
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("prompt eliminato", {status:200})
    } catch (error) {
        return new Response("impossibile cancellare", {status:500})
    }



}