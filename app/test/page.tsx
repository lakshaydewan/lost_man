'use client'
import { Check, Trash } from 'lucide-react'
import React, { useState } from 'react'

const TestPage = () => {

    const [data, setData] = useState([{
        key: "",
        value: "",
        disabled: false
    }])

    return (
            <div className='w-[60vw] h-full overflow-hidden flex flex-col justify-center items-center gap-3'>
                {
                    data.map((item, index) => {
                        return (
                            <div className='flex justify-center items-center gap-2 w-full' key={index}>
                                <div className='relative w-full flex justify-center items-center'>
                                    <input onChange={(e) => {
                                        setData((prev) => {
                                            prev[index].key = e.target.value
                                            return prev
                                        })
                                    }} placeholder='key' className={`w-full pl-7 p-1 ${item.disabled ? "text-gray-400" : "text-neutral-950"}  h-full pl-2 font-sans text-md font-light focus:outline-none focus:border-neutral-800 border rounded-md `} />
                                    <button onClick={() => {
                                        setData((prev) => {
                                            const newArray = [...prev].map((item, idx)=> {
                                                if (idx === index) {
                                                    return {
                                                        ...item,
                                                        disabled: !item.disabled
                                                    }
                                                } else {
                                                    return item
                                                }
                                            })
                                            return newArray
                                        })
                                    }} className={`${item.disabled ? "text-gray-400 border-gray-400" : "text-black border-black"} border p-0.5 absolute left-1 top-1 flex rounded-sm justify-center items-center tracking-wide font-sans hover:cursor-pointer h-fit text-sm font-normal`}>
                                        <Check size={15} />
                                    </button>
                                </div>
                                <div className='relative w-full flex justify-center items-center'>
                                    <input onChange={(e) => {
                                        setData((prev) => {
                                            prev[index].value = e.target.value
                                            return prev
                                        })
                                    }} placeholder='value' className={`relative w-full p-1 ${item.disabled ? "text-gray-400" : "text-neutral-950"} h-full pl-2 font-sans text-md font-light focus:outline-none pr-6 focus:border-neutral-800 border rounded-md`} />
                                    <button onClick={() => {
                                        setData((prev) => {
                                            if (prev.length === 1) {
                                                return prev
                                            }
                                            const newArray = prev.filter((item, idx) => {
                                                return index !== idx
                                            })
                                            return newArray
                                        })
                                    }} className='text-black absolute right-1 top-0 flex p-0.5 rounded-sm justify-center items-center tracking-wide font-sans hover:cursor-pointer h-full text-sm font-normal'>
                                        <Trash size={15} />
                                    </button>
                                </div>
                                <button onClick={() => {
                                    setData((prev) => {
                                        const newArray = [...prev, {
                                            key: "",
                                            value: "",
                                            disabled: false
                                        }]
                                        return newArray
                                    })
                                }} className='bg-[#fe6c37] flex p-1 justify-center items-center tracking-wide font-sans hover:cursor-pointer text-white rounded-lg w-[120px] h-full text-sm font-normal'>Add</button>

                            </div>
                        )
                    })
                }
            </div>
    )
}

export default TestPage