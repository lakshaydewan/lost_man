import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type DialogProps = {
    error?: string
}

export default function DialogButton({ error }: DialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="mt-2">See Error</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[540px] sm:h-[75%] h-[70%] w-[90%] rounded-lg flex flex-col">
                <DialogHeader className="flex">
                    <DialogTitle>ERROR</DialogTitle>
                </DialogHeader>
                <div className="w-full h-full flex">
                    <textarea className="w-full h-full outline-none">{error}</textarea>
                </div>
            </DialogContent>
        </Dialog>
    )
}
