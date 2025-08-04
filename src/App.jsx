import React, { Suspense, lazy, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { UserProvider, UserContext } from "./context/UserContext";

// Lazy load components for resilience and faster load
const Feed = lazy(() => import("./Feed"));
const Missions = lazy(() => import("./Missions"));
const Profile = lazy(() => import("./Profile"));
const PurposeTest = lazy(() => import("./PurposeTest"));
const Onboarding = lazy(() => import("./Onboarding"));

// Simple, reactive Loader component for future reuse
const Loader = () => (
  <div className="flex items-center justify-center min-h-[50vh] text-lg font-semibold text-gray-700">
    System loading…
  </div>
);

// Resilient ErrorBoundary for UI recovery
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    window.titanAudit?.("UI_ERROR", {
      error,
      errorInfo,
      time: Date.now()
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <h1 className="text-2xl font-bold text-red-700">System Integrity Breach Detected</h1>
          <p className="text-gray-700 mt-4 mb-6">
            A critical error occurred. Attempting recovery.
          </p>
          <button
            onClick={this.handleReload}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry Now
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Route change audit hook (enhanced with user context trace)
function useAuditRoute() {
  const location = useLocation();
  const { user } = useContext(UserContext) || {};

  useEffect(() => {
    window.titanAudit?.("ROUTE_CHANGE", {
      path: location.pathname,
      time: Date.now(),
      userId: user?.id || "anonymous"
    });
  }, [location, user]);
}

function AppRoutes() {
  useAuditRoute();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/onboarding" replace />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/missions" element={<Missions />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/purpose-test" element={<PurposeTest />} />
      {/* Defensive fallback for ambush/unknown routes */}
      <Route
        path="*"
        element={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-xl font-bold text-gray-800">Unknown Route</h2>
            <p className="text-gray-600 mt-2">Redirecting to onboarding…</p>
            <Navigate to="/onboarding" replace />
          </div>
        }
      />
    </Routes>
  );
}

export default function App() {
  // TITAN telemetry stub with buffer (ready for TITAN-AI audit core injection)
  if (!window.titanAudit) {
    const auditQueue = [];
    window.titanAudit = (event, data) => {
      const payload = { event, ...data };
      auditQueue.push(payload);

      if (process.env.NODE_ENV !== "production") {
        console.debug("[TITAN-AUDIT]", payload);
      }

      // Flush mechanism placeholder
      if (auditQueue.length > 10) {
        // Future: Send to TITAN collector API
        auditQueue.length = 0;
      }
    };
  }

  return (
    <UserProvider>
      <BrowserRouter>
        <div className="min-h-screen pb-14 bg-gray-50">
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <AppRoutes />
              <Navbar />
            </Suspense>
          </ErrorBoundary>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

