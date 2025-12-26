import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ user, adminOnly = false, children }) {
  const location = useLocation();

  // Chưa đăng nhập → chuyển sang login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Có login nhưng không phải admin
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Đủ quyền → render component
  return children;
}
