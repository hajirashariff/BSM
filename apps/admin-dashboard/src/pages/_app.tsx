import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Pages that should not have the Layout wrapper (clean authentication pages and standalone pages)
  const authPages = ['/login', '/auth/callback', '/welcome'];
  const shouldShowLayout = !authPages.includes(router.pathname);

  return (
    <AuthProvider>
      {shouldShowLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}



