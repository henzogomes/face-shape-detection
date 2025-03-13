import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Detect from "./pages/Detect";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAnalytics } from "./hooks/useAnalytics";

// Analytics wrapper component
const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return <>{children}</>;
};

// Layout component that includes Header and Footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Don't show Header and Footer on home page
  if (location.pathname === "/") {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AnalyticsWrapper>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/detect"
              element={
                <Layout>
                  <Detect />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
          </Routes>
        </div>
      </AnalyticsWrapper>
    </Router>
  );
};

export default App;
