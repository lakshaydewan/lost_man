import Postman from '@/components/Postman';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const MainPage = async () => {

  const {userId} = await auth();
  
  if (!userId) {
    return redirect('/')
  }

  return (
    <div>
       <Postman />
    </div>
  )
}

export default MainPage;