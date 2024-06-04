import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login-failed" });
    } else navigate("/");
  }, []);

  return <div>{children}</div>;
};

export default AuthLayout;
