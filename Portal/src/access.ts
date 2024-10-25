export default function access(initialState: { currentUser?: API.User } | undefined) {
  const { currentUser } = initialState ?? {};

  const canAdmin = currentUser && currentUser?.roles?.includes('Admin');
  const canEditor = currentUser && currentUser?.roles?.includes('Editor');

  const admin = initialState && initialState.currentUser?.roles?.includes('Admin');

  return {
    canAdmin,
    canEditor,
    admin
  };
};
