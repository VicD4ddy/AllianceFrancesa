import './globals.css';

export const metadata = {
  title: 'Alliance Française Valencia – Vive la Inmersión Cultural Francesa',
  description:
    'Aprende francés presencial u online en Valencia con la única institución oficial avalada por la Embajada de Francia. Cursos, exámenes oficiales DELF/DALF y agenda cultural.',
  icons: {
    icon: '/afico.png',
    shortcut: '/afico.png',
    apple: '/afico.png',
  },
  keywords: ['Alliance Française', 'Valencia', 'Venezuela', 'aprender francés', 'cursos de francés', 'DELF', 'DALF', 'certificación oficial'],
  authors: [{ name: 'Alliance Française Valencia' }],
  openGraph: {
    title: 'Alliance Française Valencia – Vive la Inmersión Cultural Francesa',
    description: 'Tu pasaporte oficial al mundo y puente directo a la cultura francófona. Cursos presenciales, sabatinos y preparación DELF/DALF.',
    url: 'https://github.com/VicD4ddy/AllianceFrancesa',
    siteName: 'Alliance Française Valencia',
    images: [
      {
        url: '/logo-share.png',
        width: 500,
        height: 500,
        alt: 'Alliance Française Valencia — Logo Oficial',
      },
    ],
    locale: 'es_VE',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Alliance Française Valencia',
    description: 'Cursos oficiales de francés presencial en Valencia. Inscríbete hoy.',
    images: ['/logo-share.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
