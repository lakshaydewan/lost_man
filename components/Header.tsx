import React from 'react'
import { SignUpButton, SignedOut, SignedIn, UserButton } from '@clerk/nextjs'

const Header = () => {
  return (
    <>
    <div className="flex border justify-between items-center border-neutral-900 p-3">
            <div className="font-sans font-semibold text-xl">
              LostMan
            </div>
            <SignedOut>
              <div className="bg-[#fe6c37] text-white rounded-lg p-3 text-sm font-extralight">
                <SignUpButton />
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
    </>
  )
}

export default Header