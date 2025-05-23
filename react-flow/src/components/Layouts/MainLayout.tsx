import Navbar from '../Navbar';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <article style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header>
        <Navbar />
      </header>
      <main style={{ flexGrow: 1 }}>{children}</main>
      <footer>
        <p>Footer content</p>
      </footer>
    </article>
  );
};
