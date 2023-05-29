import Image from 'next/image';
import { add } from 'aa-utils-lib';
import {RpaTime} from '@bixi-rpa/core';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>add: {add(1, 2)} </div>
      <div><RpaTime time={1684746796}/> </div>
    </main>
  );
}
