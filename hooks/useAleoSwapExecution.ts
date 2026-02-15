import { useCallback } from "react";
import { toast } from "sonner";
import { useWallet } from '@provablehq/aleo-wallet-adaptor-react';
 
interface ExecuteSwapParams {
  transactionRequest?: {
    function?: string;
    inputs?: string[];
    fee?: string;
  };
}

export const useAleoSwapExecution = () => {
   const {
     connected: isConnected, // boolean - whether wallet is connected
      executeTransaction,
      transactionStatus
   } = useWallet();


  const executeSwap = useCallback(
    async (params: ExecuteSwapParams) => {
      if (!isConnected) {
        throw new Error('Please connect your wallet');
      }

      const { transactionRequest } = params;

      try {
        // Execute a transaction
        const result = await executeTransaction({
          program: 'minimask_exchange_router_v1.aleo',
          function: 'deposit_aleo',
          inputs: [
            '1000000u64',
            '900000u128',
            'aleo1z3x9fxxu56helqe2jjk3zu3tk2yw8x3f7hf6uawvzqzatvxx75pqu08jc2'
          ],
          fee: 100000
        });
        toast.success('Transaction submitted!');
        // Poll for transaction status
        // if (result) {
        // const status = await transactionStatus(
        //   'shield_1770469613752_36zm593mx8'
        // );
        // console.log('Status:', status.status);
        // console.log('On-chain TX ID:', status.transactionId);
        console.log('On-chain TX ID:', result);
        // }

        return result;
      } catch (error) {
        console.error('Transaction failed:', error);
        if (error instanceof Error) {
          if (error.message.includes('rejected')) {
            throw new Error('Transaction rejected by user');
          }
          throw error;
        }
        throw new Error('Transaction failed');
      }
    },
    [isConnected, executeTransaction, transactionStatus]
  );

  return {
    executeSwap,
    isConnected
   };
};;
