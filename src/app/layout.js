import './globals.css';

export const metadata = {
  title: 'Alliance Française Valencia – Vive la Inmersión Cultural Francesa',
  description:
    'Descubre el idioma, el arte y el pensamiento en el corazón de Valencia. Alliance Française Valencia: tu puente directo a la cultura francófona.',
  keywords: ['Alliance Française', 'Valencia', 'Venezuela', 'francés', 'idiomas', 'DELF', 'DALF', 'cultura francesa'],
  openGraph: {
    title: 'Alliance Française Valencia',
    description: 'Tu puente directo a la cultura francófona en Venezuela.',
    locale: 'es_VE',
    type: 'website',
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
