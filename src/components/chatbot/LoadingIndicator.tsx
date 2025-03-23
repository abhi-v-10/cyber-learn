
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader } from "lucide-react";

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="flex space-x-3 max-w-[85%]">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-cyan-600 text-white">AI</AvatarFallback>
        </Avatar>
        <div className="p-4 rounded-lg bg-secondary text-secondary-foreground">
          <Loader className="h-5 w-5 animate-spin" />
        </div>
      </div>
    </div>
  );
};
