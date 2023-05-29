import Image from 'next/image';
import { add } from 'utils-lib';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>add: {add(1, 2)} </div>
    </main>
  );
}
