import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { NotificationProvider } from '../contexts/NotificationContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationProvider>
  );
}



