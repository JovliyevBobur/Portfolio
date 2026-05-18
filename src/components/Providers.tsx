"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BgProvider } from "@/contexts/BgContext";
import { useState } from "react";
import "@/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BgProvider>
          {children}
        </BgProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
