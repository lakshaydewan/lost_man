'use client'

import React, { useState, useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import CustomSelect from './CustomSelect';
import { CustomRadioGroup } from './CustomRadio';

const Postman = () => {

  const [value, setValue] = useState({});
  const [isBodyNone, setisBodyNone] = useState(true);
  const [method, setMethod] = useState<string>("")
  const [url, setUrl] = useState<string>("")

  const handleClick = () => {
    //TODO - make a backendREQUEST
    console.log({
      data: {
        url,
        method,
        body: value
      }
    })
  }

  const cb = (methodVal: string) => {
    setMethod((prev) => {
       return prev = methodVal
      })
  }

  const cbForRadio = (radioVal: string) => {
    if (radioVal == "none") {
      setisBodyNone(true)
    }
    else {
      setisBodyNone(false)
    }
  }

  const onChange = useCallback((val: any) => {
    try {
      const json = JSON.parse(val);
      if (json) {
        setValue(json);
      }
    } catch (error) {
      console.log("Invalid JSON input!");
    }
  }, []);

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='w-[95vw] h-[90vh] border-[0.5px] border-gray-500'>
        <div className='w-full h-[50%] border flex flex-col justify-start items-start gap-3'>
          <div className='flex flex-col items-start gap-1 w-full mt-5'>
            <div className='w-full flex h-fit gap-1'>
              <CustomSelect cb={cb} />
              <input onChange={(e) => setUrl(e.target.value)} placeholder='Enter the API endpoint.'
              className='w-full h-full pl-2 font-sans text-md font-light focus:outline-none focus:border-neutral-800 border rounded-md'/>
              <div onClick={handleClick} className="bg-[#fe6c37] flex justify-center items-center tracking-wide font-sans hover:cursor-pointer text-white rounded-lg w-[120px] h-full text-sm font-normal">
                    SEND
                </div>
            </div>
            <div className='h-fit text-sm ml-2 font-sans font-light'>
              Body
            </div>
          <div className='w-fit h-fit ml-2'><CustomRadioGroup cb={cbForRadio} /></div>
          </div>
          {
            isBodyNone ? (
              <div className='w-full font-sans text-2xl font-light'>
                 
              </div>
            ) : (
              <div className='w-full'>
          <CodeMirror height='250px' 
placeholder={`{
"name": "Tyler", 
"age": 20
}`}
            onChange={onChange}
          />
          </div>
            )
          }
        </div>
        <div className='w-full h-[50%] border border-gray-500 flex flex-col justify-center'>
        </div>
      </div>
    </div>
  )
}

export default Postman;