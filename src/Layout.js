// components/Layout.js
import { Helmet } from 'react-helmet';

const Layout = ({ children, pageTitle }) => {

return (
    <>
    <Helmet>
        <title>{`Parroquia San Luis Gonzaga - ${pageTitle}`}</title>
    </Helmet>
    {children}
    </>
    );
};

export default Layout;