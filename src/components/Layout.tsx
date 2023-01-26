import { Fragment, ReactNode} from 'react';
import Navbar from './Navbar/Navbar';

type LayoutProps = {
    children: ReactNode;
  };

const Layout = ({children}:LayoutProps) => {
  return (
    <Fragment>
      <Navbar />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
