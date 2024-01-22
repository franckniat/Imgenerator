import Navigation from "@/components/Navigation";
import { Loader, Loader2, SendIcon } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import OpenAI from "openai";
import {NextSeo} from 'next-seo';

type chatHistory = {
  type: 'user' | 'ai',
  text: string | JSX.Element
}
export default function Home() {
  const [isLoading, setisLoading] = useState(false);

  const [textInput, setTextInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<chatHistory[]>([]);

  const request = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setisLoading(true);
    try {
      setChatHistory([...chatHistory, { type: 'user', text: textInput }]);
      setTextInput('');
      const response = await openai.images.generate({
        prompt: textInput,
      })
      setChatHistory([...chatHistory, 
        { 
          type: 'ai', 
          text: <>
                  <Image ref={image} src={response.data[0].url ? response.data[0].url : ""} alt="Generated Image" width={400} height={400} />
                </>
        }
      ]);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);

  }
  return (
    <>
    <NextSeo
      title="Image Generator"
      description="AI Image Generator"
      openGraph={{
        url: 'https://imgenerator.vercel.app/',
        title: 'Image Generator',
        description: 'AI Image Generator powered by OpenAI Api',
        images: [
          {
            url: '/favicon.ico',
          }
        ]
      }}
      canonical="https://imgenerator.vercel.app/"
    />
    <Navigation/>
    <main className="max-w-[500px] mx-auto px-3">
        <section className="pt-[75px] pb-[120px]">
          <h1 className="text-lg my-5">Entrez du texte pour générer une image.</h1>
          
          <div>
            {chatHistory?.map((message, index) => (
              <div className="p-2 bg-gray-200 dark:bg-neutral-800 w-fit flex flex-col rounded-md" key={index} style={{ marginBottom: '10px' }}>
                {message.type === 'user' ? <strong>Vous :</strong> : <strong>AI :</strong>}
                {"  "} 
                <span>{message.text}</span>
              </div>
            ))}
            {isLoading ? <Loader2 size={25} className="animate-spin"/> :null}
          </div>


          <div className="relative">
            <div className="w-full fixed bottom-0 " >
              <div className="max-w-[500px] bg-white dark:bg-neutral-900 p-3">
                <form className="flex gap-2" onSubmit={handleSubmit}>
                  <textarea
                    className="block w-full px-2 py-3 rounded-md border border-gray-300 shadow focus:outline-indigo-600 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-neutral-900"
                    placeholder="Saisisez ce que vous voulez générez..."
                    value={textInput}
                    onChange={(e)=>setTextInput(e.target.value)}
                  />
                  <button className="group bg-sky-600 hover:bg-sky-600/90 px-3 py-2 flex justify-center items-center gap-3 rounded-md text-white h-fit">
                    <SendIcon size={20}/>
                    <span className="">Envoyer</span>
                  </button>
                </form>
                <h3 className="text-center mt-3 text-neutral-500">Powered by OpenAI</h3>
              </div>
            </div>
          </div>
        </section>
    </main>
    </>
  );
}
