import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CustomSelect({cb}: {cb: (one: string) => void}) {

  return (
    <Select onValueChange={(e)=> {
      cb(e)
    }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Method" />
      </SelectTrigger>
      <SelectContent onVolumeChange={()=> {
        console.log('ran')
      }}>
        <SelectGroup>
          <SelectItem value="POST">POST</SelectItem>
          <SelectItem value="GET">GET</SelectItem>
          <SelectItem value="PUT">PUT</SelectItem>
          <SelectItem value="DELETE">DELETE</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
