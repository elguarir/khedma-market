import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface MessageProps {
  user: {
    id: string;
    name: string | null;
    username: string | null;
    email: string | null;
    image: string | null;
  };
  message: {
    id: string;
    content: string;
    createdAt: Date;
  };
  attachement: {
    type: string;
    id: string;
    name: string;
    url: string;
  }[];
}
export const Message = ({ message, user }: MessageProps) => (
  <div className="group flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-neutral-200/30 hover:dark:bg-neutral-900/50">
    <div>
      <Avatar className="h-10 w-10 border">
        <AvatarImage src={user.image ?? ""} />
        <AvatarFallback>{user.name && user.name[0]}</AvatarFallback>
      </Avatar>
    </div>
    <div className="flex w-full flex-col gap-0.5">
      <div className="flex w-full items-center gap-2">
        <h3 className="text-sm font-semibold">{user.name}</h3>
        <p className="text-xs text-muted-foreground">
          {/* Mar 17, 2024, 12:07 AM */}
          {format(new Date(message.createdAt), "MMM d, yyyy, h:mm a")}
        </p>
        <div className="ml-auto opacity-0 transition-all group-hover:opacity-100">
          <button className="text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none">
            <Icons.reply className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div>
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  </div>
);
