import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'La Tradition â Boulangerie-pÃ¢tisserie Ã  Nice',
  description: 'La Tradition, boulangerie-pÃ¢tisserie au 27 Avenue des Diables Bleus Ã  Nice. DÃ©couvrez lâadresse, les horaires et lâunivers de la maison.',
  alternates: { canonical: '/' },
  openGraph: { title: 'La Tradition â Le goÃ»t de la tradition, chaque jour.', description: 'Boulangerie-pÃ¢tisserie Ã  Nice.', type: 'website', locale: 'fr_FR' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
