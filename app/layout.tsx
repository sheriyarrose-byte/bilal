import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quirk Arena Mobile Preview',
  description: 'Interactive Quirk Arena mobile game preview with map quests, quizzes, rewards and collections.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
