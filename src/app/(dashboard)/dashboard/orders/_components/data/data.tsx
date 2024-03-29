import {
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "pending",
    label: "Pending",
    variant: "outline",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "processing",
    label: "Processing",
    variant: "info",
    icon: CircleIcon,
  },
  {
    value: "completed",
    label: "Completed",
    variant: "default",
    icon: StopwatchIcon,
  },
  {
    value: "canceled",
    variant: "destructive",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
] as {
  value: string;
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline" | "success" | "info";
  icon?: React.ComponentType<{ className?: string }>
}[];
