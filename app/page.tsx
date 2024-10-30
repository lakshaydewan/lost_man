'use server'
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import { SignUpButton } from '@clerk/nextjs';
import TypeWriter from '@/components/TypeWriter';
import Header from '@/components/Header';
import Image from 'next/image';

const Page = async () => {

  const { userId } = await auth();
  const user = await currentUser();
  console.log("email", user?.emailAddresses[0].emailAddress)
 
  {
    if (userId) {
      return redirect("/postman");
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col font-sans">
      <div className="">
        <Header />
      </div>
      <div className="h-full w-full flex">
        <div className='w-full h-full'>
          <div className='py-10 px-10 lg:px-20 h-full flex flex-col justify-around'>
            <div className='flex flex-col justify-around items-start gap-2'> 
              <div>
                <TypeWriter />
              </div>
              <div className='text-xl tracking-wider font-semibold font-sans'>API&apos;s together</div>
              <p className='text-lg font-sans font-extralight'>Over 30 million developers use Postman. Get started by signing up or downloading the desktop app.</p>
              <div className='mt-5 flex justify-start items-center h-fit w-fit border border-[#fe6c37] rounded-lg gap-3 pr-3'>
                <div className='bg-[#fe6c37] border border-[#fe6c37] rounded-md text-white font-sans font-light text-sm p-3 flex justify-center items-center'><SignUpButton /></div>
                <div className=''>To Get Started</div>
              </div>
            </div>
              <div>
                <h1 className='text-xl font-sans font-semibold'>
                  What is LostMan?
                </h1>
                <p className='font-sans font-extralight'>
                  Lostman is an API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs—faster.
                </p>
              </div>
          </div>
        </div>
        <div className='h-full w-0 lg:w-full flex flex-col justify-between items-end overflow-visible'>
          <div className='w-full h-full bg-cover bg-right-top bg-[url(https://www.postman.com/_wp-assets/home/homepage-hero-light_1800w.21bd14bd629f14c1.png)]'>
          </div>
          <div className='w-[50%] h-[50%] object-cover'>
             <Image 
              className=''
              height={1000}
              width={1000}
              src={"https://www.postman.com/_wp-assets/home/homepage-header-illustration.3385ecfa6f9284b1df99096f6ab456fe.svg"}
              alt='nothing'
             />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;


