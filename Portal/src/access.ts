import { Department } from "./utils/constants";

export default function access(initialState: { currentUser?: API.User } | undefined) {
  const { currentUser } = initialState ?? {};

  const canAdmin = currentUser && currentUser?.roles?.includes('Admin');
  const canEditor = currentUser && currentUser?.roles?.includes('Editor');

  const admin = initialState && initialState.currentUser?.roles?.includes('Admin');
  const canOnboard = canAdmin || currentUser?.userType === 3;
  const qualityAssurance = canAdmin || (initialState && initialState?.currentUser?.departmentId === Department.QualityAssuranceOffice)

  return {
    canAdmin,
    canEditor,
    admin,
    canOnboard,
    qualityAssurance
  };
};
