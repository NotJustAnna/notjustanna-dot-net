import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import personalAvatar from "@/assets/profile/personal/avatar-mini.jpg";
import {Badge} from "@/components/ui/badge.tsx";

export function Header() {
    return <div className=" my-4">
        <div className="flex items-center gap-4">
            <Avatar className="size-16 text-2xl">
                <AvatarImage src={personalAvatar}/>
                <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="flex-1 font-semibold">
                <h1 className="text-2xl">Anna Silva</h1>
                <span className="space-x-2">
                    <Badge variant="secondary" className="bg-pink-600">she / her</Badge>
                    <Badge variant="secondary" className="bg-cyan-600">transgender</Badge>
                    <Badge variant="secondary" className="bg-amber-600">autistic</Badge>
                </span>
            </div>
        </div>
    </div>;
}