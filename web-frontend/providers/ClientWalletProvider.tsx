'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const WalletProviderChild = dynamic(
  () => import('./WalletProvider').then((mod) => mod.WalletProvider),
  {
    ssr: false,
  }
);

export function ClientWalletProvider({ children }: { children: ReactNode }) {
  return <WalletProviderChild>{children}</WalletProviderChild>;
}
