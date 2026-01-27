export const isAuthenticated = () => {
  return !!localStorage.getItem("loggedInUser");
};

export const logout = () => {
  localStorage.removeItem("loggedInUser");
};
