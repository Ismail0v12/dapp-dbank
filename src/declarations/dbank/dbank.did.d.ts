import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'checkBalance' : () => Promise<number>,
  'compound' : () => Promise<undefined>,
  'resetCurrentValue' : () => Promise<undefined>,
  'topUp' : (arg_0: number) => Promise<undefined>,
  'withdrawl' : (arg_0: number) => Promise<undefined>,
}
