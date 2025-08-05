import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";

// Lazy-loaded page components
const Feed = lazy(() => import("./components/Feed"));
const Profile = lazy(() => import("./components/Profile"));
const Missions = lazy(() => import("./components/Missions"));
const PurposeTest = lazy(() => import("./components/PurposeTest"));
const Onboarding = lazy(() => import("./components/Onboarding"));

// Mini fallback loader (can be replaced with spinner or shimmer)
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
    Loading Applica...
  </div>
);

// Global error boundary to catch hard crashes in UI
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("❌ UI Crash Detected:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-red-600 p-8 text-center">
          <h1 className="text-2xl font-bold">Something went wrong.</h1>
          <p className="mt-4">{this.state.error?.message || "Unknown error"}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Route audit for debugging
function useTitanAudit() {
  const location = useLocation();
  useEffect(() => {
    const timestamp = new Date().toISOString();
    console.info(`🛰️ [${timestamp}] Navigated to: ${location.pathname}`);
  }, [location]);
}

function AppRoutes() {
  useTitanAudit();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/purpose-test" element={<PurposeTest />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen bg-white text-gray-900">
            <Navbar />
            <AppRoutes />
          </div>
        </ErrorBoundary>
      </Router>
    </UserProvider>
  );
}
