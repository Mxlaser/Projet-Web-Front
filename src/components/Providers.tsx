"use client";

import { Toaster, ToasterProvider } from "@/components/ui/Toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { client } from "@/lib/graphql";
import { ApolloProvider } from "@apollo/client";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider client={client}>
      <ToasterProvider>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </ToasterProvider>
    </ApolloProvider>
  );
}
