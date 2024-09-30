export default (initialState: any) => {
  const canSeeAdmin = !!(
    initialState && initialState.name !== 'dontHaveAccess'
  );
  const admin = initialState && initialState.currentUser?.roles?.includes('admin');

  return {
    canSeeAdmin,
    admin
  };
};
