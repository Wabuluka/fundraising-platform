import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCurrentUser } from "../../features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );
  useEffect(() => {
    // If we have a token but no user data, fetch user
    if (token && !user && !loading) {
      dispatch(getCurrentUser());
    }
  }, [token, user, loading, dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
  };
};
