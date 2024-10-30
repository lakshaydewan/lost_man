'use client'
import React, { useState, useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import CustomSelect from './CustomSelect';
import { CustomRadioGroup } from './CustomRadio';
import axios from 'axios';
import { DATA } from '@/lib/types';

const Postman = () => {

  const [value, setValue] = useState({});
  const [isBodyNone, setisBodyNone] = useState(true);
  const [method, setMethod] = useState("");
  const [url, setUrl] = useState("");
  const [isHeadersActive, setIsHeadersActive] = useState(false);
  const [authHeaders, setAuthHeaders] = useState("");
  const [error, setError] = useState("");
  const [returneddata, setReturnedData] = useState();
  const [responseHeaders, setResponseHeaders] = useState();
  const [isHeadersVisible, setIsHeadersVisible] = useState(false);
  const [statusCode, setStatusCode] = useState("");
  const [responseTime , setResponseTime] = useState("");
  const [size, setSize] = useState("");

  const handleClick = async () => {
    if (isHeadersActive === false) {
      setAuthHeaders((prev) => {
        prev = ""
        return prev;
      });
    }

    if (method === "") {
      setError("Provide a valid method / method can not be empty.")
      setTimeout(() => {
        setError("")
      }, 2000)
      return;
    }
    if (url === "" || (!url.startsWith("https://"))) {
      setError("Provide a valid url.")
      setTimeout(() => {
        setError("")
      }, 2000)
      return;
    }
    if (error !== "") {
      return;
    }

    const data: DATA = {
      url,
      method,
      body: value,
      authHeaders
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/v1`, data)
      setReturnedData(res.data.data);
      setResponseHeaders(res.data.headers)
      setResponseTime(res.data.responseTime)
      setStatusCode(res.data.statusCode)
      setSize(res.data.size)
      console.log(returneddata);
    } catch (err) {
      console.log(err)
    }
  }

  const cbForSelect = (methodVal: string) => {
    setMethod((prev) => {
      prev = methodVal
      return prev
    })
  }

  const cbForRadio = (radioVal: string) => {
    if (radioVal == "none") {
      setisBodyNone(true)
      setValue(() => ({}))
    }
    else {
      setisBodyNone(false)
    }
  }

  const onChange = useCallback((val: string) => {
    try {
      if (val === "") {
        return
      }
      const json = JSON.parse(val);
      if (json) {
        setValue(json);
        setError("")
      }
    } catch (error) {
      setError("Invalid JSON / BODY syntax !")
      console.log(error)
      console.log("Invalid JSON input!");
    }
  }, []);

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='w-[95vw] h-[90vh] flex flex-col justify-center items-center gap-3'>
        <div className='w-full h-[50%] flex flex-col justify-start items-start gap-3'>
          <div className='flex flex-col items-start gap-1 w-full mt-5'>
            <div className='w-full flex h-fit gap-1'>
              <CustomSelect cb={cbForSelect} />
              <input onChange={(e) => setUrl(e.target.value)} placeholder='Enter the API endpoint.'
                className='w-full text-neutral-950 h-full pl-2 font-sans text-md font-light focus:outline-none focus:border-neutral-800 border rounded-md' />
              <div onClick={handleClick} className="bg-[#fe6c37] flex justify-center items-center tracking-wide font-sans hover:cursor-pointer text-white rounded-lg w-[120px] h-full text-sm font-normal">
                SEND
              </div>
            </div>
            <div className='h-fit text-md my-2 ml-2 font-sans font-bold flex w-full gap-4 justify-start items-center'>
              <div>Body</div>
              {
                isHeadersActive ? (<div className={`border rounded-lg px-2 hover:text-[#fe6c37] hover:border-[#fe6c37] transition-all duration-500 ease-out cursor-pointer font-sans`} onClick={() => {
                  setIsHeadersActive(!isHeadersActive);
                  setAuthHeaders(() => "");
                }}>Disable Headers</div>) : (
                  <div className={`border rounded-lg px-2 hover:text-[#fe6c37] hover:border-[#fe6c37] transition-all duration-500 ease-out cursor-pointer font-sans`} onClick={() => {
                    setIsHeadersActive(!isHeadersActive);
                  }}>Enable Headers</div>
                )
              }
              {
                error && (
                  <div>
                    <p className='text-red-400 text-xs md:text-sm tracking-wide font-light font-sans ml-2'>{error}</p>
                  </div>
                )
              }
            </div>
            <div className='w-fit h-fit ml-2'><CustomRadioGroup cb={cbForRadio} /></div>
          </div>
          {
            isBodyNone ? (
              <div className='w-full font-sans text-2xl font-light'>
                {
                  isHeadersActive && (
                    <div className='w-full h-[200px]'>
                      <div className='flex flex-col gap-1'>
                        <span className='font-sans font-extralight'>Authorization :</span>
                        <span><textarea
                          onChange={(e) => {
                            setAuthHeaders(e.target.value)
                          }} rows={3} placeholder='Bearer {token}' className='w-full text-neutral-950 h-full pl-2 font-sans text-md font-light focus:outline-none focus:border-neutral-800 border rounded-md' /></span>
                      </div>
                    </div>
                  )
                }
              </div>
            ) : (
              <div className='w-full flex gap-2 items-center h-full'>
                <div className='w-full rounded-2xl overflow-scroll border'>
                  <CodeMirror className='text-black font-normal text-[15px]' height='200px'
                    placeholder={`{
  "name": "Tyler",
  "age": 20
}`}
                    onChange={onChange}
                  />
                </div>
                {
                  isHeadersActive && (
                    <div className='w-full h-[200px]'>
                      <div className='flex flex-col gap-1'>
                        <span className='font-sans font-extralight'>Authorization :</span>
                        <span><textarea onChange={(e) => {
                          setAuthHeaders(e.target.value)
                        }} rows={3} placeholder='Bearer {token}' className='w-full text-neutral-950 h-full pl-2 font-sans text-md font-light focus:outline-none focus:border-neutral-800 border rounded-md' /></span>
                      </div>
                    </div>
                  )
                }
              </div>
            )
          }
        </div>
        <div className='w-full gap-2 h-full flex flex-col justify-center overflow-scroll'>
          <div className='h-10 border w-full rounded-lg flex justify-between items-center'>
            <div className='ml-3 font-sans font-bold text-sm md:text-md flex justify-center items-center gap-2'>
             <div>
              Body
             </div>
             {
               isHeadersVisible ? (
                <div className={`border rounded-lg px-2 md:py-[1px] hover:text-[#fe6c37] hover:border-[#fe6c37] transition-all duration-500 ease-out cursor-pointer font-sans text-wrap md:text-base text-xs`} onClick={() => {
                  setIsHeadersVisible(!isHeadersVisible);
                }}>Hide Header</div>
               ) : (
                <div className={`border rounded-lg px-2 py-[1px] hover:text-[#fe6c37] hover:border-[#fe6c37] transition-all duration-500 ease-out cursor-pointer font-sans text-wrap md:text-base text-xs`} onClick={() => {
                  setIsHeadersVisible(!isHeadersVisible);
                }}>See Header</div>
               )
             }
            </div>
            <div className={`mr-3 flex justify-center items-center gap-3 md:text-base text-sm ${
              statusCode.startsWith("20") && "text-green-500"
            } ${
              statusCode.startsWith("30") && "text-yellow-400"
            } ${
              (statusCode === "") && "text-black"
            }
            ${
              (statusCode.startsWith("40") || statusCode.startsWith("50")) && "text-red-500"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <div>
                {statusCode}
              </div>
              <div>{responseTime}</div>
              <div>{size ? size : "--"} kB</div>
            </div>
          </div>
          <div className='w-full h-full overflow-y-scroll border rounded-lg'>
            {
              isHeadersVisible ? (
                <CodeMirror indentWithTab className='text-black font-normal text-[15px]' height='full'
                value={JSON.stringify(responseHeaders, null, 2)} 
                readOnly
              />
              ): (
                <CodeMirror indentWithTab className='text-black font-normal text-[15px]' height='full'
                value={JSON.stringify(returneddata, null, 2)}
                readOnly
              />
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Postman;