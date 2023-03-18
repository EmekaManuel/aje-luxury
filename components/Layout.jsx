import Head from 'next/head';
import { Box } from '@chakra-ui/react';

import LargeWithNewsletter from './Footer';
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <>
    <Head>
      <title>Real Estate</title>
    </Head>
    <Box maxWidth='1280px' m='auto'>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <footer>
        <LargeWithNewsletter/>
      </footer>
    </Box>
  </>
  );
}