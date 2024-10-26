import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function CustomRadioGroup({cb} : {cb: (args: string) => void}) {

  return (
    <RadioGroup onValueChange={(e)=> {
        cb(e)
    }} defaultValue="none" className="flex justify-center items-center gap-1.5">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="none" id="r1" />
        <Label htmlFor="r1">none</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="raw-body" id="r2" />
        <Label htmlFor="r2">raw</Label>
      </div>
    </RadioGroup>
  )
}
