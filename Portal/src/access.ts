import { Department, UserType } from "./utils/constants";

export default function access(initialState: { currentUser?: API.User } | undefined) {
  const { currentUser } = initialState ?? {};

  const canAdmin = currentUser && currentUser?.roles?.includes('Admin');
  const canEditor = canAdmin || (currentUser && currentUser?.roles?.includes('Editor'));

  const admin = initialState && (initialState.currentUser?.roles?.includes('Admin') || initialState.currentUser?.userType === 5);
  const canOnboard = canAdmin || currentUser?.userType === 3;
  const qualityAssurance = canAdmin || (initialState && initialState?.currentUser?.departmentId === Department.QualityAssuranceOffice)
  const training = canAdmin || (initialState && initialState?.currentUser?.departmentId === Department.TrainingDepartment);
  const facultyOfInformationTechnology = canAdmin || (initialState && initialState?.currentUser?.departmentId === Department.FacultyOfInformationTechnology);
  const hod = initialState && initialState.currentUser?.userType === UserType.Manager;

  return {
    canAdmin,
    canEditor,
    admin,
    canOnboard,
    qualityAssurance,
    training,
    facultyOfInformationTechnology,
    hod
  };
};
