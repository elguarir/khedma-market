import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import React from "react";

type Props = {};

const GigActions = (props: Props) => {
  //   return (
  //     <Popover>
  //       <PopoverTrigger asChild>
  //
  //       </PopoverTrigger>
  //       <PopoverContent
  //         align="start"
  //         className="-ml-3 grid w-fit min-w-60 grid-cols-1 gap-1 p-1"
  //         side="top"
  //       >
  //         <Button
  //           variant={"ghost"}
  //           className="w-full justify-start text-muted-foreground"
  //         >
  //           <Icons.editIcon className="mr-2 h-5 w-5" />
  //           Edit
  //         </Button>
  //         <Button
  //           variant={"ghost"}
  //           className="w-full justify-start text-muted-foreground"
  //         >
  //           <Icons.pause className="mr-2 h-5 w-5" />
  //           Pause
  //         </Button>
  //         <Button
  //           variant={"ghost"}
  //           className="w-full justify-start text-muted-foreground"
  //         >
  //           <Icons.trash className="mr-2 h-4 w-4" />
  //           Delete
  //         </Button>
  //       </PopoverContent>
  //     </Popover>
  //   );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus-visible:outline-primary focus:outline-none">
          <DotsHorizontalIcon className="h-5 w-5 text-muted-foreground transition-colors duration-150  hover:text-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-52">
        <DropdownMenuItem className="text-muted-foreground">
          <Icons.editIcon className="mr-2 h-5 w-5" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="text-muted-foreground">
          <Icons.pause className="mr-2 h-5 w-5" />
          Pause
        </DropdownMenuItem>
        <DropdownMenuItem className="text-muted-foreground">
          <Icons.trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GigActions;
