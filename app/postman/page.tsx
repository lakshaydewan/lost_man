'use server'
import Postman from '@/components/Postman';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import { SignedIn, UserButton } from '@clerk/nextjs';

const MainPage = async () => {

  const {userId} = await auth();
  
  if (!userId) {
    return redirect('/')
  }

  return (
    <div>
      <div className='absolute top-2 right-5'>
        <SignedIn>
            <UserButton />
        </SignedIn>
      </div>
       <Postman />
    </div>
  )
}

export default MainPage;