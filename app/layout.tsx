import type { Metadata } from 'next';
import './globals.css';
import './quirk.css';

export const metadata: Metadata = {
  title: 'Quirk Arena Mobile Preview',
  description: 'Interactive Quirk Arena mobile game preview with map quests, quizzes, rewards, collections, world chat and friend chat.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<a className="globalChatFab" href="/chat" aria-label="Open World Chat"><span>💬</span><b>Chat</b><small>1,248 online</small></a></body></html>;
}
