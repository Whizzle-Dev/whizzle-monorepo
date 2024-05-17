/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  JSON: { input: any; output: any; }
};

export type AbsentEmployeesResponse = {
  __typename?: 'AbsentEmployeesResponse';
  employees: Array<PtoEmployeeRequestModel>;
  totalCount: Scalars['Int']['output'];
};

export enum AccrualType {
  FIXED_NUMBER_PER_MONTH = 'FIXED_NUMBER_PER_MONTH',
  FIXED_NUMBER_PER_YEAR = 'FIXED_NUMBER_PER_YEAR',
  PER_MONTH_START = 'PER_MONTH_START',
  PER_YEAR_START = 'PER_YEAR_START'
}

export type ApprovalRoutingDto = {
  __typename?: 'ApprovalRoutingDto';
  approvingLevels: Array<ApproversLevelDto>;
  assignedEmployees: Array<EmployeeDto>;
  config: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ApproverEntry = {
  approverId: Scalars['Int']['input'];
};

export type ApproversLevelDto = {
  __typename?: 'ApproversLevelDto';
  approvers: Array<EmployeeDto>;
};

export type BankDetailsInput = {
  bankAccountNumber: Scalars['String']['input'];
  bankName: Scalars['String']['input'];
};

export type BankInformationDto = {
  __typename?: 'BankInformationDto';
  bankAccountNumber?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
};

export type BetaAccessInput = {
  company: Scalars['String']['input'];
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
};

export type CheckInStatsDto = {
  __typename?: 'CheckInStatsDto';
  completionRate: Scalars['Float']['output'];
  overdue: Scalars['Int']['output'];
  pending: Scalars['Int']['output'];
};

export type CheckInSubmissionModel = {
  __typename?: 'CheckInSubmissionModel';
  answer?: Maybe<Scalars['String']['output']>;
  createdBy: Scalars['Int']['output'];
  employee: EmployeeDto;
  formElements: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  prettyName: Scalars['String']['output'];
  status: CheckInSubmissionStatus;
  type: CheckInType;
};

export enum CheckInSubmissionStatus {
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED'
}

export type CheckInSubmissionsFiltersInput = {
  status?: InputMaybe<CheckInSubmissionStatus>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

export type CheckInTemplateModel = {
  __typename?: 'CheckInTemplateModel';
  createdBy: Scalars['Int']['output'];
  formElements: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  type: CheckInType;
};

export enum CheckInType {
  DAILY = 'DAILY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY'
}

export type CompanyDto = {
  __typename?: 'CompanyDto';
  businessName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type CreateApprovalRoutingInput = {
  assignedEmployees: Array<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  routing: Array<Routing>;
};

export type CreateCheckInTemplateDto = {
  template: Scalars['String']['input'];
  type: CheckInType;
};

export type CreateDocumentInput = {
  content: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  isPrivate: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateLeaveCategoryInput = {
  daysAllowed: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  policyId: Scalars['Int']['input'];
};

export type CreatePtoRequestInput = {
  categoryId: Scalars['Int']['input'];
  endDate: Scalars['DateTime']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['DateTime']['input'];
};

export type CreateTaskInput = {
  assignedTo?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isBacklog?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTimeEntryInput = {
  description: Scalars['String']['input'];
  endDate: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
  taskId: Scalars['Int']['input'];
};

export type CreateVacationPolicyInput = {
  description: Scalars['String']['input'];
  employees: Array<Scalars['Int']['input']>;
  leaveCategories: Array<LeaveCategoryInput>;
  name: Scalars['String']['input'];
  policyDocument: Scalars['String']['input'];
  publicHolidays: Array<PublicHolidaysInput>;
  workingDays: Array<Scalars['String']['input']>;
};

export type DateRangeInput = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocumentDto = {
  __typename?: 'DocumentDto';
  content: Scalars['JSON']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type EditActiveTimerInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['Int']['input']>;
};

export type EditEmployeeInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  permission: PermissionRoleEnum;
  roleId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

export type EditTimeEntryInput = {
  description: Scalars['String']['input'];
  endDate: Scalars['DateTime']['input'];
  id: Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
  taskId: Scalars['Int']['input'];
};

export type EmployeeDto = {
  __typename?: 'EmployeeDto';
  bankInformation?: Maybe<BankInformationDto>;
  companyId: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  permissionRole: PermissionRoleEnum;
  profilePhotoUrl?: Maybe<Scalars['String']['output']>;
  role?: Maybe<RoleDto>;
  status: EmployeeStatus;
  team?: Maybe<TeamDto>;
};

export type EmployeeFiltersInput = {
  roleId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  DISMISSED = 'DISMISSED',
  EXPIRED = 'EXPIRED',
  INVITED = 'INVITED'
}

export type GetPtoRequestsFilter = {
  employeeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  roleIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status: PtoRequestStatus;
  teamIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type GetTimeEntriesFilters = {
  dateRange?: InputMaybe<DateRangeInput>;
  employeeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  projectIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  teamIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum LeaveAccrualStatus {
  ACCRUED = 'ACCRUED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED'
}

export type LeaveAccrualsDto = {
  __typename?: 'LeaveAccrualsDto';
  accrualDate: Scalars['DateTime']['output'];
  accrualValue: Scalars['Float']['output'];
  cancelReason?: Maybe<Scalars['String']['output']>;
  categoryId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  employee?: Maybe<EmployeeDto>;
  employeeId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  leaveCategoryName?: Maybe<Scalars['String']['output']>;
  status: LeaveAccrualStatus;
  timeOfRequestId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type LeaveCategoryDto = {
  __typename?: 'LeaveCategoryDto';
  daysAllowed: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type LeaveCategoryInput = {
  accrualType: AccrualType;
  daysAllowed: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type LeaveEntitlementDto = {
  __typename?: 'LeaveEntitlementDto';
  categoryId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  remainingDays: Scalars['Float']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvite: EmployeeDto;
  addColumnToProject: Scalars['Boolean']['output'];
  approveRejectPTORequest: Scalars['Boolean']['output'];
  archiveVacationPolicy: Scalars['Boolean']['output'];
  assignApprovalRouting: Scalars['Boolean']['output'];
  assignEmployeeToRole: Scalars['Boolean']['output'];
  assignEmployeeToTask: Scalars['Boolean']['output'];
  assignEmployeeToTeam: Scalars['Boolean']['output'];
  assignEmployeeToVacationPolicy: Scalars['Boolean']['output'];
  cancelInvite: Scalars['Boolean']['output'];
  cancelPTORequest: Scalars['Boolean']['output'];
  createApprovalRouting: Scalars['Boolean']['output'];
  createCheckInTemplate: Scalars['Boolean']['output'];
  createDocument: DocumentDto;
  createLeavesCategory: LeaveCategoryDto;
  createPTORequest: Scalars['Boolean']['output'];
  createProject: ProjectDto;
  createRole: RoleDto;
  createTask: TaskDto;
  createTeam: TeamDto;
  createTimeEntry: TimeEntryDto;
  createVacationPolicy: VacationPolicyDto;
  deleteApprovalRouting: Scalars['Boolean']['output'];
  deleteDocument: Scalars['Boolean']['output'];
  deleteRole: Scalars['Boolean']['output'];
  deleteTeam: Scalars['Boolean']['output'];
  deleteTimeEntry: Scalars['Boolean']['output'];
  editEmployee: Scalars['Boolean']['output'];
  editTimeEntry: TimeEntryDto;
  inviteEmployee: Scalars['Boolean']['output'];
  login: Scalars['String']['output'];
  markAsRead: Scalars['Boolean']['output'];
  mentionEmployee: Scalars['Boolean']['output'];
  removeColumnFromProject: Scalars['Boolean']['output'];
  removeEmployeeFromTeam: Scalars['Boolean']['output'];
  removeUserProfilePhoto: Scalars['Boolean']['output'];
  requestBetaAccess: Scalars['Boolean']['output'];
  resendEmployeeInvite: Scalars['Boolean']['output'];
  saveBankDetails: Scalars['Boolean']['output'];
  saveUserProfilePhoto: Scalars['String']['output'];
  setAsDefault: Scalars['Boolean']['output'];
  signup: Scalars['Boolean']['output'];
  startTimer: Scalars['Boolean']['output'];
  stopTimer: TimeEntryDto;
  submitCheckIn: Scalars['Boolean']['output'];
  updateActiveTimer: Scalars['Boolean']['output'];
  updateApprovalRouting: Scalars['Boolean']['output'];
  updateCheckIn: Scalars['Boolean']['output'];
  updateColumnsForProject: Scalars['Boolean']['output'];
  updateDetails: Scalars['Boolean']['output'];
  updateDocument: Scalars['Boolean']['output'];
  updateRole: RoleDto;
  updateTask: Scalars['Boolean']['output'];
  updateTaskPosition: Scalars['Boolean']['output'];
  updateTeam: Scalars['Boolean']['output'];
  updateVacationPolicy: Scalars['Boolean']['output'];
  verify: Scalars['Boolean']['output'];
};


export type MutationAcceptInviteArgs = {
  inviteCode: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationAddColumnToProjectArgs = {
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
  value: Scalars['String']['input'];
};


export type MutationApproveRejectPtoRequestArgs = {
  accepted: Scalars['Boolean']['input'];
  requestId: Scalars['Int']['input'];
};


export type MutationArchiveVacationPolicyArgs = {
  id: Scalars['Int']['input'];
  value?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationAssignApprovalRoutingArgs = {
  approvalRoutingId: Scalars['Int']['input'];
  employeeIds: Array<Scalars['Int']['input']>;
};


export type MutationAssignEmployeeToRoleArgs = {
  employeeIds: Array<Scalars['Int']['input']>;
  removedIds: Array<Scalars['Int']['input']>;
  roleId: Scalars['Int']['input'];
};


export type MutationAssignEmployeeToTaskArgs = {
  employeeId: Scalars['Int']['input'];
  taskId: Scalars['Int']['input'];
};


export type MutationAssignEmployeeToTeamArgs = {
  employeeIds: Array<Scalars['Int']['input']>;
  removedIds: Array<Scalars['Int']['input']>;
  teamId: Scalars['Int']['input'];
};


export type MutationAssignEmployeeToVacationPolicyArgs = {
  employeeIds: Array<Scalars['Int']['input']>;
  policyId: Scalars['Int']['input'];
  removedIds: Array<Scalars['Int']['input']>;
};


export type MutationCancelInviteArgs = {
  employeeId: Scalars['Int']['input'];
};


export type MutationCancelPtoRequestArgs = {
  requestId: Scalars['Int']['input'];
};


export type MutationCreateApprovalRoutingArgs = {
  input: CreateApprovalRoutingInput;
};


export type MutationCreateCheckInTemplateArgs = {
  payload: CreateCheckInTemplateDto;
};


export type MutationCreateDocumentArgs = {
  input: CreateDocumentInput;
};


export type MutationCreateLeavesCategoryArgs = {
  input: CreateLeaveCategoryInput;
};


export type MutationCreatePtoRequestArgs = {
  input: CreatePtoRequestInput;
};


export type MutationCreateProjectArgs = {
  color: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateRoleArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateTaskArgs = {
  payload: CreateTaskInput;
  projectId: Scalars['Int']['input'];
};


export type MutationCreateTeamArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationCreateTimeEntryArgs = {
  payload: CreateTimeEntryInput;
};


export type MutationCreateVacationPolicyArgs = {
  input: CreateVacationPolicyInput;
};


export type MutationDeleteApprovalRoutingArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteDocumentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTimeEntryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEditEmployeeArgs = {
  employeeId: Scalars['Int']['input'];
  input: EditEmployeeInput;
};


export type MutationEditTimeEntryArgs = {
  payload: EditTimeEntryInput;
};


export type MutationInviteEmployeeArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  permission: PermissionRoleEnum;
  roleId?: InputMaybe<Scalars['Int']['input']>;
  teamId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkAsReadArgs = {
  id: Scalars['Int']['input'];
};


export type MutationMentionEmployeeArgs = {
  documentId: Scalars['Int']['input'];
  employeeId: Scalars['Int']['input'];
};


export type MutationRemoveColumnFromProjectArgs = {
  projectId: Scalars['Int']['input'];
  value: Scalars['String']['input'];
};


export type MutationRemoveEmployeeFromTeamArgs = {
  employeeId: Scalars['Int']['input'];
  teamId: Scalars['Int']['input'];
};


export type MutationRequestBetaAccessArgs = {
  input: BetaAccessInput;
};


export type MutationResendEmployeeInviteArgs = {
  employeeId: Scalars['Int']['input'];
};


export type MutationSaveBankDetailsArgs = {
  bankDetails: BankDetailsInput;
};


export type MutationSaveUserProfilePhotoArgs = {
  fileName: Scalars['String']['input'];
};


export type MutationSetAsDefaultArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationStartTimerArgs = {
  payload: StartTimerInput;
};


export type MutationSubmitCheckInArgs = {
  payload: SubmitCheckInInput;
};


export type MutationUpdateActiveTimerArgs = {
  payload: EditActiveTimerInput;
};


export type MutationUpdateApprovalRoutingArgs = {
  input: UpdateApprovalRoutingInput;
};


export type MutationUpdateCheckInArgs = {
  id: Scalars['Int']['input'];
  payload: UpdateCheckInInput;
};


export type MutationUpdateColumnsForProjectArgs = {
  columns: Array<ProjectColumnInput>;
  projectId: Scalars['Int']['input'];
};


export type MutationUpdateDetailsArgs = {
  personalDetails: UpdateUserInput;
};


export type MutationUpdateDocumentArgs = {
  id: Scalars['Int']['input'];
  input: UpdateDocumentInput;
};


export type MutationUpdateRoleArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateTaskArgs = {
  payload: UpdateTaskInput;
};


export type MutationUpdateTaskPositionArgs = {
  nextCursor?: InputMaybe<Scalars['String']['input']>;
  prevCursor?: InputMaybe<Scalars['String']['input']>;
  taskId: Scalars['Int']['input'];
};


export type MutationUpdateTeamArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateVacationPolicyArgs = {
  input: UpdateVacationPolicyInput;
};


export type MutationVerifyArgs = {
  input: VerificationInput;
};

export type NotificationDto = {
  __typename?: 'NotificationDto';
  createdAt: Scalars['DateTime']['output'];
  eventName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  payload: Scalars['JSON']['output'];
  read: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};

export type PaginatedQueryInput = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type PendingRequestForApprovalDto = {
  __typename?: 'PendingRequestForApprovalDto';
  createdAt: Scalars['DateTime']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  leaveCategoryName: Scalars['String']['output'];
  requestedByName?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: PtoRequestStatus;
  workingDays: Scalars['Float']['output'];
};

export type PendingTimeEntryDto = {
  __typename?: 'PendingTimeEntryDto';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  projectId?: Maybe<Scalars['Int']['output']>;
  startDate: Scalars['DateTime']['output'];
  taskId?: Maybe<Scalars['Int']['output']>;
};

export enum PermissionRoleEnum {
  ACCOUNT_OWNER = 'ACCOUNT_OWNER',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER'
}

export type ProjectColumn = {
  __typename?: 'ProjectColumn';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ProjectColumnDto = {
  __typename?: 'ProjectColumnDto';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ProjectColumnInput = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ProjectDto = {
  __typename?: 'ProjectDto';
  color: Scalars['String']['output'];
  columns?: Maybe<Array<ProjectColumnDto>>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  tasks?: Maybe<Array<TaskDto>>;
};

export type PtoEmployeeRequestModel = {
  __typename?: 'PtoEmployeeRequestModel';
  createdAt: Scalars['DateTime']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  leaveCategoryName: Scalars['String']['output'];
  profilePhotoUrl?: Maybe<Scalars['String']['output']>;
  requestedById: Scalars['Int']['output'];
  requestedByName?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: PtoRequestStatus;
  workingDays: Scalars['Int']['output'];
};

export type PtoRequestApproverDto = {
  __typename?: 'PtoRequestApproverDto';
  employee: EmployeeDto;
  priority: Scalars['Int']['output'];
  status: Scalars['String']['output'];
};

export type PtoRequestDto = {
  __typename?: 'PtoRequestDto';
  approvers: Array<PtoRequestApproverDto>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  ptoCategoryName: Scalars['String']['output'];
  requstedBy?: Maybe<EmployeeDto>;
  startDate: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  workingDays: Scalars['Int']['output'];
};

export enum PtoRequestStatus {
  APPROVED = 'APPROVED',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export type PublicHolidayDto = {
  __typename?: 'PublicHolidayDto';
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type PublicHolidaysInput = {
  date: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  absentEmployees: AbsentEmployeesResponse;
  activeTimer?: Maybe<PendingTimeEntryDto>;
  approvalRoutings: Array<ApprovalRoutingDto>;
  availableStatusesForProject: Array<ProjectColumn>;
  checkInsStatsForEmployee: CheckInStatsDto;
  companyTimeEntries: TimeEntriesPaginatedResponse;
  currentEmployee: EmployeeDto;
  currentUser: UserDto;
  documents: Array<DocumentDto>;
  employees: Array<EmployeeDto>;
  getCheckInSubmission: CheckInSubmissionModel;
  getCheckInTemplates: Array<CheckInTemplateModel>;
  getCompanyCheckIns: Array<CheckInSubmissionModel>;
  getFileUploadUrl: UploadFileModel;
  getLeaveAccrualsForCompany: Array<LeaveAccrualsDto>;
  getLeaveAccrualsForEmployee: Array<LeaveAccrualsDto>;
  getPastCheckIns: Array<CheckInSubmissionModel>;
  getPendingCheckins: Array<CheckInSubmissionModel>;
  getPtoRequestDetails: PtoRequestDto;
  getPtoRequestsForCompany: Array<PtoEmployeeRequestModel>;
  getPtoRequestsForEmployee: Array<PtoEmployeeRequestModel>;
  getRequestsForApproval: Array<PendingRequestForApprovalDto>;
  leaveEntitlements: Array<LeaveEntitlementDto>;
  leavesCategories: Array<LeaveCategoryDto>;
  myDocuments: Array<DocumentDto>;
  myRecentTasks: Array<TaskDto>;
  myTasks: Array<TaskDto>;
  notifications: Array<NotificationDto>;
  project: ProjectDto;
  projects: Array<ProjectDto>;
  recentlyJoinedEmployees: Array<EmployeeDto>;
  recentlyUpdatedDocuments: Array<RecentlyUpdateDocumentDto>;
  role: RoleDto;
  roles: Array<RoleDto>;
  task: TaskDto;
  tasks: Array<TaskDto>;
  team: TeamDto;
  teams: Array<TeamDto>;
  timeEntries: TimeEntriesPaginatedResponse;
  timeTrackedPerEmployee: Array<TimeTrackedPerEmployee>;
  timeTrackedPerProject: Array<TimeTrackedPerProject>;
  timeTrackedPerTeam: Array<TimeTrackedPerTeam>;
  timeTrackingStats: TimeTrackingStatsDto;
  unreadNotificationsCount: Scalars['Int']['output'];
  vacationPolicies: Array<VacationPolicyDto>;
  vacationPolicy: VacationPolicyDto;
};


export type QueryAbsentEmployeesArgs = {
  fromDate: Scalars['DateTime']['input'];
  toDate: Scalars['DateTime']['input'];
};


export type QueryAvailableStatusesForProjectArgs = {
  projectId: Scalars['Int']['input'];
};


export type QueryCompanyTimeEntriesArgs = {
  filters?: InputMaybe<GetTimeEntriesFilters>;
  options?: InputMaybe<PaginatedQueryInput>;
};


export type QueryDocumentsArgs = {
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEmployeesArgs = {
  filters?: InputMaybe<EmployeeFiltersInput>;
};


export type QueryGetCheckInSubmissionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetCompanyCheckInsArgs = {
  filters?: InputMaybe<CheckInSubmissionsFiltersInput>;
  options?: InputMaybe<PaginatedQueryInput>;
};


export type QueryGetFileUploadUrlArgs = {
  fileName: Scalars['String']['input'];
};


export type QueryGetPtoRequestDetailsArgs = {
  requestId: Scalars['Int']['input'];
};


export type QueryGetPtoRequestsForCompanyArgs = {
  filters: GetPtoRequestsFilter;
  options?: InputMaybe<PaginatedQueryInput>;
};


export type QueryGetPtoRequestsForEmployeeArgs = {
  options?: InputMaybe<PaginatedQueryInput>;
};


export type QueryGetRequestsForApprovalArgs = {
  status?: InputMaybe<PtoRequestStatus>;
};


export type QueryMyDocumentsArgs = {
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProjectArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRecentlyUpdatedDocumentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRoleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTaskArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTasksArgs = {
  assignedTo?: InputMaybe<Array<Scalars['Int']['input']>>;
  isBacklog?: InputMaybe<Scalars['Boolean']['input']>;
  projectId?: InputMaybe<Scalars['Int']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTeamArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTimeEntriesArgs = {
  options?: InputMaybe<PaginatedQueryInput>;
};


export type QueryTimeTrackedPerEmployeeArgs = {
  dateRange?: InputMaybe<DateRangeInput>;
};


export type QueryTimeTrackedPerProjectArgs = {
  dateRange?: InputMaybe<DateRangeInput>;
};


export type QueryTimeTrackedPerTeamArgs = {
  dateRange?: InputMaybe<DateRangeInput>;
};


export type QueryVacationPolicyArgs = {
  id: Scalars['Int']['input'];
};

export type RecentlyUpdateDocumentDto = {
  __typename?: 'RecentlyUpdateDocumentDto';
  employeeName?: Maybe<Scalars['String']['output']>;
  employeePhotoUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type RoleDto = {
  __typename?: 'RoleDto';
  description?: Maybe<Scalars['String']['output']>;
  employees?: Maybe<Array<EmployeeDto>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  numberOfEmployees?: Maybe<Scalars['Int']['output']>;
};

export type Routing = {
  approvers: Array<ApproverEntry>;
};

export type SignupInput = {
  businessName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  website: Scalars['String']['input'];
};

export type StartTimerInput = {
  description: Scalars['String']['input'];
  startDate: Scalars['DateTime']['input'];
  taskId: Scalars['Int']['input'];
};

export type SubmitCheckInInput = {
  answers: Scalars['String']['input'];
  checkInId: Scalars['Int']['input'];
};

export type TaskDto = {
  __typename?: 'TaskDto';
  assignedTo?: Maybe<Scalars['Int']['output']>;
  assignedToEmployee?: Maybe<EmployeeDto>;
  createdBy: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isBacklog?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  project?: Maybe<ProjectDto>;
  rank?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type TeamDto = {
  __typename?: 'TeamDto';
  description?: Maybe<Scalars['String']['output']>;
  employees?: Maybe<Array<EmployeeDto>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  numberOfEmployees?: Maybe<Scalars['Int']['output']>;
};

export type TimeEntriesPaginatedResponse = {
  __typename?: 'TimeEntriesPaginatedResponse';
  data: Array<TimeEntryDto>;
  hasNextPage: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
};

export type TimeEntryDto = {
  __typename?: 'TimeEntryDto';
  description?: Maybe<Scalars['String']['output']>;
  employee?: Maybe<EmployeeDto>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  project?: Maybe<ProjectDto>;
  startDate: Scalars['DateTime']['output'];
  task?: Maybe<TaskDto>;
};

export type TimeTrackedPerEmployee = {
  __typename?: 'TimeTrackedPerEmployee';
  employee: EmployeeDto;
  totalMinutes: Scalars['Int']['output'];
};

export type TimeTrackedPerProject = {
  __typename?: 'TimeTrackedPerProject';
  project: ProjectDto;
  totalMinutes: Scalars['Int']['output'];
};

export type TimeTrackedPerTeam = {
  __typename?: 'TimeTrackedPerTeam';
  team: TeamDto;
  totalMinutes: Scalars['Int']['output'];
};

export type TimeTrackingStatsDto = {
  __typename?: 'TimeTrackingStatsDto';
  minutesPercentageDiffFromLastWeek: Scalars['String']['output'];
  mostActiveEmployees: Array<EmployeeDto>;
  totalMinutesThisWeek: Scalars['Int']['output'];
  trendingProject?: Maybe<TrendingProject>;
};

export type TrendingProject = {
  __typename?: 'TrendingProject';
  project: ProjectDto;
  totalMinutes: Scalars['Int']['output'];
};

export type UpdateApprovalRoutingInput = {
  assignedEmployees: Array<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  routing: Array<Routing>;
};

export type UpdateCheckInInput = {
  answers: Scalars['String']['input'];
};

export type UpdateDocumentInput = {
  content: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpdateTaskInput = {
  assignedTo?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  isBacklog?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePhotoFileName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVacationPolicyInput = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  leaveCategories?: InputMaybe<Array<LeaveCategoryInput>>;
  name: Scalars['String']['input'];
  policyDocument: Scalars['String']['input'];
  publicHolidays?: InputMaybe<Array<PublicHolidaysInput>>;
  workingDays?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UploadFileModel = {
  __typename?: 'UploadFileModel';
  fileName: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UserDto = {
  __typename?: 'UserDto';
  address?: Maybe<Scalars['String']['output']>;
  company?: Maybe<CompanyDto>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profilePhotoUrl?: Maybe<Scalars['String']['output']>;
};

export type VacationPolicyDto = {
  __typename?: 'VacationPolicyDto';
  archived: Scalars['Boolean']['output'];
  default: Scalars['Boolean']['output'];
  description: Scalars['String']['output'];
  employees?: Maybe<Array<EmployeeDto>>;
  id: Scalars['Int']['output'];
  leaveCategories?: Maybe<Array<LeaveCategoryDto>>;
  name: Scalars['String']['output'];
  policyDocument?: Maybe<Scalars['String']['output']>;
  publicHolidays?: Maybe<Array<PublicHolidayDto>>;
  workingDays?: Maybe<Array<Scalars['String']['output']>>;
};

export type VerificationInput = {
  verificationToken: Scalars['String']['input'];
};

export type CreateCheckInTemplateMutationVariables = Exact<{
  payload: CreateCheckInTemplateDto;
}>;


export type CreateCheckInTemplateMutation = { __typename?: 'Mutation', createCheckInTemplate: boolean };

export type GetCheckInTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCheckInTemplatesQuery = { __typename?: 'Query', getCheckInTemplates: Array<{ __typename?: 'CheckInTemplateModel', id: number, formElements: string, type: CheckInType, createdBy: number }> };

export type GetPastCheckInsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPastCheckInsQuery = { __typename?: 'Query', getPastCheckIns: Array<{ __typename?: 'CheckInSubmissionModel', id: number, formElements: string, createdBy: number, type: CheckInType, prettyName: string, status: CheckInSubmissionStatus, answer?: string | null, employee: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } }> };

export type GetPendingCheckInsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPendingCheckInsQuery = { __typename?: 'Query', getPendingCheckins: Array<{ __typename?: 'CheckInSubmissionModel', id: number, formElements: string, createdBy: number, type: CheckInType, prettyName: string, status: CheckInSubmissionStatus, answer?: string | null, employee: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } }> };

export type GetCheckInsForCompanyQueryVariables = Exact<{
  options?: InputMaybe<PaginatedQueryInput>;
  filters?: InputMaybe<CheckInSubmissionsFiltersInput>;
}>;


export type GetCheckInsForCompanyQuery = { __typename?: 'Query', getCompanyCheckIns: Array<{ __typename?: 'CheckInSubmissionModel', id: number, formElements: string, createdBy: number, type: CheckInType, prettyName: string, status: CheckInSubmissionStatus, answer?: string | null, employee: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } }> };

export type GetCheckInByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCheckInByIdQuery = { __typename?: 'Query', getCheckInSubmission: { __typename?: 'CheckInSubmissionModel', id: number, formElements: string, createdBy: number, type: CheckInType, prettyName: string, status: CheckInSubmissionStatus, answer?: string | null, employee: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } } };

export type CheckInSubmissionFragment = { __typename?: 'CheckInSubmissionModel', id: number, formElements: string, createdBy: number, type: CheckInType, prettyName: string, status: CheckInSubmissionStatus, answer?: string | null, employee: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } };

export type SubmitCheckInMutationVariables = Exact<{
  payload: SubmitCheckInInput;
}>;


export type SubmitCheckInMutation = { __typename?: 'Mutation', submitCheckIn: boolean };

export type UpdateCheckInSubmissionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  payload: UpdateCheckInInput;
}>;


export type UpdateCheckInSubmissionMutation = { __typename?: 'Mutation', updateCheckIn: boolean };

export type CreateDocumentMutationVariables = Exact<{
  input: CreateDocumentInput;
}>;


export type CreateDocumentMutation = { __typename?: 'Mutation', createDocument: { __typename?: 'DocumentDto', id: number, name: string, content: any } };

export type DeleteDocumentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteDocumentMutation = { __typename?: 'Mutation', deleteDocument: boolean };

export type GetDocumentsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDocumentsQuery = { __typename?: 'Query', documents: Array<{ __typename?: 'DocumentDto', id: number, name: string, content: any }>, myDocuments: Array<{ __typename?: 'DocumentDto', id: number, name: string, content: any }> };

export type MentionEmployeeMutationVariables = Exact<{
  employeeId: Scalars['Int']['input'];
  documentId: Scalars['Int']['input'];
}>;


export type MentionEmployeeMutation = { __typename?: 'Mutation', mentionEmployee: boolean };

export type UpdateDocumentMutationVariables = Exact<{
  input: UpdateDocumentInput;
  id: Scalars['Int']['input'];
}>;


export type UpdateDocumentMutation = { __typename?: 'Mutation', updateDocument: boolean };

export type AcceptInviteMutationVariables = Exact<{
  inviteCode: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AcceptInviteMutation = { __typename?: 'Mutation', acceptInvite: { __typename?: 'EmployeeDto', id: number, email: string } };

export type AssignEmployeeToRoleMutationVariables = Exact<{
  roleId: Scalars['Int']['input'];
  employeeIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  removedIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type AssignEmployeeToRoleMutation = { __typename?: 'Mutation', assignEmployeeToRole: boolean };

export type AssignEmployeeToTeamMutationVariables = Exact<{
  teamId: Scalars['Int']['input'];
  employeeIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  removedIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type AssignEmployeeToTeamMutation = { __typename?: 'Mutation', assignEmployeeToTeam: boolean };

export type CancelInviteMutationVariables = Exact<{
  employeeId: Scalars['Int']['input'];
}>;


export type CancelInviteMutation = { __typename?: 'Mutation', cancelInvite: boolean };

export type CreateRoleMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'RoleDto', id: number, name: string } };

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'TeamDto', id: number, name: string } };

export type DeleteRoleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteRoleMutation = { __typename?: 'Mutation', deleteRole: boolean };

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: boolean };

export type EditEmployeeMutationVariables = Exact<{
  employeeId: Scalars['Int']['input'];
  input: EditEmployeeInput;
}>;


export type EditEmployeeMutation = { __typename?: 'Mutation', editEmployee: boolean };

export type GetEmployeesQueryVariables = Exact<{
  filters?: InputMaybe<EmployeeFiltersInput>;
}>;


export type GetEmployeesQuery = { __typename?: 'Query', employees: Array<{ __typename?: 'EmployeeDto', id: number, email: string, name: string, companyId: number, status: EmployeeStatus, permissionRole: PermissionRoleEnum, profilePhotoUrl?: string | null, team?: { __typename?: 'TeamDto', id: number, name: string } | null, role?: { __typename?: 'RoleDto', id: number, name: string } | null }> };

export type EmployeeFragment = { __typename?: 'EmployeeDto', id: number, email: string, name: string, companyId: number, status: EmployeeStatus, permissionRole: PermissionRoleEnum, profilePhotoUrl?: string | null, team?: { __typename?: 'TeamDto', id: number, name: string } | null, role?: { __typename?: 'RoleDto', id: number, name: string } | null };

export type LightEmployeeFragment = { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'RoleDto', id: number, name: string, description?: string | null, numberOfEmployees?: number | null }> };

export type GetRoleQueryVariables = Exact<{
  roleId: Scalars['Int']['input'];
}>;


export type GetRoleQuery = { __typename?: 'Query', role: { __typename?: 'RoleDto', id: number, name: string, numberOfEmployees?: number | null, employees?: Array<{ __typename?: 'EmployeeDto', id: number, name: string }> | null } };

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'TeamDto', id: number, name: string, description?: string | null, numberOfEmployees?: number | null }> };

export type GetTeamQueryVariables = Exact<{
  teamId: Scalars['Int']['input'];
}>;


export type GetTeamQuery = { __typename?: 'Query', team: { __typename?: 'TeamDto', id: number, name: string, employees?: Array<{ __typename?: 'EmployeeDto', id: number, name: string, email: string }> | null } };

export type InviteEmployeeMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  roleId?: InputMaybe<Scalars['Int']['input']>;
  permission: PermissionRoleEnum;
  teamId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type InviteEmployeeMutation = { __typename?: 'Mutation', inviteEmployee: boolean };

export type RemoveEmployeeFromTeamMutationVariables = Exact<{
  teamId: Scalars['Int']['input'];
  employeeId: Scalars['Int']['input'];
}>;


export type RemoveEmployeeFromTeamMutation = { __typename?: 'Mutation', removeEmployeeFromTeam: boolean };

export type ResendEmployeeInviteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ResendEmployeeInviteMutation = { __typename?: 'Mutation', resendEmployeeInvite: boolean };

export type UpdateRoleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: { __typename?: 'RoleDto', id: number, name: string } };

export type UpdateTeamMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTeamMutation = { __typename?: 'Mutation', updateTeam: boolean };

export type GetAbsentEmployeesQueryVariables = Exact<{
  fromDate: Scalars['DateTime']['input'];
  toDate: Scalars['DateTime']['input'];
}>;


export type GetAbsentEmployeesQuery = { __typename?: 'Query', absentEmployees: { __typename?: 'AbsentEmployeesResponse', totalCount: number, employees: Array<{ __typename?: 'PtoEmployeeRequestModel', id: number, status: PtoRequestStatus, requestedByName?: string | null, workingDays: number, createdAt: Date, startDate: Date, endDate: Date, leaveCategoryName: string, requestedById: number, profilePhotoUrl?: string | null }> } };

export type GetCheckInsStatsForEmployeeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCheckInsStatsForEmployeeQuery = { __typename?: 'Query', checkInsStatsForEmployee: { __typename?: 'CheckInStatsDto', overdue: number, completionRate: number, pending: number } };

export type GetNewJoinersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewJoinersQuery = { __typename?: 'Query', recentlyJoinedEmployees: Array<{ __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null, role?: { __typename?: 'RoleDto', id: number, name: string } | null, team?: { __typename?: 'TeamDto', id: number, name: string } | null }> };

export type GetRecentTasksForEmployeeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentTasksForEmployeeQuery = { __typename?: 'Query', myRecentTasks: Array<{ __typename?: 'TaskDto', id: number, name: string, description?: string | null, assignedTo?: number | null, createdBy: number, status: string, isBacklog?: boolean | null, rank?: string | null, project?: { __typename?: 'ProjectDto', id: number, name: string, color: string } | null, assignedToEmployee?: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } | null }> };

export type GetRecentlyUpdatedDocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentlyUpdatedDocumentsQuery = { __typename?: 'Query', recentlyUpdatedDocuments: Array<{ __typename?: 'RecentlyUpdateDocumentDto', id: number, updatedAt?: Date | null, name: string, employeeName?: string | null, employeePhotoUrl?: string | null }> };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'NotificationDto', id: number, payload: any, createdAt: Date, read: boolean, title: string, eventName: string }> };

export type NotificationFragment = { __typename?: 'NotificationDto', id: number, payload: any, createdAt: Date, read: boolean, title: string, eventName: string };

export type UnreadNotificationsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UnreadNotificationsCountQuery = { __typename?: 'Query', unreadNotificationsCount: number };

export type MarkNotificationAsReadMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markAsRead: boolean };

export type ApproveRejectPtoRequestMutationVariables = Exact<{
  requestId: Scalars['Int']['input'];
  accepted: Scalars['Boolean']['input'];
}>;


export type ApproveRejectPtoRequestMutation = { __typename?: 'Mutation', approveRejectPTORequest: boolean };

export type ArchiveVacationPolicyMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  value?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ArchiveVacationPolicyMutation = { __typename?: 'Mutation', archiveVacationPolicy: boolean };

export type AssignEmployeeToVacationPolicyMutationVariables = Exact<{
  policyId: Scalars['Int']['input'];
  employeeIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  removedIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type AssignEmployeeToVacationPolicyMutation = { __typename?: 'Mutation', assignEmployeeToVacationPolicy: boolean };

export type CancelPtoRequestMutationVariables = Exact<{
  requestId: Scalars['Int']['input'];
}>;


export type CancelPtoRequestMutation = { __typename?: 'Mutation', cancelPTORequest: boolean };

export type CreateApprovalRoutingMutationVariables = Exact<{
  input: CreateApprovalRoutingInput;
}>;


export type CreateApprovalRoutingMutation = { __typename?: 'Mutation', createApprovalRouting: boolean };

export type CreateLeavesCategoryMutationVariables = Exact<{
  input: CreateLeaveCategoryInput;
}>;


export type CreateLeavesCategoryMutation = { __typename?: 'Mutation', createLeavesCategory: { __typename?: 'LeaveCategoryDto', id: number, daysAllowed: number, name: string } };

export type CreatePtoRequestMutationVariables = Exact<{
  input: CreatePtoRequestInput;
}>;


export type CreatePtoRequestMutation = { __typename?: 'Mutation', createPTORequest: boolean };

export type CreateVacationPolicyMutationVariables = Exact<{
  input: CreateVacationPolicyInput;
}>;


export type CreateVacationPolicyMutation = { __typename?: 'Mutation', createVacationPolicy: { __typename?: 'VacationPolicyDto', id: number, description: string, name: string, policyDocument?: string | null, default: boolean, archived: boolean, workingDays?: Array<string> | null, leaveCategories?: Array<{ __typename?: 'LeaveCategoryDto', id: number, name: string, daysAllowed: number }> | null, publicHolidays?: Array<{ __typename?: 'PublicHolidayDto', id: number, name: string, date: Date }> | null, employees?: Array<{ __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null }> | null } };

export type DeleteApprovalRoutingMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteApprovalRoutingMutation = { __typename?: 'Mutation', deleteApprovalRouting: boolean };

export type GetAccrualsForEmployeeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccrualsForEmployeeQuery = { __typename?: 'Query', getLeaveAccrualsForEmployee: Array<{ __typename?: 'LeaveAccrualsDto', id: number, accrualDate: Date, accrualValue: number, cancelReason?: string | null, categoryId: number, description?: string | null, updatedAt?: Date | null, createdAt: Date, timeOfRequestId?: number | null, employeeId: number, status: LeaveAccrualStatus, leaveCategoryName?: string | null, employee?: { __typename?: 'EmployeeDto', id: number, name: string, profilePhotoUrl?: string | null } | null }> };

export type GetLeaveAccrualsForCompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLeaveAccrualsForCompanyQuery = { __typename?: 'Query', getLeaveAccrualsForCompany: Array<{ __typename?: 'LeaveAccrualsDto', id: number, accrualDate: Date, accrualValue: number, cancelReason?: string | null, categoryId: number, description?: string | null, updatedAt?: Date | null, createdAt: Date, timeOfRequestId?: number | null, employeeId: number, status: LeaveAccrualStatus, leaveCategoryName?: string | null, employee?: { __typename?: 'EmployeeDto', id: number, name: string, profilePhotoUrl?: string | null } | null }> };

export type LeaveAccrualFragment = { __typename?: 'LeaveAccrualsDto', id: number, accrualDate: Date, accrualValue: number, cancelReason?: string | null, categoryId: number, description?: string | null, updatedAt?: Date | null, createdAt: Date, timeOfRequestId?: number | null, employeeId: number, status: LeaveAccrualStatus, leaveCategoryName?: string | null, employee?: { __typename?: 'EmployeeDto', id: number, name: string, profilePhotoUrl?: string | null } | null };

export type GetApprovalRequestsQueryVariables = Exact<{
  status?: InputMaybe<PtoRequestStatus>;
}>;


export type GetApprovalRequestsQuery = { __typename?: 'Query', getRequestsForApproval: Array<{ __typename?: 'PendingRequestForApprovalDto', id: number, workingDays: number, status: PtoRequestStatus, createdAt: Date, endDate: Date, startDate: Date, requestedByName?: string | null, leaveCategoryName: string }> };

export type GetApprovalRoutingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApprovalRoutingsQuery = { __typename?: 'Query', approvalRoutings: Array<{ __typename?: 'ApprovalRoutingDto', id: number, name: string, config: string, assignedEmployees: Array<{ __typename?: 'EmployeeDto', id: number, profilePhotoUrl?: string | null, name: string }>, approvingLevels: Array<{ __typename?: 'ApproversLevelDto', approvers: Array<{ __typename?: 'EmployeeDto', id: number, profilePhotoUrl?: string | null, name: string }> }> }> };

export type ApprovalRoutingFragment = { __typename?: 'ApprovalRoutingDto', id: number, name: string, config: string, assignedEmployees: Array<{ __typename?: 'EmployeeDto', id: number, profilePhotoUrl?: string | null, name: string }>, approvingLevels: Array<{ __typename?: 'ApproversLevelDto', approvers: Array<{ __typename?: 'EmployeeDto', id: number, profilePhotoUrl?: string | null, name: string }> }> };

export type GetLeaveCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLeaveCategoriesQuery = { __typename?: 'Query', leavesCategories: Array<{ __typename?: 'LeaveCategoryDto', id: number, daysAllowed: number, name: string }> };

export type GetLeaveEntitlementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLeaveEntitlementsQuery = { __typename?: 'Query', leaveEntitlements: Array<{ __typename?: 'LeaveEntitlementDto', name: string, remainingDays: number, categoryId: number }> };

export type GetPtoRequestsDetailQueryVariables = Exact<{
  requestId: Scalars['Int']['input'];
}>;


export type GetPtoRequestsDetailQuery = { __typename?: 'Query', getPtoRequestDetails: { __typename?: 'PtoRequestDto', id: number, startDate: Date, endDate: Date, status: string, workingDays: number, ptoCategoryName: string, approvers: Array<{ __typename?: 'PtoRequestApproverDto', status: string, priority: number, employee: { __typename?: 'EmployeeDto', id: number, name: string, profilePhotoUrl?: string | null } }>, requstedBy?: { __typename?: 'EmployeeDto', id: number, name: string, profilePhotoUrl?: string | null } | null } };

export type PtoRequestFragmentFragment = { __typename?: 'PtoRequestDto', id: number, startDate: Date, endDate: Date, status: string, workingDays: number, ptoCategoryName: string, approvers: Array<{ __typename?: 'PtoRequestApproverDto', status: string, priority: number, employee: { __typename?: 'EmployeeDto', id: number, name: string, profilePhotoUrl?: string | null } }>, requstedBy?: { __typename?: 'EmployeeDto', id: number, name: string, profilePhotoUrl?: string | null } | null };

export type GetPtoRequestsForEmployeeQueryVariables = Exact<{
  options?: InputMaybe<PaginatedQueryInput>;
}>;


export type GetPtoRequestsForEmployeeQuery = { __typename?: 'Query', getPtoRequestsForEmployee: Array<{ __typename?: 'PtoEmployeeRequestModel', id: number, startDate: Date, endDate: Date, status: PtoRequestStatus, createdAt: Date, requestedById: number, workingDays: number, leaveCategoryName: string }> };

export type GetPtoRequestsForCompanyQueryVariables = Exact<{
  options?: InputMaybe<PaginatedQueryInput>;
  filters: GetPtoRequestsFilter;
}>;


export type GetPtoRequestsForCompanyQuery = { __typename?: 'Query', getPtoRequestsForCompany: Array<{ __typename?: 'PtoEmployeeRequestModel', id: number, startDate: Date, endDate: Date, status: PtoRequestStatus, createdAt: Date, requestedById: number, workingDays: number, leaveCategoryName: string, requestedByName?: string | null }> };

export type GetVacationPoliciesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVacationPoliciesQuery = { __typename?: 'Query', vacationPolicies: Array<{ __typename?: 'VacationPolicyDto', id: number, description: string, name: string, policyDocument?: string | null, default: boolean, archived: boolean, workingDays?: Array<string> | null, leaveCategories?: Array<{ __typename?: 'LeaveCategoryDto', id: number, name: string, daysAllowed: number }> | null, publicHolidays?: Array<{ __typename?: 'PublicHolidayDto', id: number, name: string, date: Date }> | null, employees?: Array<{ __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null }> | null }> };

export type GetVacationPolicyQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetVacationPolicyQuery = { __typename?: 'Query', vacationPolicy: { __typename?: 'VacationPolicyDto', id: number, description: string, name: string, policyDocument?: string | null, default: boolean, archived: boolean, workingDays?: Array<string> | null, leaveCategories?: Array<{ __typename?: 'LeaveCategoryDto', id: number, name: string, daysAllowed: number }> | null, publicHolidays?: Array<{ __typename?: 'PublicHolidayDto', id: number, name: string, date: Date }> | null, employees?: Array<{ __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null }> | null } };

export type VacationPolicyFragment = { __typename?: 'VacationPolicyDto', id: number, description: string, name: string, policyDocument?: string | null, default: boolean, archived: boolean, workingDays?: Array<string> | null, leaveCategories?: Array<{ __typename?: 'LeaveCategoryDto', id: number, name: string, daysAllowed: number }> | null, publicHolidays?: Array<{ __typename?: 'PublicHolidayDto', id: number, name: string, date: Date }> | null, employees?: Array<{ __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null }> | null };

export type SetVacationPolicyAsDefaultMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type SetVacationPolicyAsDefaultMutation = { __typename?: 'Mutation', setAsDefault: boolean };

export type UpdateApprovalRoutingMutationVariables = Exact<{
  input: UpdateApprovalRoutingInput;
}>;


export type UpdateApprovalRoutingMutation = { __typename?: 'Mutation', updateApprovalRouting: boolean };

export type UpdateVacationPolicyMutationVariables = Exact<{
  input: UpdateVacationPolicyInput;
}>;


export type UpdateVacationPolicyMutation = { __typename?: 'Mutation', updateVacationPolicy: boolean };

export type CreateManualTimeEntryMutationVariables = Exact<{
  payload: CreateTimeEntryInput;
}>;


export type CreateManualTimeEntryMutation = { __typename?: 'Mutation', createTimeEntry: { __typename?: 'TimeEntryDto', id: number, description?: string | null, startDate: Date, endDate: Date, task?: { __typename?: 'TaskDto', id: number, name: string } | null, project?: { __typename?: 'ProjectDto', id: number, name: string } | null } };

export type DeleteTimeEntryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteTimeEntryMutation = { __typename?: 'Mutation', deleteTimeEntry: boolean };

export type EditTimeEntryMutationVariables = Exact<{
  payload: EditTimeEntryInput;
}>;


export type EditTimeEntryMutation = { __typename?: 'Mutation', editTimeEntry: { __typename?: 'TimeEntryDto', id: number, description?: string | null, startDate: Date, endDate: Date, task?: { __typename?: 'TaskDto', id: number, name: string } | null, project?: { __typename?: 'ProjectDto', id: number, name: string } | null } };

export type GetActiveTimerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveTimerQuery = { __typename?: 'Query', activeTimer?: { __typename?: 'PendingTimeEntryDto', id: number, description?: string | null, startDate: Date, taskId?: number | null, projectId?: number | null } | null };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'ProjectDto', id: number, name: string, description: string, color: string }> };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  isBacklog: Scalars['Boolean']['input'];
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  assignedTo?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type GetProjectQuery = { __typename?: 'Query', project: { __typename?: 'ProjectDto', id: number, name: string, description: string, color: string, columns?: Array<{ __typename?: 'ProjectColumnDto', name: string, value: string }> | null }, tasks: Array<{ __typename?: 'TaskDto', id: number, name: string, description?: string | null, assignedTo?: number | null, createdBy: number, status: string, isBacklog?: boolean | null, rank?: string | null, assignedToEmployee?: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } | null }> };

export type ProjectFragment = { __typename?: 'ProjectDto', id: number, name: string, description: string, color: string };

export type GetTasksQueryVariables = Exact<{
  projectId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'TaskDto', id: number, name: string, description?: string | null, assignedTo?: number | null, createdBy: number, status: string, isBacklog?: boolean | null, rank?: string | null, assignedToEmployee?: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } | null }> };

export type GetMyTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTasksQuery = { __typename?: 'Query', myTasks: Array<{ __typename?: 'TaskDto', id: number, name: string, description?: string | null, assignedTo?: number | null, createdBy: number, status: string, isBacklog?: boolean | null, rank?: string | null, project?: { __typename?: 'ProjectDto', id: number, name: string, color: string } | null, assignedToEmployee?: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } | null }> };

export type GetAvailableStatusesForProjectQueryVariables = Exact<{
  projectId: Scalars['Int']['input'];
}>;


export type GetAvailableStatusesForProjectQuery = { __typename?: 'Query', availableStatusesForProject: Array<{ __typename?: 'ProjectColumn', value: string, name: string }> };

export type LiteTaskFragment = { __typename?: 'TaskDto', id: number, name: string };

export type TaskFragment = { __typename?: 'TaskDto', id: number, name: string, description?: string | null, assignedTo?: number | null, createdBy: number, status: string, isBacklog?: boolean | null, rank?: string | null, assignedToEmployee?: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } | null };

export type TaskWithProjectFragment = { __typename?: 'TaskDto', id: number, name: string, description?: string | null, assignedTo?: number | null, createdBy: number, status: string, isBacklog?: boolean | null, rank?: string | null, project?: { __typename?: 'ProjectDto', id: number, name: string, color: string } | null, assignedToEmployee?: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } | null };

export type GetTaskQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetTaskQuery = { __typename?: 'Query', task: { __typename?: 'TaskDto', id: number, name: string, description?: string | null, assignedTo?: number | null, createdBy: number, status: string, isBacklog?: boolean | null, rank?: string | null, project?: { __typename?: 'ProjectDto', id: number, name: string, color: string } | null, assignedToEmployee?: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } | null } };

export type GetTimeEntriesQueryVariables = Exact<{
  options?: InputMaybe<PaginatedQueryInput>;
}>;


export type GetTimeEntriesQuery = { __typename?: 'Query', timeEntries: { __typename?: 'TimeEntriesPaginatedResponse', hasNextPage: boolean, totalCount: number, data: Array<{ __typename?: 'TimeEntryDto', id: number, description?: string | null, startDate: Date, endDate: Date, task?: { __typename?: 'TaskDto', id: number, name: string } | null, project?: { __typename?: 'ProjectDto', id: number, name: string } | null, employee?: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } | null }> } };

export type GetCompanyTimeEntriesQueryVariables = Exact<{
  options?: InputMaybe<PaginatedQueryInput>;
  filters?: InputMaybe<GetTimeEntriesFilters>;
}>;


export type GetCompanyTimeEntriesQuery = { __typename?: 'Query', companyTimeEntries: { __typename?: 'TimeEntriesPaginatedResponse', hasNextPage: boolean, totalCount: number, data: Array<{ __typename?: 'TimeEntryDto', id: number, description?: string | null, startDate: Date, endDate: Date, task?: { __typename?: 'TaskDto', id: number, name: string } | null, project?: { __typename?: 'ProjectDto', id: number, name: string } | null, employee?: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } | null }> } };

export type TimeTrackingStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type TimeTrackingStatsQuery = { __typename?: 'Query', timeTrackingStats: { __typename?: 'TimeTrackingStatsDto', totalMinutesThisWeek: number, minutesPercentageDiffFromLastWeek: string, trendingProject?: { __typename?: 'TrendingProject', totalMinutes: number, project: { __typename?: 'ProjectDto', id: number, name: string } } | null, mostActiveEmployees: Array<{ __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null }> } };

export type TimeTrackedPerProjectQueryVariables = Exact<{
  dateRange?: InputMaybe<DateRangeInput>;
}>;


export type TimeTrackedPerProjectQuery = { __typename?: 'Query', timeTrackedPerProject: Array<{ __typename?: 'TimeTrackedPerProject', totalMinutes: number, project: { __typename?: 'ProjectDto', id: number, name: string } }> };

export type TimeTrackedPerTeamQueryVariables = Exact<{
  dateRange?: InputMaybe<DateRangeInput>;
}>;


export type TimeTrackedPerTeamQuery = { __typename?: 'Query', timeTrackedPerTeam: Array<{ __typename?: 'TimeTrackedPerTeam', totalMinutes: number, team: { __typename?: 'TeamDto', id: number, name: string } }> };

export type TimeTrackedPerEmployeeQueryVariables = Exact<{
  dateRange?: InputMaybe<DateRangeInput>;
}>;


export type TimeTrackedPerEmployeeQuery = { __typename?: 'Query', timeTrackedPerEmployee: Array<{ __typename?: 'TimeTrackedPerEmployee', totalMinutes: number, employee: { __typename?: 'EmployeeDto', id: number, name: string } }> };

export type TimeEntryFragment = { __typename?: 'TimeEntryDto', id: number, description?: string | null, startDate: Date, endDate: Date, task?: { __typename?: 'TaskDto', id: number, name: string } | null, project?: { __typename?: 'ProjectDto', id: number, name: string } | null, employee?: { __typename?: 'EmployeeDto', id: number, email: string, name: string, profilePhotoUrl?: string | null } | null };

export type CreateProjectMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  color: Scalars['String']['input'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'ProjectDto', id: number, name: string } };

export type AddColumnMutationVariables = Exact<{
  projectId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
}>;


export type AddColumnMutation = { __typename?: 'Mutation', addColumnToProject: boolean };

export type RemoveColumnMutationVariables = Exact<{
  projectId: Scalars['Int']['input'];
  value: Scalars['String']['input'];
}>;


export type RemoveColumnMutation = { __typename?: 'Mutation', removeColumnFromProject: boolean };

export type UpdateColumnsMutationVariables = Exact<{
  projectId: Scalars['Int']['input'];
  columns: Array<ProjectColumnInput> | ProjectColumnInput;
}>;


export type UpdateColumnsMutation = { __typename?: 'Mutation', updateColumnsForProject: boolean };

export type StartTimerMutationVariables = Exact<{
  payload: StartTimerInput;
}>;


export type StartTimerMutation = { __typename?: 'Mutation', startTimer: boolean };

export type StopTimerMutationVariables = Exact<{ [key: string]: never; }>;


export type StopTimerMutation = { __typename?: 'Mutation', stopTimer: { __typename?: 'TimeEntryDto', id: number, description?: string | null, startDate: Date, endDate: Date, task?: { __typename?: 'TaskDto', id: number, name: string } | null } };

export type CreateTaskMutationVariables = Exact<{
  payload: CreateTaskInput;
  projectId: Scalars['Int']['input'];
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'TaskDto', id: number, name: string } };

export type UpdateTaskMutationVariables = Exact<{
  payload: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: boolean };

export type UpdateTaskPositionMutationVariables = Exact<{
  taskId: Scalars['Int']['input'];
  prevCursor?: InputMaybe<Scalars['String']['input']>;
  nextCursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTaskPositionMutation = { __typename?: 'Mutation', updateTaskPosition: boolean };

export type UpdateActiveTimerMutationVariables = Exact<{
  payload: EditActiveTimerInput;
}>;


export type UpdateActiveTimerMutation = { __typename?: 'Mutation', updateActiveTimer: boolean };

export type RequestBetaAccessMutationVariables = Exact<{
  input: BetaAccessInput;
}>;


export type RequestBetaAccessMutation = { __typename?: 'Mutation', requestBetaAccess: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'UserDto', id: number, email: string, name?: string | null, phoneNumber?: string | null, dateOfBirth?: Date | null, address?: string | null, profilePhotoUrl?: string | null, company?: { __typename?: 'CompanyDto', website?: string | null, id: number, businessName: string } | null }, currentEmployee: { __typename?: 'EmployeeDto', id: number, permissionRole: PermissionRoleEnum, bankInformation?: { __typename?: 'BankInformationDto', bankName?: string | null, bankAccountNumber?: string | null } | null, role?: { __typename?: 'RoleDto', id: number, name: string } | null, team?: { __typename?: 'TeamDto', id: number, name: string } | null } };

export type GetFileUploadUrlQueryVariables = Exact<{
  fileName: Scalars['String']['input'];
}>;


export type GetFileUploadUrlQuery = { __typename?: 'Query', getFileUploadUrl: { __typename?: 'UploadFileModel', url: string, fileName: string } };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: string };

export type SaveUserDetailsMutationVariables = Exact<{
  personalDetails: UpdateUserInput;
}>;


export type SaveUserDetailsMutation = { __typename?: 'Mutation', updateDetails: boolean };

export type SaveBankDetailsMutationVariables = Exact<{
  bankDetails: BankDetailsInput;
}>;


export type SaveBankDetailsMutation = { __typename?: 'Mutation', saveBankDetails: boolean };

export type DeleteUserProfilePhotoMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserProfilePhotoMutation = { __typename?: 'Mutation', removeUserProfilePhoto: boolean };

export type SaveUserProfilePhotoMutationVariables = Exact<{
  fileName: Scalars['String']['input'];
}>;


export type SaveUserProfilePhotoMutation = { __typename?: 'Mutation', saveUserProfilePhoto: string };

export type SignupUserMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signup: boolean };

export type VerifyUserMutationVariables = Exact<{
  input: VerificationInput;
}>;


export type VerifyUserMutation = { __typename?: 'Mutation', verify: boolean };

export const LightEmployeeFragmentDoc = gql`
    fragment LightEmployee on EmployeeDto {
  id
  email
  name
  profilePhotoUrl
}
    `;
export const CheckInSubmissionFragmentDoc = gql`
    fragment CheckInSubmission on CheckInSubmissionModel {
  id
  formElements
  createdBy
  type
  prettyName
  status
  formElements
  answer
  employee {
    ...LightEmployee
  }
}
    ${LightEmployeeFragmentDoc}`;
export const EmployeeFragmentDoc = gql`
    fragment Employee on EmployeeDto {
  id
  email
  name
  companyId
  status
  team {
    id
    name
  }
  role {
    id
    name
  }
  permissionRole
  profilePhotoUrl
}
    `;
export const NotificationFragmentDoc = gql`
    fragment Notification on NotificationDto {
  id
  payload
  createdAt
  read
  title
  eventName
}
    `;
export const LeaveAccrualFragmentDoc = gql`
    fragment LeaveAccrual on LeaveAccrualsDto {
  id
  accrualDate
  accrualValue
  cancelReason
  categoryId
  description
  updatedAt
  createdAt
  timeOfRequestId
  employeeId
  status
  leaveCategoryName
  employee {
    id
    name
    profilePhotoUrl
  }
}
    `;
export const ApprovalRoutingFragmentDoc = gql`
    fragment ApprovalRouting on ApprovalRoutingDto {
  id
  name
  config
  assignedEmployees {
    id
    profilePhotoUrl
    name
  }
  approvingLevels {
    approvers {
      id
      profilePhotoUrl
      name
    }
  }
}
    `;
export const PtoRequestFragmentFragmentDoc = gql`
    fragment PtoRequestFragment on PtoRequestDto {
  approvers {
    employee {
      id
      name
      profilePhotoUrl
    }
    status
    priority
  }
  id
  startDate
  endDate
  status
  workingDays
  requstedBy {
    id
    name
    profilePhotoUrl
  }
  ptoCategoryName
}
    `;
export const VacationPolicyFragmentDoc = gql`
    fragment VacationPolicy on VacationPolicyDto {
  id
  description
  name
  policyDocument
  default
  archived
  leaveCategories {
    id
    name
    daysAllowed
  }
  publicHolidays {
    id
    name
    date
  }
  workingDays
  employees {
    ...LightEmployee
  }
}
    ${LightEmployeeFragmentDoc}`;
export const ProjectFragmentDoc = gql`
    fragment Project on ProjectDto {
  id
  name
  description
  color
}
    `;
export const LiteTaskFragmentDoc = gql`
    fragment LiteTask on TaskDto {
  id
  name
}
    `;
export const TaskFragmentDoc = gql`
    fragment Task on TaskDto {
  id
  name
  description
  assignedTo
  createdBy
  status
  isBacklog
  rank
  assignedToEmployee {
    ...LightEmployee
  }
}
    ${LightEmployeeFragmentDoc}`;
export const TaskWithProjectFragmentDoc = gql`
    fragment TaskWithProject on TaskDto {
  ...Task
  project {
    id
    name
    color
  }
}
    ${TaskFragmentDoc}`;
export const TimeEntryFragmentDoc = gql`
    fragment TimeEntry on TimeEntryDto {
  id
  description
  startDate
  endDate
  task {
    id
    name
  }
  project {
    id
    name
  }
  employee {
    ...LightEmployee
  }
}
    ${LightEmployeeFragmentDoc}`;
export const CreateCheckInTemplateDocument = gql`
    mutation CreateCheckInTemplate($payload: CreateCheckInTemplateDto!) {
  createCheckInTemplate(payload: $payload)
}
    `;
export type CreateCheckInTemplateMutationFn = Apollo.MutationFunction<CreateCheckInTemplateMutation, CreateCheckInTemplateMutationVariables>;

/**
 * __useCreateCheckInTemplateMutation__
 *
 * To run a mutation, you first call `useCreateCheckInTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCheckInTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCheckInTemplateMutation, { data, loading, error }] = useCreateCheckInTemplateMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateCheckInTemplateMutation(baseOptions?: Apollo.MutationHookOptions<CreateCheckInTemplateMutation, CreateCheckInTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCheckInTemplateMutation, CreateCheckInTemplateMutationVariables>(CreateCheckInTemplateDocument, options);
      }
export type CreateCheckInTemplateMutationHookResult = ReturnType<typeof useCreateCheckInTemplateMutation>;
export type CreateCheckInTemplateMutationResult = Apollo.MutationResult<CreateCheckInTemplateMutation>;
export type CreateCheckInTemplateMutationOptions = Apollo.BaseMutationOptions<CreateCheckInTemplateMutation, CreateCheckInTemplateMutationVariables>;
export const GetCheckInTemplatesDocument = gql`
    query GetCheckInTemplates {
  getCheckInTemplates {
    id
    formElements
    type
    createdBy
  }
}
    `;

/**
 * __useGetCheckInTemplatesQuery__
 *
 * To run a query within a React component, call `useGetCheckInTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCheckInTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCheckInTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCheckInTemplatesQuery(baseOptions?: Apollo.QueryHookOptions<GetCheckInTemplatesQuery, GetCheckInTemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCheckInTemplatesQuery, GetCheckInTemplatesQueryVariables>(GetCheckInTemplatesDocument, options);
      }
export function useGetCheckInTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCheckInTemplatesQuery, GetCheckInTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCheckInTemplatesQuery, GetCheckInTemplatesQueryVariables>(GetCheckInTemplatesDocument, options);
        }
export function useGetCheckInTemplatesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCheckInTemplatesQuery, GetCheckInTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCheckInTemplatesQuery, GetCheckInTemplatesQueryVariables>(GetCheckInTemplatesDocument, options);
        }
export type GetCheckInTemplatesQueryHookResult = ReturnType<typeof useGetCheckInTemplatesQuery>;
export type GetCheckInTemplatesLazyQueryHookResult = ReturnType<typeof useGetCheckInTemplatesLazyQuery>;
export type GetCheckInTemplatesSuspenseQueryHookResult = ReturnType<typeof useGetCheckInTemplatesSuspenseQuery>;
export type GetCheckInTemplatesQueryResult = Apollo.QueryResult<GetCheckInTemplatesQuery, GetCheckInTemplatesQueryVariables>;
export const GetPastCheckInsDocument = gql`
    query GetPastCheckIns {
  getPastCheckIns {
    ...CheckInSubmission
  }
}
    ${CheckInSubmissionFragmentDoc}`;

/**
 * __useGetPastCheckInsQuery__
 *
 * To run a query within a React component, call `useGetPastCheckInsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastCheckInsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastCheckInsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPastCheckInsQuery(baseOptions?: Apollo.QueryHookOptions<GetPastCheckInsQuery, GetPastCheckInsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPastCheckInsQuery, GetPastCheckInsQueryVariables>(GetPastCheckInsDocument, options);
      }
export function useGetPastCheckInsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPastCheckInsQuery, GetPastCheckInsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPastCheckInsQuery, GetPastCheckInsQueryVariables>(GetPastCheckInsDocument, options);
        }
export function useGetPastCheckInsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPastCheckInsQuery, GetPastCheckInsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPastCheckInsQuery, GetPastCheckInsQueryVariables>(GetPastCheckInsDocument, options);
        }
export type GetPastCheckInsQueryHookResult = ReturnType<typeof useGetPastCheckInsQuery>;
export type GetPastCheckInsLazyQueryHookResult = ReturnType<typeof useGetPastCheckInsLazyQuery>;
export type GetPastCheckInsSuspenseQueryHookResult = ReturnType<typeof useGetPastCheckInsSuspenseQuery>;
export type GetPastCheckInsQueryResult = Apollo.QueryResult<GetPastCheckInsQuery, GetPastCheckInsQueryVariables>;
export const GetPendingCheckInsDocument = gql`
    query GetPendingCheckIns {
  getPendingCheckins {
    ...CheckInSubmission
  }
}
    ${CheckInSubmissionFragmentDoc}`;

/**
 * __useGetPendingCheckInsQuery__
 *
 * To run a query within a React component, call `useGetPendingCheckInsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingCheckInsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingCheckInsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPendingCheckInsQuery(baseOptions?: Apollo.QueryHookOptions<GetPendingCheckInsQuery, GetPendingCheckInsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPendingCheckInsQuery, GetPendingCheckInsQueryVariables>(GetPendingCheckInsDocument, options);
      }
export function useGetPendingCheckInsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPendingCheckInsQuery, GetPendingCheckInsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPendingCheckInsQuery, GetPendingCheckInsQueryVariables>(GetPendingCheckInsDocument, options);
        }
export function useGetPendingCheckInsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPendingCheckInsQuery, GetPendingCheckInsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPendingCheckInsQuery, GetPendingCheckInsQueryVariables>(GetPendingCheckInsDocument, options);
        }
export type GetPendingCheckInsQueryHookResult = ReturnType<typeof useGetPendingCheckInsQuery>;
export type GetPendingCheckInsLazyQueryHookResult = ReturnType<typeof useGetPendingCheckInsLazyQuery>;
export type GetPendingCheckInsSuspenseQueryHookResult = ReturnType<typeof useGetPendingCheckInsSuspenseQuery>;
export type GetPendingCheckInsQueryResult = Apollo.QueryResult<GetPendingCheckInsQuery, GetPendingCheckInsQueryVariables>;
export const GetCheckInsForCompanyDocument = gql`
    query GetCheckInsForCompany($options: PaginatedQueryInput, $filters: CheckInSubmissionsFiltersInput) {
  getCompanyCheckIns(filters: $filters, options: $options) {
    ...CheckInSubmission
  }
}
    ${CheckInSubmissionFragmentDoc}`;

/**
 * __useGetCheckInsForCompanyQuery__
 *
 * To run a query within a React component, call `useGetCheckInsForCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCheckInsForCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCheckInsForCompanyQuery({
 *   variables: {
 *      options: // value for 'options'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetCheckInsForCompanyQuery(baseOptions?: Apollo.QueryHookOptions<GetCheckInsForCompanyQuery, GetCheckInsForCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCheckInsForCompanyQuery, GetCheckInsForCompanyQueryVariables>(GetCheckInsForCompanyDocument, options);
      }
export function useGetCheckInsForCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCheckInsForCompanyQuery, GetCheckInsForCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCheckInsForCompanyQuery, GetCheckInsForCompanyQueryVariables>(GetCheckInsForCompanyDocument, options);
        }
export function useGetCheckInsForCompanySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCheckInsForCompanyQuery, GetCheckInsForCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCheckInsForCompanyQuery, GetCheckInsForCompanyQueryVariables>(GetCheckInsForCompanyDocument, options);
        }
export type GetCheckInsForCompanyQueryHookResult = ReturnType<typeof useGetCheckInsForCompanyQuery>;
export type GetCheckInsForCompanyLazyQueryHookResult = ReturnType<typeof useGetCheckInsForCompanyLazyQuery>;
export type GetCheckInsForCompanySuspenseQueryHookResult = ReturnType<typeof useGetCheckInsForCompanySuspenseQuery>;
export type GetCheckInsForCompanyQueryResult = Apollo.QueryResult<GetCheckInsForCompanyQuery, GetCheckInsForCompanyQueryVariables>;
export const GetCheckInByIdDocument = gql`
    query GetCheckInById($id: Int!) {
  getCheckInSubmission(id: $id) {
    ...CheckInSubmission
  }
}
    ${CheckInSubmissionFragmentDoc}`;

/**
 * __useGetCheckInByIdQuery__
 *
 * To run a query within a React component, call `useGetCheckInByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCheckInByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCheckInByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCheckInByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCheckInByIdQuery, GetCheckInByIdQueryVariables> & ({ variables: GetCheckInByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCheckInByIdQuery, GetCheckInByIdQueryVariables>(GetCheckInByIdDocument, options);
      }
export function useGetCheckInByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCheckInByIdQuery, GetCheckInByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCheckInByIdQuery, GetCheckInByIdQueryVariables>(GetCheckInByIdDocument, options);
        }
export function useGetCheckInByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCheckInByIdQuery, GetCheckInByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCheckInByIdQuery, GetCheckInByIdQueryVariables>(GetCheckInByIdDocument, options);
        }
export type GetCheckInByIdQueryHookResult = ReturnType<typeof useGetCheckInByIdQuery>;
export type GetCheckInByIdLazyQueryHookResult = ReturnType<typeof useGetCheckInByIdLazyQuery>;
export type GetCheckInByIdSuspenseQueryHookResult = ReturnType<typeof useGetCheckInByIdSuspenseQuery>;
export type GetCheckInByIdQueryResult = Apollo.QueryResult<GetCheckInByIdQuery, GetCheckInByIdQueryVariables>;
export const SubmitCheckInDocument = gql`
    mutation SubmitCheckIn($payload: SubmitCheckInInput!) {
  submitCheckIn(payload: $payload)
}
    `;
export type SubmitCheckInMutationFn = Apollo.MutationFunction<SubmitCheckInMutation, SubmitCheckInMutationVariables>;

/**
 * __useSubmitCheckInMutation__
 *
 * To run a mutation, you first call `useSubmitCheckInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitCheckInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitCheckInMutation, { data, loading, error }] = useSubmitCheckInMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useSubmitCheckInMutation(baseOptions?: Apollo.MutationHookOptions<SubmitCheckInMutation, SubmitCheckInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitCheckInMutation, SubmitCheckInMutationVariables>(SubmitCheckInDocument, options);
      }
export type SubmitCheckInMutationHookResult = ReturnType<typeof useSubmitCheckInMutation>;
export type SubmitCheckInMutationResult = Apollo.MutationResult<SubmitCheckInMutation>;
export type SubmitCheckInMutationOptions = Apollo.BaseMutationOptions<SubmitCheckInMutation, SubmitCheckInMutationVariables>;
export const UpdateCheckInSubmissionDocument = gql`
    mutation UpdateCheckInSubmission($id: Int!, $payload: UpdateCheckInInput!) {
  updateCheckIn(id: $id, payload: $payload)
}
    `;
export type UpdateCheckInSubmissionMutationFn = Apollo.MutationFunction<UpdateCheckInSubmissionMutation, UpdateCheckInSubmissionMutationVariables>;

/**
 * __useUpdateCheckInSubmissionMutation__
 *
 * To run a mutation, you first call `useUpdateCheckInSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckInSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckInSubmissionMutation, { data, loading, error }] = useUpdateCheckInSubmissionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateCheckInSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCheckInSubmissionMutation, UpdateCheckInSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCheckInSubmissionMutation, UpdateCheckInSubmissionMutationVariables>(UpdateCheckInSubmissionDocument, options);
      }
export type UpdateCheckInSubmissionMutationHookResult = ReturnType<typeof useUpdateCheckInSubmissionMutation>;
export type UpdateCheckInSubmissionMutationResult = Apollo.MutationResult<UpdateCheckInSubmissionMutation>;
export type UpdateCheckInSubmissionMutationOptions = Apollo.BaseMutationOptions<UpdateCheckInSubmissionMutation, UpdateCheckInSubmissionMutationVariables>;
export const CreateDocumentDocument = gql`
    mutation CreateDocument($input: CreateDocumentInput!) {
  createDocument(input: $input) {
    id
    name
    content
  }
}
    `;
export type CreateDocumentMutationFn = Apollo.MutationFunction<CreateDocumentMutation, CreateDocumentMutationVariables>;

/**
 * __useCreateDocumentMutation__
 *
 * To run a mutation, you first call `useCreateDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDocumentMutation, { data, loading, error }] = useCreateDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDocumentMutation(baseOptions?: Apollo.MutationHookOptions<CreateDocumentMutation, CreateDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDocumentMutation, CreateDocumentMutationVariables>(CreateDocumentDocument, options);
      }
export type CreateDocumentMutationHookResult = ReturnType<typeof useCreateDocumentMutation>;
export type CreateDocumentMutationResult = Apollo.MutationResult<CreateDocumentMutation>;
export type CreateDocumentMutationOptions = Apollo.BaseMutationOptions<CreateDocumentMutation, CreateDocumentMutationVariables>;
export const DeleteDocumentDocument = gql`
    mutation DeleteDocument($id: Int!) {
  deleteDocument(id: $id)
}
    `;
export type DeleteDocumentMutationFn = Apollo.MutationFunction<DeleteDocumentMutation, DeleteDocumentMutationVariables>;

/**
 * __useDeleteDocumentMutation__
 *
 * To run a mutation, you first call `useDeleteDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDocumentMutation, { data, loading, error }] = useDeleteDocumentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDocumentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDocumentMutation, DeleteDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDocumentMutation, DeleteDocumentMutationVariables>(DeleteDocumentDocument, options);
      }
export type DeleteDocumentMutationHookResult = ReturnType<typeof useDeleteDocumentMutation>;
export type DeleteDocumentMutationResult = Apollo.MutationResult<DeleteDocumentMutation>;
export type DeleteDocumentMutationOptions = Apollo.BaseMutationOptions<DeleteDocumentMutation, DeleteDocumentMutationVariables>;
export const GetDocumentsDocument = gql`
    query GetDocuments($sort: String) {
  documents(sort: $sort) {
    id
    name
    content
  }
  myDocuments(sort: $sort) {
    id
    name
    content
  }
}
    `;

/**
 * __useGetDocumentsQuery__
 *
 * To run a query within a React component, call `useGetDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentsQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetDocumentsQuery(baseOptions?: Apollo.QueryHookOptions<GetDocumentsQuery, GetDocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentsQuery, GetDocumentsQueryVariables>(GetDocumentsDocument, options);
      }
export function useGetDocumentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDocumentsQuery, GetDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentsQuery, GetDocumentsQueryVariables>(GetDocumentsDocument, options);
        }
export function useGetDocumentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDocumentsQuery, GetDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDocumentsQuery, GetDocumentsQueryVariables>(GetDocumentsDocument, options);
        }
export type GetDocumentsQueryHookResult = ReturnType<typeof useGetDocumentsQuery>;
export type GetDocumentsLazyQueryHookResult = ReturnType<typeof useGetDocumentsLazyQuery>;
export type GetDocumentsSuspenseQueryHookResult = ReturnType<typeof useGetDocumentsSuspenseQuery>;
export type GetDocumentsQueryResult = Apollo.QueryResult<GetDocumentsQuery, GetDocumentsQueryVariables>;
export const MentionEmployeeDocument = gql`
    mutation MentionEmployee($employeeId: Int!, $documentId: Int!) {
  mentionEmployee(employeeId: $employeeId, documentId: $documentId)
}
    `;
export type MentionEmployeeMutationFn = Apollo.MutationFunction<MentionEmployeeMutation, MentionEmployeeMutationVariables>;

/**
 * __useMentionEmployeeMutation__
 *
 * To run a mutation, you first call `useMentionEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMentionEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mentionEmployeeMutation, { data, loading, error }] = useMentionEmployeeMutation({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *      documentId: // value for 'documentId'
 *   },
 * });
 */
export function useMentionEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<MentionEmployeeMutation, MentionEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MentionEmployeeMutation, MentionEmployeeMutationVariables>(MentionEmployeeDocument, options);
      }
export type MentionEmployeeMutationHookResult = ReturnType<typeof useMentionEmployeeMutation>;
export type MentionEmployeeMutationResult = Apollo.MutationResult<MentionEmployeeMutation>;
export type MentionEmployeeMutationOptions = Apollo.BaseMutationOptions<MentionEmployeeMutation, MentionEmployeeMutationVariables>;
export const UpdateDocumentDocument = gql`
    mutation UpdateDocument($input: UpdateDocumentInput!, $id: Int!) {
  updateDocument(input: $input, id: $id)
}
    `;
export type UpdateDocumentMutationFn = Apollo.MutationFunction<UpdateDocumentMutation, UpdateDocumentMutationVariables>;

/**
 * __useUpdateDocumentMutation__
 *
 * To run a mutation, you first call `useUpdateDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDocumentMutation, { data, loading, error }] = useUpdateDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateDocumentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDocumentMutation, UpdateDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDocumentMutation, UpdateDocumentMutationVariables>(UpdateDocumentDocument, options);
      }
export type UpdateDocumentMutationHookResult = ReturnType<typeof useUpdateDocumentMutation>;
export type UpdateDocumentMutationResult = Apollo.MutationResult<UpdateDocumentMutation>;
export type UpdateDocumentMutationOptions = Apollo.BaseMutationOptions<UpdateDocumentMutation, UpdateDocumentMutationVariables>;
export const AcceptInviteDocument = gql`
    mutation AcceptInvite($inviteCode: String!, $password: String!) {
  acceptInvite(inviteCode: $inviteCode, password: $password) {
    id
    email
  }
}
    `;
export type AcceptInviteMutationFn = Apollo.MutationFunction<AcceptInviteMutation, AcceptInviteMutationVariables>;

/**
 * __useAcceptInviteMutation__
 *
 * To run a mutation, you first call `useAcceptInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInviteMutation, { data, loading, error }] = useAcceptInviteMutation({
 *   variables: {
 *      inviteCode: // value for 'inviteCode'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAcceptInviteMutation(baseOptions?: Apollo.MutationHookOptions<AcceptInviteMutation, AcceptInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptInviteMutation, AcceptInviteMutationVariables>(AcceptInviteDocument, options);
      }
export type AcceptInviteMutationHookResult = ReturnType<typeof useAcceptInviteMutation>;
export type AcceptInviteMutationResult = Apollo.MutationResult<AcceptInviteMutation>;
export type AcceptInviteMutationOptions = Apollo.BaseMutationOptions<AcceptInviteMutation, AcceptInviteMutationVariables>;
export const AssignEmployeeToRoleDocument = gql`
    mutation AssignEmployeeToRole($roleId: Int!, $employeeIds: [Int!]!, $removedIds: [Int!]!) {
  assignEmployeeToRole(
    roleId: $roleId
    employeeIds: $employeeIds
    removedIds: $removedIds
  )
}
    `;
export type AssignEmployeeToRoleMutationFn = Apollo.MutationFunction<AssignEmployeeToRoleMutation, AssignEmployeeToRoleMutationVariables>;

/**
 * __useAssignEmployeeToRoleMutation__
 *
 * To run a mutation, you first call `useAssignEmployeeToRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignEmployeeToRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignEmployeeToRoleMutation, { data, loading, error }] = useAssignEmployeeToRoleMutation({
 *   variables: {
 *      roleId: // value for 'roleId'
 *      employeeIds: // value for 'employeeIds'
 *      removedIds: // value for 'removedIds'
 *   },
 * });
 */
export function useAssignEmployeeToRoleMutation(baseOptions?: Apollo.MutationHookOptions<AssignEmployeeToRoleMutation, AssignEmployeeToRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignEmployeeToRoleMutation, AssignEmployeeToRoleMutationVariables>(AssignEmployeeToRoleDocument, options);
      }
export type AssignEmployeeToRoleMutationHookResult = ReturnType<typeof useAssignEmployeeToRoleMutation>;
export type AssignEmployeeToRoleMutationResult = Apollo.MutationResult<AssignEmployeeToRoleMutation>;
export type AssignEmployeeToRoleMutationOptions = Apollo.BaseMutationOptions<AssignEmployeeToRoleMutation, AssignEmployeeToRoleMutationVariables>;
export const AssignEmployeeToTeamDocument = gql`
    mutation AssignEmployeeToTeam($teamId: Int!, $employeeIds: [Int!]!, $removedIds: [Int!]!) {
  assignEmployeeToTeam(
    teamId: $teamId
    employeeIds: $employeeIds
    removedIds: $removedIds
  )
}
    `;
export type AssignEmployeeToTeamMutationFn = Apollo.MutationFunction<AssignEmployeeToTeamMutation, AssignEmployeeToTeamMutationVariables>;

/**
 * __useAssignEmployeeToTeamMutation__
 *
 * To run a mutation, you first call `useAssignEmployeeToTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignEmployeeToTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignEmployeeToTeamMutation, { data, loading, error }] = useAssignEmployeeToTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      employeeIds: // value for 'employeeIds'
 *      removedIds: // value for 'removedIds'
 *   },
 * });
 */
export function useAssignEmployeeToTeamMutation(baseOptions?: Apollo.MutationHookOptions<AssignEmployeeToTeamMutation, AssignEmployeeToTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignEmployeeToTeamMutation, AssignEmployeeToTeamMutationVariables>(AssignEmployeeToTeamDocument, options);
      }
export type AssignEmployeeToTeamMutationHookResult = ReturnType<typeof useAssignEmployeeToTeamMutation>;
export type AssignEmployeeToTeamMutationResult = Apollo.MutationResult<AssignEmployeeToTeamMutation>;
export type AssignEmployeeToTeamMutationOptions = Apollo.BaseMutationOptions<AssignEmployeeToTeamMutation, AssignEmployeeToTeamMutationVariables>;
export const CancelInviteDocument = gql`
    mutation CancelInvite($employeeId: Int!) {
  cancelInvite(employeeId: $employeeId)
}
    `;
export type CancelInviteMutationFn = Apollo.MutationFunction<CancelInviteMutation, CancelInviteMutationVariables>;

/**
 * __useCancelInviteMutation__
 *
 * To run a mutation, you first call `useCancelInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelInviteMutation, { data, loading, error }] = useCancelInviteMutation({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useCancelInviteMutation(baseOptions?: Apollo.MutationHookOptions<CancelInviteMutation, CancelInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelInviteMutation, CancelInviteMutationVariables>(CancelInviteDocument, options);
      }
export type CancelInviteMutationHookResult = ReturnType<typeof useCancelInviteMutation>;
export type CancelInviteMutationResult = Apollo.MutationResult<CancelInviteMutation>;
export type CancelInviteMutationOptions = Apollo.BaseMutationOptions<CancelInviteMutation, CancelInviteMutationVariables>;
export const CreateRoleDocument = gql`
    mutation CreateRole($name: String!, $description: String) {
  createRole(name: $name, description: $description) {
    id
    name
  }
}
    `;
export type CreateRoleMutationFn = Apollo.MutationFunction<CreateRoleMutation, CreateRoleMutationVariables>;

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoleMutation, CreateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, options);
      }
export type CreateRoleMutationHookResult = ReturnType<typeof useCreateRoleMutation>;
export type CreateRoleMutationResult = Apollo.MutationResult<CreateRoleMutation>;
export type CreateRoleMutationOptions = Apollo.BaseMutationOptions<CreateRoleMutation, CreateRoleMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!, $description: String!) {
  createTeam(name: $name, description: $description) {
    id
    name
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const DeleteRoleDocument = gql`
    mutation DeleteRole($id: Int!) {
  deleteRole(id: $id)
}
    `;
export type DeleteRoleMutationFn = Apollo.MutationFunction<DeleteRoleMutation, DeleteRoleMutationVariables>;

/**
 * __useDeleteRoleMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoleMutation, { data, loading, error }] = useDeleteRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoleMutation, DeleteRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(DeleteRoleDocument, options);
      }
export type DeleteRoleMutationHookResult = ReturnType<typeof useDeleteRoleMutation>;
export type DeleteRoleMutationResult = Apollo.MutationResult<DeleteRoleMutation>;
export type DeleteRoleMutationOptions = Apollo.BaseMutationOptions<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($id: Int!) {
  deleteTeam(id: $id)
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const EditEmployeeDocument = gql`
    mutation EditEmployee($employeeId: Int!, $input: EditEmployeeInput!) {
  editEmployee(employeeId: $employeeId, input: $input)
}
    `;
export type EditEmployeeMutationFn = Apollo.MutationFunction<EditEmployeeMutation, EditEmployeeMutationVariables>;

/**
 * __useEditEmployeeMutation__
 *
 * To run a mutation, you first call `useEditEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEmployeeMutation, { data, loading, error }] = useEditEmployeeMutation({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<EditEmployeeMutation, EditEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditEmployeeMutation, EditEmployeeMutationVariables>(EditEmployeeDocument, options);
      }
export type EditEmployeeMutationHookResult = ReturnType<typeof useEditEmployeeMutation>;
export type EditEmployeeMutationResult = Apollo.MutationResult<EditEmployeeMutation>;
export type EditEmployeeMutationOptions = Apollo.BaseMutationOptions<EditEmployeeMutation, EditEmployeeMutationVariables>;
export const GetEmployeesDocument = gql`
    query GetEmployees($filters: EmployeeFiltersInput) {
  employees(filters: $filters) {
    ...Employee
  }
}
    ${EmployeeFragmentDoc}`;

/**
 * __useGetEmployeesQuery__
 *
 * To run a query within a React component, call `useGetEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetEmployeesQuery(baseOptions?: Apollo.QueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, options);
      }
export function useGetEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, options);
        }
export function useGetEmployeesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, options);
        }
export type GetEmployeesQueryHookResult = ReturnType<typeof useGetEmployeesQuery>;
export type GetEmployeesLazyQueryHookResult = ReturnType<typeof useGetEmployeesLazyQuery>;
export type GetEmployeesSuspenseQueryHookResult = ReturnType<typeof useGetEmployeesSuspenseQuery>;
export type GetEmployeesQueryResult = Apollo.QueryResult<GetEmployeesQuery, GetEmployeesQueryVariables>;
export const GetRolesDocument = gql`
    query GetRoles {
  roles {
    id
    name
    description
    numberOfEmployees
  }
}
    `;

/**
 * __useGetRolesQuery__
 *
 * To run a query within a React component, call `useGetRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRolesQuery(baseOptions?: Apollo.QueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
      }
export function useGetRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
        }
export function useGetRolesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
        }
export type GetRolesQueryHookResult = ReturnType<typeof useGetRolesQuery>;
export type GetRolesLazyQueryHookResult = ReturnType<typeof useGetRolesLazyQuery>;
export type GetRolesSuspenseQueryHookResult = ReturnType<typeof useGetRolesSuspenseQuery>;
export type GetRolesQueryResult = Apollo.QueryResult<GetRolesQuery, GetRolesQueryVariables>;
export const GetRoleDocument = gql`
    query GetRole($roleId: Int!) {
  role(id: $roleId) {
    id
    name
    numberOfEmployees
    employees {
      id
      name
    }
  }
}
    `;

/**
 * __useGetRoleQuery__
 *
 * To run a query within a React component, call `useGetRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleQuery({
 *   variables: {
 *      roleId: // value for 'roleId'
 *   },
 * });
 */
export function useGetRoleQuery(baseOptions: Apollo.QueryHookOptions<GetRoleQuery, GetRoleQueryVariables> & ({ variables: GetRoleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
      }
export function useGetRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
        }
export function useGetRoleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
        }
export type GetRoleQueryHookResult = ReturnType<typeof useGetRoleQuery>;
export type GetRoleLazyQueryHookResult = ReturnType<typeof useGetRoleLazyQuery>;
export type GetRoleSuspenseQueryHookResult = ReturnType<typeof useGetRoleSuspenseQuery>;
export type GetRoleQueryResult = Apollo.QueryResult<GetRoleQuery, GetRoleQueryVariables>;
export const GetTeamsDocument = gql`
    query GetTeams {
  teams {
    id
    name
    description
    numberOfEmployees
  }
}
    `;

/**
 * __useGetTeamsQuery__
 *
 * To run a query within a React component, call `useGetTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
      }
export function useGetTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export function useGetTeamsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export type GetTeamsQueryHookResult = ReturnType<typeof useGetTeamsQuery>;
export type GetTeamsLazyQueryHookResult = ReturnType<typeof useGetTeamsLazyQuery>;
export type GetTeamsSuspenseQueryHookResult = ReturnType<typeof useGetTeamsSuspenseQuery>;
export type GetTeamsQueryResult = Apollo.QueryResult<GetTeamsQuery, GetTeamsQueryVariables>;
export const GetTeamDocument = gql`
    query GetTeam($teamId: Int!) {
  team(id: $teamId) {
    id
    name
    employees {
      id
      name
      email
    }
  }
}
    `;

/**
 * __useGetTeamQuery__
 *
 * To run a query within a React component, call `useGetTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetTeamQuery(baseOptions: Apollo.QueryHookOptions<GetTeamQuery, GetTeamQueryVariables> & ({ variables: GetTeamQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
      }
export function useGetTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export function useGetTeamSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export type GetTeamQueryHookResult = ReturnType<typeof useGetTeamQuery>;
export type GetTeamLazyQueryHookResult = ReturnType<typeof useGetTeamLazyQuery>;
export type GetTeamSuspenseQueryHookResult = ReturnType<typeof useGetTeamSuspenseQuery>;
export type GetTeamQueryResult = Apollo.QueryResult<GetTeamQuery, GetTeamQueryVariables>;
export const InviteEmployeeDocument = gql`
    mutation InviteEmployee($email: String!, $name: String!, $roleId: Int, $permission: PermissionRoleEnum!, $teamId: Int) {
  inviteEmployee(
    email: $email
    name: $name
    roleId: $roleId
    permission: $permission
    teamId: $teamId
  )
}
    `;
export type InviteEmployeeMutationFn = Apollo.MutationFunction<InviteEmployeeMutation, InviteEmployeeMutationVariables>;

/**
 * __useInviteEmployeeMutation__
 *
 * To run a mutation, you first call `useInviteEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteEmployeeMutation, { data, loading, error }] = useInviteEmployeeMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      roleId: // value for 'roleId'
 *      permission: // value for 'permission'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useInviteEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<InviteEmployeeMutation, InviteEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteEmployeeMutation, InviteEmployeeMutationVariables>(InviteEmployeeDocument, options);
      }
export type InviteEmployeeMutationHookResult = ReturnType<typeof useInviteEmployeeMutation>;
export type InviteEmployeeMutationResult = Apollo.MutationResult<InviteEmployeeMutation>;
export type InviteEmployeeMutationOptions = Apollo.BaseMutationOptions<InviteEmployeeMutation, InviteEmployeeMutationVariables>;
export const RemoveEmployeeFromTeamDocument = gql`
    mutation RemoveEmployeeFromTeam($teamId: Int!, $employeeId: Int!) {
  removeEmployeeFromTeam(teamId: $teamId, employeeId: $employeeId)
}
    `;
export type RemoveEmployeeFromTeamMutationFn = Apollo.MutationFunction<RemoveEmployeeFromTeamMutation, RemoveEmployeeFromTeamMutationVariables>;

/**
 * __useRemoveEmployeeFromTeamMutation__
 *
 * To run a mutation, you first call `useRemoveEmployeeFromTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEmployeeFromTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEmployeeFromTeamMutation, { data, loading, error }] = useRemoveEmployeeFromTeamMutation({
 *   variables: {
 *      teamId: // value for 'teamId'
 *      employeeId: // value for 'employeeId'
 *   },
 * });
 */
export function useRemoveEmployeeFromTeamMutation(baseOptions?: Apollo.MutationHookOptions<RemoveEmployeeFromTeamMutation, RemoveEmployeeFromTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveEmployeeFromTeamMutation, RemoveEmployeeFromTeamMutationVariables>(RemoveEmployeeFromTeamDocument, options);
      }
export type RemoveEmployeeFromTeamMutationHookResult = ReturnType<typeof useRemoveEmployeeFromTeamMutation>;
export type RemoveEmployeeFromTeamMutationResult = Apollo.MutationResult<RemoveEmployeeFromTeamMutation>;
export type RemoveEmployeeFromTeamMutationOptions = Apollo.BaseMutationOptions<RemoveEmployeeFromTeamMutation, RemoveEmployeeFromTeamMutationVariables>;
export const ResendEmployeeInviteDocument = gql`
    mutation ResendEmployeeInvite($id: Int!) {
  resendEmployeeInvite(employeeId: $id)
}
    `;
export type ResendEmployeeInviteMutationFn = Apollo.MutationFunction<ResendEmployeeInviteMutation, ResendEmployeeInviteMutationVariables>;

/**
 * __useResendEmployeeInviteMutation__
 *
 * To run a mutation, you first call `useResendEmployeeInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendEmployeeInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendEmployeeInviteMutation, { data, loading, error }] = useResendEmployeeInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResendEmployeeInviteMutation(baseOptions?: Apollo.MutationHookOptions<ResendEmployeeInviteMutation, ResendEmployeeInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendEmployeeInviteMutation, ResendEmployeeInviteMutationVariables>(ResendEmployeeInviteDocument, options);
      }
export type ResendEmployeeInviteMutationHookResult = ReturnType<typeof useResendEmployeeInviteMutation>;
export type ResendEmployeeInviteMutationResult = Apollo.MutationResult<ResendEmployeeInviteMutation>;
export type ResendEmployeeInviteMutationOptions = Apollo.BaseMutationOptions<ResendEmployeeInviteMutation, ResendEmployeeInviteMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation UpdateRole($id: Int!, $name: String!, $description: String) {
  updateRole(name: $name, description: $description, id: $id) {
    id
    name
  }
}
    `;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($id: Int!, $name: String!, $description: String) {
  updateTeam(name: $name, description: $description, id: $id)
}
    `;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const GetAbsentEmployeesDocument = gql`
    query GetAbsentEmployees($fromDate: DateTime!, $toDate: DateTime!) {
  absentEmployees(fromDate: $fromDate, toDate: $toDate) {
    totalCount
    employees {
      id
      status
      requestedByName
      workingDays
      createdAt
      startDate
      endDate
      leaveCategoryName
      requestedById
      profilePhotoUrl
    }
  }
}
    `;

/**
 * __useGetAbsentEmployeesQuery__
 *
 * To run a query within a React component, call `useGetAbsentEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAbsentEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAbsentEmployeesQuery({
 *   variables: {
 *      fromDate: // value for 'fromDate'
 *      toDate: // value for 'toDate'
 *   },
 * });
 */
export function useGetAbsentEmployeesQuery(baseOptions: Apollo.QueryHookOptions<GetAbsentEmployeesQuery, GetAbsentEmployeesQueryVariables> & ({ variables: GetAbsentEmployeesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAbsentEmployeesQuery, GetAbsentEmployeesQueryVariables>(GetAbsentEmployeesDocument, options);
      }
export function useGetAbsentEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAbsentEmployeesQuery, GetAbsentEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAbsentEmployeesQuery, GetAbsentEmployeesQueryVariables>(GetAbsentEmployeesDocument, options);
        }
export function useGetAbsentEmployeesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAbsentEmployeesQuery, GetAbsentEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAbsentEmployeesQuery, GetAbsentEmployeesQueryVariables>(GetAbsentEmployeesDocument, options);
        }
export type GetAbsentEmployeesQueryHookResult = ReturnType<typeof useGetAbsentEmployeesQuery>;
export type GetAbsentEmployeesLazyQueryHookResult = ReturnType<typeof useGetAbsentEmployeesLazyQuery>;
export type GetAbsentEmployeesSuspenseQueryHookResult = ReturnType<typeof useGetAbsentEmployeesSuspenseQuery>;
export type GetAbsentEmployeesQueryResult = Apollo.QueryResult<GetAbsentEmployeesQuery, GetAbsentEmployeesQueryVariables>;
export const GetCheckInsStatsForEmployeeDocument = gql`
    query GetCheckInsStatsForEmployee {
  checkInsStatsForEmployee {
    overdue
    completionRate
    pending
  }
}
    `;

/**
 * __useGetCheckInsStatsForEmployeeQuery__
 *
 * To run a query within a React component, call `useGetCheckInsStatsForEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCheckInsStatsForEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCheckInsStatsForEmployeeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCheckInsStatsForEmployeeQuery(baseOptions?: Apollo.QueryHookOptions<GetCheckInsStatsForEmployeeQuery, GetCheckInsStatsForEmployeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCheckInsStatsForEmployeeQuery, GetCheckInsStatsForEmployeeQueryVariables>(GetCheckInsStatsForEmployeeDocument, options);
      }
export function useGetCheckInsStatsForEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCheckInsStatsForEmployeeQuery, GetCheckInsStatsForEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCheckInsStatsForEmployeeQuery, GetCheckInsStatsForEmployeeQueryVariables>(GetCheckInsStatsForEmployeeDocument, options);
        }
export function useGetCheckInsStatsForEmployeeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCheckInsStatsForEmployeeQuery, GetCheckInsStatsForEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCheckInsStatsForEmployeeQuery, GetCheckInsStatsForEmployeeQueryVariables>(GetCheckInsStatsForEmployeeDocument, options);
        }
export type GetCheckInsStatsForEmployeeQueryHookResult = ReturnType<typeof useGetCheckInsStatsForEmployeeQuery>;
export type GetCheckInsStatsForEmployeeLazyQueryHookResult = ReturnType<typeof useGetCheckInsStatsForEmployeeLazyQuery>;
export type GetCheckInsStatsForEmployeeSuspenseQueryHookResult = ReturnType<typeof useGetCheckInsStatsForEmployeeSuspenseQuery>;
export type GetCheckInsStatsForEmployeeQueryResult = Apollo.QueryResult<GetCheckInsStatsForEmployeeQuery, GetCheckInsStatsForEmployeeQueryVariables>;
export const GetNewJoinersDocument = gql`
    query GetNewJoiners {
  recentlyJoinedEmployees {
    ...LightEmployee
    role {
      id
      name
    }
    team {
      id
      name
    }
  }
}
    ${LightEmployeeFragmentDoc}`;

/**
 * __useGetNewJoinersQuery__
 *
 * To run a query within a React component, call `useGetNewJoinersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewJoinersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewJoinersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNewJoinersQuery(baseOptions?: Apollo.QueryHookOptions<GetNewJoinersQuery, GetNewJoinersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNewJoinersQuery, GetNewJoinersQueryVariables>(GetNewJoinersDocument, options);
      }
export function useGetNewJoinersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNewJoinersQuery, GetNewJoinersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNewJoinersQuery, GetNewJoinersQueryVariables>(GetNewJoinersDocument, options);
        }
export function useGetNewJoinersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetNewJoinersQuery, GetNewJoinersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNewJoinersQuery, GetNewJoinersQueryVariables>(GetNewJoinersDocument, options);
        }
export type GetNewJoinersQueryHookResult = ReturnType<typeof useGetNewJoinersQuery>;
export type GetNewJoinersLazyQueryHookResult = ReturnType<typeof useGetNewJoinersLazyQuery>;
export type GetNewJoinersSuspenseQueryHookResult = ReturnType<typeof useGetNewJoinersSuspenseQuery>;
export type GetNewJoinersQueryResult = Apollo.QueryResult<GetNewJoinersQuery, GetNewJoinersQueryVariables>;
export const GetRecentTasksForEmployeeDocument = gql`
    query GetRecentTasksForEmployee {
  myRecentTasks {
    ...TaskWithProject
  }
}
    ${TaskWithProjectFragmentDoc}`;

/**
 * __useGetRecentTasksForEmployeeQuery__
 *
 * To run a query within a React component, call `useGetRecentTasksForEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentTasksForEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentTasksForEmployeeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecentTasksForEmployeeQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentTasksForEmployeeQuery, GetRecentTasksForEmployeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentTasksForEmployeeQuery, GetRecentTasksForEmployeeQueryVariables>(GetRecentTasksForEmployeeDocument, options);
      }
export function useGetRecentTasksForEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentTasksForEmployeeQuery, GetRecentTasksForEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentTasksForEmployeeQuery, GetRecentTasksForEmployeeQueryVariables>(GetRecentTasksForEmployeeDocument, options);
        }
export function useGetRecentTasksForEmployeeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRecentTasksForEmployeeQuery, GetRecentTasksForEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRecentTasksForEmployeeQuery, GetRecentTasksForEmployeeQueryVariables>(GetRecentTasksForEmployeeDocument, options);
        }
export type GetRecentTasksForEmployeeQueryHookResult = ReturnType<typeof useGetRecentTasksForEmployeeQuery>;
export type GetRecentTasksForEmployeeLazyQueryHookResult = ReturnType<typeof useGetRecentTasksForEmployeeLazyQuery>;
export type GetRecentTasksForEmployeeSuspenseQueryHookResult = ReturnType<typeof useGetRecentTasksForEmployeeSuspenseQuery>;
export type GetRecentTasksForEmployeeQueryResult = Apollo.QueryResult<GetRecentTasksForEmployeeQuery, GetRecentTasksForEmployeeQueryVariables>;
export const GetRecentlyUpdatedDocumentsDocument = gql`
    query GetRecentlyUpdatedDocuments {
  recentlyUpdatedDocuments {
    id
    updatedAt
    name
    employeeName
    employeePhotoUrl
  }
}
    `;

/**
 * __useGetRecentlyUpdatedDocumentsQuery__
 *
 * To run a query within a React component, call `useGetRecentlyUpdatedDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentlyUpdatedDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentlyUpdatedDocumentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecentlyUpdatedDocumentsQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentlyUpdatedDocumentsQuery, GetRecentlyUpdatedDocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentlyUpdatedDocumentsQuery, GetRecentlyUpdatedDocumentsQueryVariables>(GetRecentlyUpdatedDocumentsDocument, options);
      }
export function useGetRecentlyUpdatedDocumentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentlyUpdatedDocumentsQuery, GetRecentlyUpdatedDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentlyUpdatedDocumentsQuery, GetRecentlyUpdatedDocumentsQueryVariables>(GetRecentlyUpdatedDocumentsDocument, options);
        }
export function useGetRecentlyUpdatedDocumentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetRecentlyUpdatedDocumentsQuery, GetRecentlyUpdatedDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRecentlyUpdatedDocumentsQuery, GetRecentlyUpdatedDocumentsQueryVariables>(GetRecentlyUpdatedDocumentsDocument, options);
        }
export type GetRecentlyUpdatedDocumentsQueryHookResult = ReturnType<typeof useGetRecentlyUpdatedDocumentsQuery>;
export type GetRecentlyUpdatedDocumentsLazyQueryHookResult = ReturnType<typeof useGetRecentlyUpdatedDocumentsLazyQuery>;
export type GetRecentlyUpdatedDocumentsSuspenseQueryHookResult = ReturnType<typeof useGetRecentlyUpdatedDocumentsSuspenseQuery>;
export type GetRecentlyUpdatedDocumentsQueryResult = Apollo.QueryResult<GetRecentlyUpdatedDocumentsQuery, GetRecentlyUpdatedDocumentsQueryVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications {
  notifications {
    ...Notification
  }
}
    ${NotificationFragmentDoc}`;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export function useGetNotificationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsSuspenseQueryHookResult = ReturnType<typeof useGetNotificationsSuspenseQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const UnreadNotificationsCountDocument = gql`
    query UnreadNotificationsCount {
  unreadNotificationsCount
}
    `;

/**
 * __useUnreadNotificationsCountQuery__
 *
 * To run a query within a React component, call `useUnreadNotificationsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnreadNotificationsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnreadNotificationsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useUnreadNotificationsCountQuery(baseOptions?: Apollo.QueryHookOptions<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>(UnreadNotificationsCountDocument, options);
      }
export function useUnreadNotificationsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>(UnreadNotificationsCountDocument, options);
        }
export function useUnreadNotificationsCountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>(UnreadNotificationsCountDocument, options);
        }
export type UnreadNotificationsCountQueryHookResult = ReturnType<typeof useUnreadNotificationsCountQuery>;
export type UnreadNotificationsCountLazyQueryHookResult = ReturnType<typeof useUnreadNotificationsCountLazyQuery>;
export type UnreadNotificationsCountSuspenseQueryHookResult = ReturnType<typeof useUnreadNotificationsCountSuspenseQuery>;
export type UnreadNotificationsCountQueryResult = Apollo.QueryResult<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>;
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($id: Int!) {
  markAsRead(id: $id)
}
    `;
export type MarkNotificationAsReadMutationFn = Apollo.MutationFunction<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;

/**
 * __useMarkNotificationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationAsReadMutation, { data, loading, error }] = useMarkNotificationAsReadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkNotificationAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument, options);
      }
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = Apollo.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const ApproveRejectPtoRequestDocument = gql`
    mutation ApproveRejectPTORequest($requestId: Int!, $accepted: Boolean!) {
  approveRejectPTORequest(requestId: $requestId, accepted: $accepted)
}
    `;
export type ApproveRejectPtoRequestMutationFn = Apollo.MutationFunction<ApproveRejectPtoRequestMutation, ApproveRejectPtoRequestMutationVariables>;

/**
 * __useApproveRejectPtoRequestMutation__
 *
 * To run a mutation, you first call `useApproveRejectPtoRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveRejectPtoRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveRejectPtoRequestMutation, { data, loading, error }] = useApproveRejectPtoRequestMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *      accepted: // value for 'accepted'
 *   },
 * });
 */
export function useApproveRejectPtoRequestMutation(baseOptions?: Apollo.MutationHookOptions<ApproveRejectPtoRequestMutation, ApproveRejectPtoRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveRejectPtoRequestMutation, ApproveRejectPtoRequestMutationVariables>(ApproveRejectPtoRequestDocument, options);
      }
export type ApproveRejectPtoRequestMutationHookResult = ReturnType<typeof useApproveRejectPtoRequestMutation>;
export type ApproveRejectPtoRequestMutationResult = Apollo.MutationResult<ApproveRejectPtoRequestMutation>;
export type ApproveRejectPtoRequestMutationOptions = Apollo.BaseMutationOptions<ApproveRejectPtoRequestMutation, ApproveRejectPtoRequestMutationVariables>;
export const ArchiveVacationPolicyDocument = gql`
    mutation ArchiveVacationPolicy($id: Int!, $value: Boolean) {
  archiveVacationPolicy(id: $id, value: $value)
}
    `;
export type ArchiveVacationPolicyMutationFn = Apollo.MutationFunction<ArchiveVacationPolicyMutation, ArchiveVacationPolicyMutationVariables>;

/**
 * __useArchiveVacationPolicyMutation__
 *
 * To run a mutation, you first call `useArchiveVacationPolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveVacationPolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveVacationPolicyMutation, { data, loading, error }] = useArchiveVacationPolicyMutation({
 *   variables: {
 *      id: // value for 'id'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useArchiveVacationPolicyMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveVacationPolicyMutation, ArchiveVacationPolicyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveVacationPolicyMutation, ArchiveVacationPolicyMutationVariables>(ArchiveVacationPolicyDocument, options);
      }
export type ArchiveVacationPolicyMutationHookResult = ReturnType<typeof useArchiveVacationPolicyMutation>;
export type ArchiveVacationPolicyMutationResult = Apollo.MutationResult<ArchiveVacationPolicyMutation>;
export type ArchiveVacationPolicyMutationOptions = Apollo.BaseMutationOptions<ArchiveVacationPolicyMutation, ArchiveVacationPolicyMutationVariables>;
export const AssignEmployeeToVacationPolicyDocument = gql`
    mutation assignEmployeeToVacationPolicy($policyId: Int!, $employeeIds: [Int!]!, $removedIds: [Int!]!) {
  assignEmployeeToVacationPolicy(
    policyId: $policyId
    employeeIds: $employeeIds
    removedIds: $removedIds
  )
}
    `;
export type AssignEmployeeToVacationPolicyMutationFn = Apollo.MutationFunction<AssignEmployeeToVacationPolicyMutation, AssignEmployeeToVacationPolicyMutationVariables>;

/**
 * __useAssignEmployeeToVacationPolicyMutation__
 *
 * To run a mutation, you first call `useAssignEmployeeToVacationPolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignEmployeeToVacationPolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignEmployeeToVacationPolicyMutation, { data, loading, error }] = useAssignEmployeeToVacationPolicyMutation({
 *   variables: {
 *      policyId: // value for 'policyId'
 *      employeeIds: // value for 'employeeIds'
 *      removedIds: // value for 'removedIds'
 *   },
 * });
 */
export function useAssignEmployeeToVacationPolicyMutation(baseOptions?: Apollo.MutationHookOptions<AssignEmployeeToVacationPolicyMutation, AssignEmployeeToVacationPolicyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignEmployeeToVacationPolicyMutation, AssignEmployeeToVacationPolicyMutationVariables>(AssignEmployeeToVacationPolicyDocument, options);
      }
export type AssignEmployeeToVacationPolicyMutationHookResult = ReturnType<typeof useAssignEmployeeToVacationPolicyMutation>;
export type AssignEmployeeToVacationPolicyMutationResult = Apollo.MutationResult<AssignEmployeeToVacationPolicyMutation>;
export type AssignEmployeeToVacationPolicyMutationOptions = Apollo.BaseMutationOptions<AssignEmployeeToVacationPolicyMutation, AssignEmployeeToVacationPolicyMutationVariables>;
export const CancelPtoRequestDocument = gql`
    mutation CancelPtoRequest($requestId: Int!) {
  cancelPTORequest(requestId: $requestId)
}
    `;
export type CancelPtoRequestMutationFn = Apollo.MutationFunction<CancelPtoRequestMutation, CancelPtoRequestMutationVariables>;

/**
 * __useCancelPtoRequestMutation__
 *
 * To run a mutation, you first call `useCancelPtoRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelPtoRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelPtoRequestMutation, { data, loading, error }] = useCancelPtoRequestMutation({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useCancelPtoRequestMutation(baseOptions?: Apollo.MutationHookOptions<CancelPtoRequestMutation, CancelPtoRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelPtoRequestMutation, CancelPtoRequestMutationVariables>(CancelPtoRequestDocument, options);
      }
export type CancelPtoRequestMutationHookResult = ReturnType<typeof useCancelPtoRequestMutation>;
export type CancelPtoRequestMutationResult = Apollo.MutationResult<CancelPtoRequestMutation>;
export type CancelPtoRequestMutationOptions = Apollo.BaseMutationOptions<CancelPtoRequestMutation, CancelPtoRequestMutationVariables>;
export const CreateApprovalRoutingDocument = gql`
    mutation CreateApprovalRouting($input: CreateApprovalRoutingInput!) {
  createApprovalRouting(input: $input)
}
    `;
export type CreateApprovalRoutingMutationFn = Apollo.MutationFunction<CreateApprovalRoutingMutation, CreateApprovalRoutingMutationVariables>;

/**
 * __useCreateApprovalRoutingMutation__
 *
 * To run a mutation, you first call `useCreateApprovalRoutingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApprovalRoutingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApprovalRoutingMutation, { data, loading, error }] = useCreateApprovalRoutingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateApprovalRoutingMutation(baseOptions?: Apollo.MutationHookOptions<CreateApprovalRoutingMutation, CreateApprovalRoutingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateApprovalRoutingMutation, CreateApprovalRoutingMutationVariables>(CreateApprovalRoutingDocument, options);
      }
export type CreateApprovalRoutingMutationHookResult = ReturnType<typeof useCreateApprovalRoutingMutation>;
export type CreateApprovalRoutingMutationResult = Apollo.MutationResult<CreateApprovalRoutingMutation>;
export type CreateApprovalRoutingMutationOptions = Apollo.BaseMutationOptions<CreateApprovalRoutingMutation, CreateApprovalRoutingMutationVariables>;
export const CreateLeavesCategoryDocument = gql`
    mutation CreateLeavesCategory($input: CreateLeaveCategoryInput!) {
  createLeavesCategory(input: $input) {
    id
    daysAllowed
    name
  }
}
    `;
export type CreateLeavesCategoryMutationFn = Apollo.MutationFunction<CreateLeavesCategoryMutation, CreateLeavesCategoryMutationVariables>;

/**
 * __useCreateLeavesCategoryMutation__
 *
 * To run a mutation, you first call `useCreateLeavesCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLeavesCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLeavesCategoryMutation, { data, loading, error }] = useCreateLeavesCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLeavesCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateLeavesCategoryMutation, CreateLeavesCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLeavesCategoryMutation, CreateLeavesCategoryMutationVariables>(CreateLeavesCategoryDocument, options);
      }
export type CreateLeavesCategoryMutationHookResult = ReturnType<typeof useCreateLeavesCategoryMutation>;
export type CreateLeavesCategoryMutationResult = Apollo.MutationResult<CreateLeavesCategoryMutation>;
export type CreateLeavesCategoryMutationOptions = Apollo.BaseMutationOptions<CreateLeavesCategoryMutation, CreateLeavesCategoryMutationVariables>;
export const CreatePtoRequestDocument = gql`
    mutation CreatePTORequest($input: CreatePtoRequestInput!) {
  createPTORequest(input: $input)
}
    `;
export type CreatePtoRequestMutationFn = Apollo.MutationFunction<CreatePtoRequestMutation, CreatePtoRequestMutationVariables>;

/**
 * __useCreatePtoRequestMutation__
 *
 * To run a mutation, you first call `useCreatePtoRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePtoRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPtoRequestMutation, { data, loading, error }] = useCreatePtoRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePtoRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreatePtoRequestMutation, CreatePtoRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePtoRequestMutation, CreatePtoRequestMutationVariables>(CreatePtoRequestDocument, options);
      }
export type CreatePtoRequestMutationHookResult = ReturnType<typeof useCreatePtoRequestMutation>;
export type CreatePtoRequestMutationResult = Apollo.MutationResult<CreatePtoRequestMutation>;
export type CreatePtoRequestMutationOptions = Apollo.BaseMutationOptions<CreatePtoRequestMutation, CreatePtoRequestMutationVariables>;
export const CreateVacationPolicyDocument = gql`
    mutation CreateVacationPolicy($input: CreateVacationPolicyInput!) {
  createVacationPolicy(input: $input) {
    ...VacationPolicy
  }
}
    ${VacationPolicyFragmentDoc}`;
export type CreateVacationPolicyMutationFn = Apollo.MutationFunction<CreateVacationPolicyMutation, CreateVacationPolicyMutationVariables>;

/**
 * __useCreateVacationPolicyMutation__
 *
 * To run a mutation, you first call `useCreateVacationPolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVacationPolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVacationPolicyMutation, { data, loading, error }] = useCreateVacationPolicyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVacationPolicyMutation(baseOptions?: Apollo.MutationHookOptions<CreateVacationPolicyMutation, CreateVacationPolicyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVacationPolicyMutation, CreateVacationPolicyMutationVariables>(CreateVacationPolicyDocument, options);
      }
export type CreateVacationPolicyMutationHookResult = ReturnType<typeof useCreateVacationPolicyMutation>;
export type CreateVacationPolicyMutationResult = Apollo.MutationResult<CreateVacationPolicyMutation>;
export type CreateVacationPolicyMutationOptions = Apollo.BaseMutationOptions<CreateVacationPolicyMutation, CreateVacationPolicyMutationVariables>;
export const DeleteApprovalRoutingDocument = gql`
    mutation DeleteApprovalRouting($id: Int!) {
  deleteApprovalRouting(id: $id)
}
    `;
export type DeleteApprovalRoutingMutationFn = Apollo.MutationFunction<DeleteApprovalRoutingMutation, DeleteApprovalRoutingMutationVariables>;

/**
 * __useDeleteApprovalRoutingMutation__
 *
 * To run a mutation, you first call `useDeleteApprovalRoutingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteApprovalRoutingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteApprovalRoutingMutation, { data, loading, error }] = useDeleteApprovalRoutingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteApprovalRoutingMutation(baseOptions?: Apollo.MutationHookOptions<DeleteApprovalRoutingMutation, DeleteApprovalRoutingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteApprovalRoutingMutation, DeleteApprovalRoutingMutationVariables>(DeleteApprovalRoutingDocument, options);
      }
export type DeleteApprovalRoutingMutationHookResult = ReturnType<typeof useDeleteApprovalRoutingMutation>;
export type DeleteApprovalRoutingMutationResult = Apollo.MutationResult<DeleteApprovalRoutingMutation>;
export type DeleteApprovalRoutingMutationOptions = Apollo.BaseMutationOptions<DeleteApprovalRoutingMutation, DeleteApprovalRoutingMutationVariables>;
export const GetAccrualsForEmployeeDocument = gql`
    query GetAccrualsForEmployee {
  getLeaveAccrualsForEmployee {
    ...LeaveAccrual
  }
}
    ${LeaveAccrualFragmentDoc}`;

/**
 * __useGetAccrualsForEmployeeQuery__
 *
 * To run a query within a React component, call `useGetAccrualsForEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccrualsForEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccrualsForEmployeeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccrualsForEmployeeQuery(baseOptions?: Apollo.QueryHookOptions<GetAccrualsForEmployeeQuery, GetAccrualsForEmployeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccrualsForEmployeeQuery, GetAccrualsForEmployeeQueryVariables>(GetAccrualsForEmployeeDocument, options);
      }
export function useGetAccrualsForEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccrualsForEmployeeQuery, GetAccrualsForEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccrualsForEmployeeQuery, GetAccrualsForEmployeeQueryVariables>(GetAccrualsForEmployeeDocument, options);
        }
export function useGetAccrualsForEmployeeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAccrualsForEmployeeQuery, GetAccrualsForEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAccrualsForEmployeeQuery, GetAccrualsForEmployeeQueryVariables>(GetAccrualsForEmployeeDocument, options);
        }
export type GetAccrualsForEmployeeQueryHookResult = ReturnType<typeof useGetAccrualsForEmployeeQuery>;
export type GetAccrualsForEmployeeLazyQueryHookResult = ReturnType<typeof useGetAccrualsForEmployeeLazyQuery>;
export type GetAccrualsForEmployeeSuspenseQueryHookResult = ReturnType<typeof useGetAccrualsForEmployeeSuspenseQuery>;
export type GetAccrualsForEmployeeQueryResult = Apollo.QueryResult<GetAccrualsForEmployeeQuery, GetAccrualsForEmployeeQueryVariables>;
export const GetLeaveAccrualsForCompanyDocument = gql`
    query GetLeaveAccrualsForCompany {
  getLeaveAccrualsForCompany {
    ...LeaveAccrual
  }
}
    ${LeaveAccrualFragmentDoc}`;

/**
 * __useGetLeaveAccrualsForCompanyQuery__
 *
 * To run a query within a React component, call `useGetLeaveAccrualsForCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLeaveAccrualsForCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLeaveAccrualsForCompanyQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLeaveAccrualsForCompanyQuery(baseOptions?: Apollo.QueryHookOptions<GetLeaveAccrualsForCompanyQuery, GetLeaveAccrualsForCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLeaveAccrualsForCompanyQuery, GetLeaveAccrualsForCompanyQueryVariables>(GetLeaveAccrualsForCompanyDocument, options);
      }
export function useGetLeaveAccrualsForCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLeaveAccrualsForCompanyQuery, GetLeaveAccrualsForCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLeaveAccrualsForCompanyQuery, GetLeaveAccrualsForCompanyQueryVariables>(GetLeaveAccrualsForCompanyDocument, options);
        }
export function useGetLeaveAccrualsForCompanySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLeaveAccrualsForCompanyQuery, GetLeaveAccrualsForCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLeaveAccrualsForCompanyQuery, GetLeaveAccrualsForCompanyQueryVariables>(GetLeaveAccrualsForCompanyDocument, options);
        }
export type GetLeaveAccrualsForCompanyQueryHookResult = ReturnType<typeof useGetLeaveAccrualsForCompanyQuery>;
export type GetLeaveAccrualsForCompanyLazyQueryHookResult = ReturnType<typeof useGetLeaveAccrualsForCompanyLazyQuery>;
export type GetLeaveAccrualsForCompanySuspenseQueryHookResult = ReturnType<typeof useGetLeaveAccrualsForCompanySuspenseQuery>;
export type GetLeaveAccrualsForCompanyQueryResult = Apollo.QueryResult<GetLeaveAccrualsForCompanyQuery, GetLeaveAccrualsForCompanyQueryVariables>;
export const GetApprovalRequestsDocument = gql`
    query GetApprovalRequests($status: PtoRequestStatus) {
  getRequestsForApproval(status: $status) {
    id
    workingDays
    status
    createdAt
    endDate
    startDate
    requestedByName
    leaveCategoryName
  }
}
    `;

/**
 * __useGetApprovalRequestsQuery__
 *
 * To run a query within a React component, call `useGetApprovalRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApprovalRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApprovalRequestsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetApprovalRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetApprovalRequestsQuery, GetApprovalRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApprovalRequestsQuery, GetApprovalRequestsQueryVariables>(GetApprovalRequestsDocument, options);
      }
export function useGetApprovalRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApprovalRequestsQuery, GetApprovalRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApprovalRequestsQuery, GetApprovalRequestsQueryVariables>(GetApprovalRequestsDocument, options);
        }
export function useGetApprovalRequestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetApprovalRequestsQuery, GetApprovalRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetApprovalRequestsQuery, GetApprovalRequestsQueryVariables>(GetApprovalRequestsDocument, options);
        }
export type GetApprovalRequestsQueryHookResult = ReturnType<typeof useGetApprovalRequestsQuery>;
export type GetApprovalRequestsLazyQueryHookResult = ReturnType<typeof useGetApprovalRequestsLazyQuery>;
export type GetApprovalRequestsSuspenseQueryHookResult = ReturnType<typeof useGetApprovalRequestsSuspenseQuery>;
export type GetApprovalRequestsQueryResult = Apollo.QueryResult<GetApprovalRequestsQuery, GetApprovalRequestsQueryVariables>;
export const GetApprovalRoutingsDocument = gql`
    query GetApprovalRoutings {
  approvalRoutings {
    ...ApprovalRouting
  }
}
    ${ApprovalRoutingFragmentDoc}`;

/**
 * __useGetApprovalRoutingsQuery__
 *
 * To run a query within a React component, call `useGetApprovalRoutingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApprovalRoutingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApprovalRoutingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetApprovalRoutingsQuery(baseOptions?: Apollo.QueryHookOptions<GetApprovalRoutingsQuery, GetApprovalRoutingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApprovalRoutingsQuery, GetApprovalRoutingsQueryVariables>(GetApprovalRoutingsDocument, options);
      }
export function useGetApprovalRoutingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApprovalRoutingsQuery, GetApprovalRoutingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApprovalRoutingsQuery, GetApprovalRoutingsQueryVariables>(GetApprovalRoutingsDocument, options);
        }
export function useGetApprovalRoutingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetApprovalRoutingsQuery, GetApprovalRoutingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetApprovalRoutingsQuery, GetApprovalRoutingsQueryVariables>(GetApprovalRoutingsDocument, options);
        }
export type GetApprovalRoutingsQueryHookResult = ReturnType<typeof useGetApprovalRoutingsQuery>;
export type GetApprovalRoutingsLazyQueryHookResult = ReturnType<typeof useGetApprovalRoutingsLazyQuery>;
export type GetApprovalRoutingsSuspenseQueryHookResult = ReturnType<typeof useGetApprovalRoutingsSuspenseQuery>;
export type GetApprovalRoutingsQueryResult = Apollo.QueryResult<GetApprovalRoutingsQuery, GetApprovalRoutingsQueryVariables>;
export const GetLeaveCategoriesDocument = gql`
    query GetLeaveCategories {
  leavesCategories {
    id
    daysAllowed
    name
  }
}
    `;

/**
 * __useGetLeaveCategoriesQuery__
 *
 * To run a query within a React component, call `useGetLeaveCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLeaveCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLeaveCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLeaveCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetLeaveCategoriesQuery, GetLeaveCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLeaveCategoriesQuery, GetLeaveCategoriesQueryVariables>(GetLeaveCategoriesDocument, options);
      }
export function useGetLeaveCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLeaveCategoriesQuery, GetLeaveCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLeaveCategoriesQuery, GetLeaveCategoriesQueryVariables>(GetLeaveCategoriesDocument, options);
        }
export function useGetLeaveCategoriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLeaveCategoriesQuery, GetLeaveCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLeaveCategoriesQuery, GetLeaveCategoriesQueryVariables>(GetLeaveCategoriesDocument, options);
        }
export type GetLeaveCategoriesQueryHookResult = ReturnType<typeof useGetLeaveCategoriesQuery>;
export type GetLeaveCategoriesLazyQueryHookResult = ReturnType<typeof useGetLeaveCategoriesLazyQuery>;
export type GetLeaveCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetLeaveCategoriesSuspenseQuery>;
export type GetLeaveCategoriesQueryResult = Apollo.QueryResult<GetLeaveCategoriesQuery, GetLeaveCategoriesQueryVariables>;
export const GetLeaveEntitlementsDocument = gql`
    query GetLeaveEntitlements {
  leaveEntitlements {
    name
    remainingDays
    categoryId
  }
}
    `;

/**
 * __useGetLeaveEntitlementsQuery__
 *
 * To run a query within a React component, call `useGetLeaveEntitlementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLeaveEntitlementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLeaveEntitlementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLeaveEntitlementsQuery(baseOptions?: Apollo.QueryHookOptions<GetLeaveEntitlementsQuery, GetLeaveEntitlementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLeaveEntitlementsQuery, GetLeaveEntitlementsQueryVariables>(GetLeaveEntitlementsDocument, options);
      }
export function useGetLeaveEntitlementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLeaveEntitlementsQuery, GetLeaveEntitlementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLeaveEntitlementsQuery, GetLeaveEntitlementsQueryVariables>(GetLeaveEntitlementsDocument, options);
        }
export function useGetLeaveEntitlementsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetLeaveEntitlementsQuery, GetLeaveEntitlementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLeaveEntitlementsQuery, GetLeaveEntitlementsQueryVariables>(GetLeaveEntitlementsDocument, options);
        }
export type GetLeaveEntitlementsQueryHookResult = ReturnType<typeof useGetLeaveEntitlementsQuery>;
export type GetLeaveEntitlementsLazyQueryHookResult = ReturnType<typeof useGetLeaveEntitlementsLazyQuery>;
export type GetLeaveEntitlementsSuspenseQueryHookResult = ReturnType<typeof useGetLeaveEntitlementsSuspenseQuery>;
export type GetLeaveEntitlementsQueryResult = Apollo.QueryResult<GetLeaveEntitlementsQuery, GetLeaveEntitlementsQueryVariables>;
export const GetPtoRequestsDetailDocument = gql`
    query GetPtoRequestsDetail($requestId: Int!) {
  getPtoRequestDetails(requestId: $requestId) {
    ...PtoRequestFragment
  }
}
    ${PtoRequestFragmentFragmentDoc}`;

/**
 * __useGetPtoRequestsDetailQuery__
 *
 * To run a query within a React component, call `useGetPtoRequestsDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPtoRequestsDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPtoRequestsDetailQuery({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useGetPtoRequestsDetailQuery(baseOptions: Apollo.QueryHookOptions<GetPtoRequestsDetailQuery, GetPtoRequestsDetailQueryVariables> & ({ variables: GetPtoRequestsDetailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPtoRequestsDetailQuery, GetPtoRequestsDetailQueryVariables>(GetPtoRequestsDetailDocument, options);
      }
export function useGetPtoRequestsDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPtoRequestsDetailQuery, GetPtoRequestsDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPtoRequestsDetailQuery, GetPtoRequestsDetailQueryVariables>(GetPtoRequestsDetailDocument, options);
        }
export function useGetPtoRequestsDetailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPtoRequestsDetailQuery, GetPtoRequestsDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPtoRequestsDetailQuery, GetPtoRequestsDetailQueryVariables>(GetPtoRequestsDetailDocument, options);
        }
export type GetPtoRequestsDetailQueryHookResult = ReturnType<typeof useGetPtoRequestsDetailQuery>;
export type GetPtoRequestsDetailLazyQueryHookResult = ReturnType<typeof useGetPtoRequestsDetailLazyQuery>;
export type GetPtoRequestsDetailSuspenseQueryHookResult = ReturnType<typeof useGetPtoRequestsDetailSuspenseQuery>;
export type GetPtoRequestsDetailQueryResult = Apollo.QueryResult<GetPtoRequestsDetailQuery, GetPtoRequestsDetailQueryVariables>;
export const GetPtoRequestsForEmployeeDocument = gql`
    query GetPtoRequestsForEmployee($options: PaginatedQueryInput) {
  getPtoRequestsForEmployee(options: $options) {
    id
    startDate
    endDate
    status
    createdAt
    requestedById
    workingDays
    leaveCategoryName
  }
}
    `;

/**
 * __useGetPtoRequestsForEmployeeQuery__
 *
 * To run a query within a React component, call `useGetPtoRequestsForEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPtoRequestsForEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPtoRequestsForEmployeeQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetPtoRequestsForEmployeeQuery(baseOptions?: Apollo.QueryHookOptions<GetPtoRequestsForEmployeeQuery, GetPtoRequestsForEmployeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPtoRequestsForEmployeeQuery, GetPtoRequestsForEmployeeQueryVariables>(GetPtoRequestsForEmployeeDocument, options);
      }
export function useGetPtoRequestsForEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPtoRequestsForEmployeeQuery, GetPtoRequestsForEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPtoRequestsForEmployeeQuery, GetPtoRequestsForEmployeeQueryVariables>(GetPtoRequestsForEmployeeDocument, options);
        }
export function useGetPtoRequestsForEmployeeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPtoRequestsForEmployeeQuery, GetPtoRequestsForEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPtoRequestsForEmployeeQuery, GetPtoRequestsForEmployeeQueryVariables>(GetPtoRequestsForEmployeeDocument, options);
        }
export type GetPtoRequestsForEmployeeQueryHookResult = ReturnType<typeof useGetPtoRequestsForEmployeeQuery>;
export type GetPtoRequestsForEmployeeLazyQueryHookResult = ReturnType<typeof useGetPtoRequestsForEmployeeLazyQuery>;
export type GetPtoRequestsForEmployeeSuspenseQueryHookResult = ReturnType<typeof useGetPtoRequestsForEmployeeSuspenseQuery>;
export type GetPtoRequestsForEmployeeQueryResult = Apollo.QueryResult<GetPtoRequestsForEmployeeQuery, GetPtoRequestsForEmployeeQueryVariables>;
export const GetPtoRequestsForCompanyDocument = gql`
    query GetPtoRequestsForCompany($options: PaginatedQueryInput, $filters: GetPtoRequestsFilter!) {
  getPtoRequestsForCompany(options: $options, filters: $filters) {
    id
    startDate
    endDate
    status
    createdAt
    requestedById
    workingDays
    leaveCategoryName
    requestedByName
  }
}
    `;

/**
 * __useGetPtoRequestsForCompanyQuery__
 *
 * To run a query within a React component, call `useGetPtoRequestsForCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPtoRequestsForCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPtoRequestsForCompanyQuery({
 *   variables: {
 *      options: // value for 'options'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetPtoRequestsForCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetPtoRequestsForCompanyQuery, GetPtoRequestsForCompanyQueryVariables> & ({ variables: GetPtoRequestsForCompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPtoRequestsForCompanyQuery, GetPtoRequestsForCompanyQueryVariables>(GetPtoRequestsForCompanyDocument, options);
      }
export function useGetPtoRequestsForCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPtoRequestsForCompanyQuery, GetPtoRequestsForCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPtoRequestsForCompanyQuery, GetPtoRequestsForCompanyQueryVariables>(GetPtoRequestsForCompanyDocument, options);
        }
export function useGetPtoRequestsForCompanySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPtoRequestsForCompanyQuery, GetPtoRequestsForCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPtoRequestsForCompanyQuery, GetPtoRequestsForCompanyQueryVariables>(GetPtoRequestsForCompanyDocument, options);
        }
export type GetPtoRequestsForCompanyQueryHookResult = ReturnType<typeof useGetPtoRequestsForCompanyQuery>;
export type GetPtoRequestsForCompanyLazyQueryHookResult = ReturnType<typeof useGetPtoRequestsForCompanyLazyQuery>;
export type GetPtoRequestsForCompanySuspenseQueryHookResult = ReturnType<typeof useGetPtoRequestsForCompanySuspenseQuery>;
export type GetPtoRequestsForCompanyQueryResult = Apollo.QueryResult<GetPtoRequestsForCompanyQuery, GetPtoRequestsForCompanyQueryVariables>;
export const GetVacationPoliciesDocument = gql`
    query GetVacationPolicies {
  vacationPolicies {
    ...VacationPolicy
  }
}
    ${VacationPolicyFragmentDoc}`;

/**
 * __useGetVacationPoliciesQuery__
 *
 * To run a query within a React component, call `useGetVacationPoliciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVacationPoliciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVacationPoliciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVacationPoliciesQuery(baseOptions?: Apollo.QueryHookOptions<GetVacationPoliciesQuery, GetVacationPoliciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVacationPoliciesQuery, GetVacationPoliciesQueryVariables>(GetVacationPoliciesDocument, options);
      }
export function useGetVacationPoliciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVacationPoliciesQuery, GetVacationPoliciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVacationPoliciesQuery, GetVacationPoliciesQueryVariables>(GetVacationPoliciesDocument, options);
        }
export function useGetVacationPoliciesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetVacationPoliciesQuery, GetVacationPoliciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetVacationPoliciesQuery, GetVacationPoliciesQueryVariables>(GetVacationPoliciesDocument, options);
        }
export type GetVacationPoliciesQueryHookResult = ReturnType<typeof useGetVacationPoliciesQuery>;
export type GetVacationPoliciesLazyQueryHookResult = ReturnType<typeof useGetVacationPoliciesLazyQuery>;
export type GetVacationPoliciesSuspenseQueryHookResult = ReturnType<typeof useGetVacationPoliciesSuspenseQuery>;
export type GetVacationPoliciesQueryResult = Apollo.QueryResult<GetVacationPoliciesQuery, GetVacationPoliciesQueryVariables>;
export const GetVacationPolicyDocument = gql`
    query GetVacationPolicy($id: Int!) {
  vacationPolicy(id: $id) {
    ...VacationPolicy
  }
}
    ${VacationPolicyFragmentDoc}`;

/**
 * __useGetVacationPolicyQuery__
 *
 * To run a query within a React component, call `useGetVacationPolicyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVacationPolicyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVacationPolicyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVacationPolicyQuery(baseOptions: Apollo.QueryHookOptions<GetVacationPolicyQuery, GetVacationPolicyQueryVariables> & ({ variables: GetVacationPolicyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVacationPolicyQuery, GetVacationPolicyQueryVariables>(GetVacationPolicyDocument, options);
      }
export function useGetVacationPolicyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVacationPolicyQuery, GetVacationPolicyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVacationPolicyQuery, GetVacationPolicyQueryVariables>(GetVacationPolicyDocument, options);
        }
export function useGetVacationPolicySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetVacationPolicyQuery, GetVacationPolicyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetVacationPolicyQuery, GetVacationPolicyQueryVariables>(GetVacationPolicyDocument, options);
        }
export type GetVacationPolicyQueryHookResult = ReturnType<typeof useGetVacationPolicyQuery>;
export type GetVacationPolicyLazyQueryHookResult = ReturnType<typeof useGetVacationPolicyLazyQuery>;
export type GetVacationPolicySuspenseQueryHookResult = ReturnType<typeof useGetVacationPolicySuspenseQuery>;
export type GetVacationPolicyQueryResult = Apollo.QueryResult<GetVacationPolicyQuery, GetVacationPolicyQueryVariables>;
export const SetVacationPolicyAsDefaultDocument = gql`
    mutation SetVacationPolicyAsDefault($id: Int!) {
  setAsDefault(id: $id)
}
    `;
export type SetVacationPolicyAsDefaultMutationFn = Apollo.MutationFunction<SetVacationPolicyAsDefaultMutation, SetVacationPolicyAsDefaultMutationVariables>;

/**
 * __useSetVacationPolicyAsDefaultMutation__
 *
 * To run a mutation, you first call `useSetVacationPolicyAsDefaultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetVacationPolicyAsDefaultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setVacationPolicyAsDefaultMutation, { data, loading, error }] = useSetVacationPolicyAsDefaultMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetVacationPolicyAsDefaultMutation(baseOptions?: Apollo.MutationHookOptions<SetVacationPolicyAsDefaultMutation, SetVacationPolicyAsDefaultMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetVacationPolicyAsDefaultMutation, SetVacationPolicyAsDefaultMutationVariables>(SetVacationPolicyAsDefaultDocument, options);
      }
export type SetVacationPolicyAsDefaultMutationHookResult = ReturnType<typeof useSetVacationPolicyAsDefaultMutation>;
export type SetVacationPolicyAsDefaultMutationResult = Apollo.MutationResult<SetVacationPolicyAsDefaultMutation>;
export type SetVacationPolicyAsDefaultMutationOptions = Apollo.BaseMutationOptions<SetVacationPolicyAsDefaultMutation, SetVacationPolicyAsDefaultMutationVariables>;
export const UpdateApprovalRoutingDocument = gql`
    mutation UpdateApprovalRouting($input: UpdateApprovalRoutingInput!) {
  updateApprovalRouting(input: $input)
}
    `;
export type UpdateApprovalRoutingMutationFn = Apollo.MutationFunction<UpdateApprovalRoutingMutation, UpdateApprovalRoutingMutationVariables>;

/**
 * __useUpdateApprovalRoutingMutation__
 *
 * To run a mutation, you first call `useUpdateApprovalRoutingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApprovalRoutingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApprovalRoutingMutation, { data, loading, error }] = useUpdateApprovalRoutingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateApprovalRoutingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateApprovalRoutingMutation, UpdateApprovalRoutingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateApprovalRoutingMutation, UpdateApprovalRoutingMutationVariables>(UpdateApprovalRoutingDocument, options);
      }
export type UpdateApprovalRoutingMutationHookResult = ReturnType<typeof useUpdateApprovalRoutingMutation>;
export type UpdateApprovalRoutingMutationResult = Apollo.MutationResult<UpdateApprovalRoutingMutation>;
export type UpdateApprovalRoutingMutationOptions = Apollo.BaseMutationOptions<UpdateApprovalRoutingMutation, UpdateApprovalRoutingMutationVariables>;
export const UpdateVacationPolicyDocument = gql`
    mutation UpdateVacationPolicy($input: UpdateVacationPolicyInput!) {
  updateVacationPolicy(input: $input)
}
    `;
export type UpdateVacationPolicyMutationFn = Apollo.MutationFunction<UpdateVacationPolicyMutation, UpdateVacationPolicyMutationVariables>;

/**
 * __useUpdateVacationPolicyMutation__
 *
 * To run a mutation, you first call `useUpdateVacationPolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVacationPolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVacationPolicyMutation, { data, loading, error }] = useUpdateVacationPolicyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVacationPolicyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVacationPolicyMutation, UpdateVacationPolicyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVacationPolicyMutation, UpdateVacationPolicyMutationVariables>(UpdateVacationPolicyDocument, options);
      }
export type UpdateVacationPolicyMutationHookResult = ReturnType<typeof useUpdateVacationPolicyMutation>;
export type UpdateVacationPolicyMutationResult = Apollo.MutationResult<UpdateVacationPolicyMutation>;
export type UpdateVacationPolicyMutationOptions = Apollo.BaseMutationOptions<UpdateVacationPolicyMutation, UpdateVacationPolicyMutationVariables>;
export const CreateManualTimeEntryDocument = gql`
    mutation CreateManualTimeEntry($payload: CreateTimeEntryInput!) {
  createTimeEntry(payload: $payload) {
    id
    description
    startDate
    endDate
    task {
      id
      name
    }
    project {
      id
      name
    }
  }
}
    `;
export type CreateManualTimeEntryMutationFn = Apollo.MutationFunction<CreateManualTimeEntryMutation, CreateManualTimeEntryMutationVariables>;

/**
 * __useCreateManualTimeEntryMutation__
 *
 * To run a mutation, you first call `useCreateManualTimeEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateManualTimeEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createManualTimeEntryMutation, { data, loading, error }] = useCreateManualTimeEntryMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateManualTimeEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateManualTimeEntryMutation, CreateManualTimeEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateManualTimeEntryMutation, CreateManualTimeEntryMutationVariables>(CreateManualTimeEntryDocument, options);
      }
export type CreateManualTimeEntryMutationHookResult = ReturnType<typeof useCreateManualTimeEntryMutation>;
export type CreateManualTimeEntryMutationResult = Apollo.MutationResult<CreateManualTimeEntryMutation>;
export type CreateManualTimeEntryMutationOptions = Apollo.BaseMutationOptions<CreateManualTimeEntryMutation, CreateManualTimeEntryMutationVariables>;
export const DeleteTimeEntryDocument = gql`
    mutation DeleteTimeEntry($id: Int!) {
  deleteTimeEntry(id: $id)
}
    `;
export type DeleteTimeEntryMutationFn = Apollo.MutationFunction<DeleteTimeEntryMutation, DeleteTimeEntryMutationVariables>;

/**
 * __useDeleteTimeEntryMutation__
 *
 * To run a mutation, you first call `useDeleteTimeEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTimeEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTimeEntryMutation, { data, loading, error }] = useDeleteTimeEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTimeEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTimeEntryMutation, DeleteTimeEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTimeEntryMutation, DeleteTimeEntryMutationVariables>(DeleteTimeEntryDocument, options);
      }
export type DeleteTimeEntryMutationHookResult = ReturnType<typeof useDeleteTimeEntryMutation>;
export type DeleteTimeEntryMutationResult = Apollo.MutationResult<DeleteTimeEntryMutation>;
export type DeleteTimeEntryMutationOptions = Apollo.BaseMutationOptions<DeleteTimeEntryMutation, DeleteTimeEntryMutationVariables>;
export const EditTimeEntryDocument = gql`
    mutation EditTimeEntry($payload: EditTimeEntryInput!) {
  editTimeEntry(payload: $payload) {
    id
    description
    startDate
    endDate
    task {
      id
      name
    }
    project {
      id
      name
    }
  }
}
    `;
export type EditTimeEntryMutationFn = Apollo.MutationFunction<EditTimeEntryMutation, EditTimeEntryMutationVariables>;

/**
 * __useEditTimeEntryMutation__
 *
 * To run a mutation, you first call `useEditTimeEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTimeEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTimeEntryMutation, { data, loading, error }] = useEditTimeEntryMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useEditTimeEntryMutation(baseOptions?: Apollo.MutationHookOptions<EditTimeEntryMutation, EditTimeEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTimeEntryMutation, EditTimeEntryMutationVariables>(EditTimeEntryDocument, options);
      }
export type EditTimeEntryMutationHookResult = ReturnType<typeof useEditTimeEntryMutation>;
export type EditTimeEntryMutationResult = Apollo.MutationResult<EditTimeEntryMutation>;
export type EditTimeEntryMutationOptions = Apollo.BaseMutationOptions<EditTimeEntryMutation, EditTimeEntryMutationVariables>;
export const GetActiveTimerDocument = gql`
    query GetActiveTimer {
  activeTimer {
    id
    description
    startDate
    taskId
    projectId
  }
}
    `;

/**
 * __useGetActiveTimerQuery__
 *
 * To run a query within a React component, call `useGetActiveTimerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveTimerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveTimerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActiveTimerQuery(baseOptions?: Apollo.QueryHookOptions<GetActiveTimerQuery, GetActiveTimerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActiveTimerQuery, GetActiveTimerQueryVariables>(GetActiveTimerDocument, options);
      }
export function useGetActiveTimerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActiveTimerQuery, GetActiveTimerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActiveTimerQuery, GetActiveTimerQueryVariables>(GetActiveTimerDocument, options);
        }
export function useGetActiveTimerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetActiveTimerQuery, GetActiveTimerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetActiveTimerQuery, GetActiveTimerQueryVariables>(GetActiveTimerDocument, options);
        }
export type GetActiveTimerQueryHookResult = ReturnType<typeof useGetActiveTimerQuery>;
export type GetActiveTimerLazyQueryHookResult = ReturnType<typeof useGetActiveTimerLazyQuery>;
export type GetActiveTimerSuspenseQueryHookResult = ReturnType<typeof useGetActiveTimerSuspenseQuery>;
export type GetActiveTimerQueryResult = Apollo.QueryResult<GetActiveTimerQuery, GetActiveTimerQueryVariables>;
export const GetProjectsDocument = gql`
    query GetProjects {
  projects {
    ...Project
  }
}
    ${ProjectFragmentDoc}`;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export function useGetProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsSuspenseQueryHookResult = ReturnType<typeof useGetProjectsSuspenseQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetProjectDocument = gql`
    query GetProject($id: Int!, $isBacklog: Boolean!, $searchQuery: String, $assignedTo: [Int!]) {
  project(id: $id) {
    ...Project
    columns {
      name
      value
    }
  }
  tasks(
    projectId: $id
    isBacklog: $isBacklog
    searchQuery: $searchQuery
    assignedTo: $assignedTo
  ) {
    ...Task
  }
}
    ${ProjectFragmentDoc}
${TaskFragmentDoc}`;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *      isBacklog: // value for 'isBacklog'
 *      searchQuery: // value for 'searchQuery'
 *      assignedTo: // value for 'assignedTo'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables> & ({ variables: GetProjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export function useGetProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectSuspenseQueryHookResult = ReturnType<typeof useGetProjectSuspenseQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetTasksDocument = gql`
    query GetTasks($projectId: Int) {
  tasks(projectId: $projectId) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export function useGetTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksSuspenseQueryHookResult = ReturnType<typeof useGetTasksSuspenseQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetMyTasksDocument = gql`
    query GetMyTasks {
  myTasks {
    ...TaskWithProject
  }
}
    ${TaskWithProjectFragmentDoc}`;

/**
 * __useGetMyTasksQuery__
 *
 * To run a query within a React component, call `useGetMyTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(GetMyTasksDocument, options);
      }
export function useGetMyTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(GetMyTasksDocument, options);
        }
export function useGetMyTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyTasksQuery, GetMyTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyTasksQuery, GetMyTasksQueryVariables>(GetMyTasksDocument, options);
        }
export type GetMyTasksQueryHookResult = ReturnType<typeof useGetMyTasksQuery>;
export type GetMyTasksLazyQueryHookResult = ReturnType<typeof useGetMyTasksLazyQuery>;
export type GetMyTasksSuspenseQueryHookResult = ReturnType<typeof useGetMyTasksSuspenseQuery>;
export type GetMyTasksQueryResult = Apollo.QueryResult<GetMyTasksQuery, GetMyTasksQueryVariables>;
export const GetAvailableStatusesForProjectDocument = gql`
    query GetAvailableStatusesForProject($projectId: Int!) {
  availableStatusesForProject(projectId: $projectId) {
    value
    name
  }
}
    `;

/**
 * __useGetAvailableStatusesForProjectQuery__
 *
 * To run a query within a React component, call `useGetAvailableStatusesForProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableStatusesForProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableStatusesForProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetAvailableStatusesForProjectQuery(baseOptions: Apollo.QueryHookOptions<GetAvailableStatusesForProjectQuery, GetAvailableStatusesForProjectQueryVariables> & ({ variables: GetAvailableStatusesForProjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAvailableStatusesForProjectQuery, GetAvailableStatusesForProjectQueryVariables>(GetAvailableStatusesForProjectDocument, options);
      }
export function useGetAvailableStatusesForProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAvailableStatusesForProjectQuery, GetAvailableStatusesForProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAvailableStatusesForProjectQuery, GetAvailableStatusesForProjectQueryVariables>(GetAvailableStatusesForProjectDocument, options);
        }
export function useGetAvailableStatusesForProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAvailableStatusesForProjectQuery, GetAvailableStatusesForProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAvailableStatusesForProjectQuery, GetAvailableStatusesForProjectQueryVariables>(GetAvailableStatusesForProjectDocument, options);
        }
export type GetAvailableStatusesForProjectQueryHookResult = ReturnType<typeof useGetAvailableStatusesForProjectQuery>;
export type GetAvailableStatusesForProjectLazyQueryHookResult = ReturnType<typeof useGetAvailableStatusesForProjectLazyQuery>;
export type GetAvailableStatusesForProjectSuspenseQueryHookResult = ReturnType<typeof useGetAvailableStatusesForProjectSuspenseQuery>;
export type GetAvailableStatusesForProjectQueryResult = Apollo.QueryResult<GetAvailableStatusesForProjectQuery, GetAvailableStatusesForProjectQueryVariables>;
export const GetTaskDocument = gql`
    query GetTask($id: Int!) {
  task(id: $id) {
    ...TaskWithProject
  }
}
    ${TaskWithProjectFragmentDoc}`;

/**
 * __useGetTaskQuery__
 *
 * To run a query within a React component, call `useGetTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTaskQuery(baseOptions: Apollo.QueryHookOptions<GetTaskQuery, GetTaskQueryVariables> & ({ variables: GetTaskQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
      }
export function useGetTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export function useGetTaskSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTaskQuery, GetTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTaskQuery, GetTaskQueryVariables>(GetTaskDocument, options);
        }
export type GetTaskQueryHookResult = ReturnType<typeof useGetTaskQuery>;
export type GetTaskLazyQueryHookResult = ReturnType<typeof useGetTaskLazyQuery>;
export type GetTaskSuspenseQueryHookResult = ReturnType<typeof useGetTaskSuspenseQuery>;
export type GetTaskQueryResult = Apollo.QueryResult<GetTaskQuery, GetTaskQueryVariables>;
export const GetTimeEntriesDocument = gql`
    query GetTimeEntries($options: PaginatedQueryInput) {
  timeEntries(options: $options) {
    data {
      ...TimeEntry
    }
    hasNextPage
    totalCount
  }
}
    ${TimeEntryFragmentDoc}`;

/**
 * __useGetTimeEntriesQuery__
 *
 * To run a query within a React component, call `useGetTimeEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimeEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimeEntriesQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetTimeEntriesQuery(baseOptions?: Apollo.QueryHookOptions<GetTimeEntriesQuery, GetTimeEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimeEntriesQuery, GetTimeEntriesQueryVariables>(GetTimeEntriesDocument, options);
      }
export function useGetTimeEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimeEntriesQuery, GetTimeEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimeEntriesQuery, GetTimeEntriesQueryVariables>(GetTimeEntriesDocument, options);
        }
export function useGetTimeEntriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTimeEntriesQuery, GetTimeEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTimeEntriesQuery, GetTimeEntriesQueryVariables>(GetTimeEntriesDocument, options);
        }
export type GetTimeEntriesQueryHookResult = ReturnType<typeof useGetTimeEntriesQuery>;
export type GetTimeEntriesLazyQueryHookResult = ReturnType<typeof useGetTimeEntriesLazyQuery>;
export type GetTimeEntriesSuspenseQueryHookResult = ReturnType<typeof useGetTimeEntriesSuspenseQuery>;
export type GetTimeEntriesQueryResult = Apollo.QueryResult<GetTimeEntriesQuery, GetTimeEntriesQueryVariables>;
export const GetCompanyTimeEntriesDocument = gql`
    query GetCompanyTimeEntries($options: PaginatedQueryInput, $filters: GetTimeEntriesFilters) {
  companyTimeEntries(filters: $filters, options: $options) {
    data {
      ...TimeEntry
    }
    hasNextPage
    totalCount
  }
}
    ${TimeEntryFragmentDoc}`;

/**
 * __useGetCompanyTimeEntriesQuery__
 *
 * To run a query within a React component, call `useGetCompanyTimeEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyTimeEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyTimeEntriesQuery({
 *   variables: {
 *      options: // value for 'options'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetCompanyTimeEntriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCompanyTimeEntriesQuery, GetCompanyTimeEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyTimeEntriesQuery, GetCompanyTimeEntriesQueryVariables>(GetCompanyTimeEntriesDocument, options);
      }
export function useGetCompanyTimeEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyTimeEntriesQuery, GetCompanyTimeEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyTimeEntriesQuery, GetCompanyTimeEntriesQueryVariables>(GetCompanyTimeEntriesDocument, options);
        }
export function useGetCompanyTimeEntriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCompanyTimeEntriesQuery, GetCompanyTimeEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCompanyTimeEntriesQuery, GetCompanyTimeEntriesQueryVariables>(GetCompanyTimeEntriesDocument, options);
        }
export type GetCompanyTimeEntriesQueryHookResult = ReturnType<typeof useGetCompanyTimeEntriesQuery>;
export type GetCompanyTimeEntriesLazyQueryHookResult = ReturnType<typeof useGetCompanyTimeEntriesLazyQuery>;
export type GetCompanyTimeEntriesSuspenseQueryHookResult = ReturnType<typeof useGetCompanyTimeEntriesSuspenseQuery>;
export type GetCompanyTimeEntriesQueryResult = Apollo.QueryResult<GetCompanyTimeEntriesQuery, GetCompanyTimeEntriesQueryVariables>;
export const TimeTrackingStatsDocument = gql`
    query TimeTrackingStats {
  timeTrackingStats {
    totalMinutesThisWeek
    minutesPercentageDiffFromLastWeek
    trendingProject {
      project {
        id
        name
      }
      totalMinutes
    }
    mostActiveEmployees {
      ...LightEmployee
    }
  }
}
    ${LightEmployeeFragmentDoc}`;

/**
 * __useTimeTrackingStatsQuery__
 *
 * To run a query within a React component, call `useTimeTrackingStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimeTrackingStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimeTrackingStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTimeTrackingStatsQuery(baseOptions?: Apollo.QueryHookOptions<TimeTrackingStatsQuery, TimeTrackingStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimeTrackingStatsQuery, TimeTrackingStatsQueryVariables>(TimeTrackingStatsDocument, options);
      }
export function useTimeTrackingStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimeTrackingStatsQuery, TimeTrackingStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimeTrackingStatsQuery, TimeTrackingStatsQueryVariables>(TimeTrackingStatsDocument, options);
        }
export function useTimeTrackingStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TimeTrackingStatsQuery, TimeTrackingStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimeTrackingStatsQuery, TimeTrackingStatsQueryVariables>(TimeTrackingStatsDocument, options);
        }
export type TimeTrackingStatsQueryHookResult = ReturnType<typeof useTimeTrackingStatsQuery>;
export type TimeTrackingStatsLazyQueryHookResult = ReturnType<typeof useTimeTrackingStatsLazyQuery>;
export type TimeTrackingStatsSuspenseQueryHookResult = ReturnType<typeof useTimeTrackingStatsSuspenseQuery>;
export type TimeTrackingStatsQueryResult = Apollo.QueryResult<TimeTrackingStatsQuery, TimeTrackingStatsQueryVariables>;
export const TimeTrackedPerProjectDocument = gql`
    query TimeTrackedPerProject($dateRange: DateRangeInput) {
  timeTrackedPerProject(dateRange: $dateRange) {
    project {
      id
      name
    }
    totalMinutes
  }
}
    `;

/**
 * __useTimeTrackedPerProjectQuery__
 *
 * To run a query within a React component, call `useTimeTrackedPerProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimeTrackedPerProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimeTrackedPerProjectQuery({
 *   variables: {
 *      dateRange: // value for 'dateRange'
 *   },
 * });
 */
export function useTimeTrackedPerProjectQuery(baseOptions?: Apollo.QueryHookOptions<TimeTrackedPerProjectQuery, TimeTrackedPerProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimeTrackedPerProjectQuery, TimeTrackedPerProjectQueryVariables>(TimeTrackedPerProjectDocument, options);
      }
export function useTimeTrackedPerProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimeTrackedPerProjectQuery, TimeTrackedPerProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimeTrackedPerProjectQuery, TimeTrackedPerProjectQueryVariables>(TimeTrackedPerProjectDocument, options);
        }
export function useTimeTrackedPerProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TimeTrackedPerProjectQuery, TimeTrackedPerProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimeTrackedPerProjectQuery, TimeTrackedPerProjectQueryVariables>(TimeTrackedPerProjectDocument, options);
        }
export type TimeTrackedPerProjectQueryHookResult = ReturnType<typeof useTimeTrackedPerProjectQuery>;
export type TimeTrackedPerProjectLazyQueryHookResult = ReturnType<typeof useTimeTrackedPerProjectLazyQuery>;
export type TimeTrackedPerProjectSuspenseQueryHookResult = ReturnType<typeof useTimeTrackedPerProjectSuspenseQuery>;
export type TimeTrackedPerProjectQueryResult = Apollo.QueryResult<TimeTrackedPerProjectQuery, TimeTrackedPerProjectQueryVariables>;
export const TimeTrackedPerTeamDocument = gql`
    query TimeTrackedPerTeam($dateRange: DateRangeInput) {
  timeTrackedPerTeam(dateRange: $dateRange) {
    team {
      id
      name
    }
    totalMinutes
  }
}
    `;

/**
 * __useTimeTrackedPerTeamQuery__
 *
 * To run a query within a React component, call `useTimeTrackedPerTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimeTrackedPerTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimeTrackedPerTeamQuery({
 *   variables: {
 *      dateRange: // value for 'dateRange'
 *   },
 * });
 */
export function useTimeTrackedPerTeamQuery(baseOptions?: Apollo.QueryHookOptions<TimeTrackedPerTeamQuery, TimeTrackedPerTeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimeTrackedPerTeamQuery, TimeTrackedPerTeamQueryVariables>(TimeTrackedPerTeamDocument, options);
      }
export function useTimeTrackedPerTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimeTrackedPerTeamQuery, TimeTrackedPerTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimeTrackedPerTeamQuery, TimeTrackedPerTeamQueryVariables>(TimeTrackedPerTeamDocument, options);
        }
export function useTimeTrackedPerTeamSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TimeTrackedPerTeamQuery, TimeTrackedPerTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimeTrackedPerTeamQuery, TimeTrackedPerTeamQueryVariables>(TimeTrackedPerTeamDocument, options);
        }
export type TimeTrackedPerTeamQueryHookResult = ReturnType<typeof useTimeTrackedPerTeamQuery>;
export type TimeTrackedPerTeamLazyQueryHookResult = ReturnType<typeof useTimeTrackedPerTeamLazyQuery>;
export type TimeTrackedPerTeamSuspenseQueryHookResult = ReturnType<typeof useTimeTrackedPerTeamSuspenseQuery>;
export type TimeTrackedPerTeamQueryResult = Apollo.QueryResult<TimeTrackedPerTeamQuery, TimeTrackedPerTeamQueryVariables>;
export const TimeTrackedPerEmployeeDocument = gql`
    query TimeTrackedPerEmployee($dateRange: DateRangeInput) {
  timeTrackedPerEmployee(dateRange: $dateRange) {
    employee {
      id
      name
    }
    totalMinutes
  }
}
    `;

/**
 * __useTimeTrackedPerEmployeeQuery__
 *
 * To run a query within a React component, call `useTimeTrackedPerEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimeTrackedPerEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimeTrackedPerEmployeeQuery({
 *   variables: {
 *      dateRange: // value for 'dateRange'
 *   },
 * });
 */
export function useTimeTrackedPerEmployeeQuery(baseOptions?: Apollo.QueryHookOptions<TimeTrackedPerEmployeeQuery, TimeTrackedPerEmployeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimeTrackedPerEmployeeQuery, TimeTrackedPerEmployeeQueryVariables>(TimeTrackedPerEmployeeDocument, options);
      }
export function useTimeTrackedPerEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimeTrackedPerEmployeeQuery, TimeTrackedPerEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimeTrackedPerEmployeeQuery, TimeTrackedPerEmployeeQueryVariables>(TimeTrackedPerEmployeeDocument, options);
        }
export function useTimeTrackedPerEmployeeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TimeTrackedPerEmployeeQuery, TimeTrackedPerEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimeTrackedPerEmployeeQuery, TimeTrackedPerEmployeeQueryVariables>(TimeTrackedPerEmployeeDocument, options);
        }
export type TimeTrackedPerEmployeeQueryHookResult = ReturnType<typeof useTimeTrackedPerEmployeeQuery>;
export type TimeTrackedPerEmployeeLazyQueryHookResult = ReturnType<typeof useTimeTrackedPerEmployeeLazyQuery>;
export type TimeTrackedPerEmployeeSuspenseQueryHookResult = ReturnType<typeof useTimeTrackedPerEmployeeSuspenseQuery>;
export type TimeTrackedPerEmployeeQueryResult = Apollo.QueryResult<TimeTrackedPerEmployeeQuery, TimeTrackedPerEmployeeQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($name: String!, $description: String, $color: String!) {
  createProject(name: $name, description: $description, color: $color) {
    id
    name
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const AddColumnDocument = gql`
    mutation AddColumn($projectId: Int!, $name: String!, $value: String!) {
  addColumnToProject(projectId: $projectId, name: $name, value: $value)
}
    `;
export type AddColumnMutationFn = Apollo.MutationFunction<AddColumnMutation, AddColumnMutationVariables>;

/**
 * __useAddColumnMutation__
 *
 * To run a mutation, you first call `useAddColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addColumnMutation, { data, loading, error }] = useAddColumnMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      name: // value for 'name'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useAddColumnMutation(baseOptions?: Apollo.MutationHookOptions<AddColumnMutation, AddColumnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddColumnMutation, AddColumnMutationVariables>(AddColumnDocument, options);
      }
export type AddColumnMutationHookResult = ReturnType<typeof useAddColumnMutation>;
export type AddColumnMutationResult = Apollo.MutationResult<AddColumnMutation>;
export type AddColumnMutationOptions = Apollo.BaseMutationOptions<AddColumnMutation, AddColumnMutationVariables>;
export const RemoveColumnDocument = gql`
    mutation RemoveColumn($projectId: Int!, $value: String!) {
  removeColumnFromProject(projectId: $projectId, value: $value)
}
    `;
export type RemoveColumnMutationFn = Apollo.MutationFunction<RemoveColumnMutation, RemoveColumnMutationVariables>;

/**
 * __useRemoveColumnMutation__
 *
 * To run a mutation, you first call `useRemoveColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeColumnMutation, { data, loading, error }] = useRemoveColumnMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useRemoveColumnMutation(baseOptions?: Apollo.MutationHookOptions<RemoveColumnMutation, RemoveColumnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveColumnMutation, RemoveColumnMutationVariables>(RemoveColumnDocument, options);
      }
export type RemoveColumnMutationHookResult = ReturnType<typeof useRemoveColumnMutation>;
export type RemoveColumnMutationResult = Apollo.MutationResult<RemoveColumnMutation>;
export type RemoveColumnMutationOptions = Apollo.BaseMutationOptions<RemoveColumnMutation, RemoveColumnMutationVariables>;
export const UpdateColumnsDocument = gql`
    mutation UpdateColumns($projectId: Int!, $columns: [ProjectColumnInput!]!) {
  updateColumnsForProject(projectId: $projectId, columns: $columns)
}
    `;
export type UpdateColumnsMutationFn = Apollo.MutationFunction<UpdateColumnsMutation, UpdateColumnsMutationVariables>;

/**
 * __useUpdateColumnsMutation__
 *
 * To run a mutation, you first call `useUpdateColumnsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColumnsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColumnsMutation, { data, loading, error }] = useUpdateColumnsMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      columns: // value for 'columns'
 *   },
 * });
 */
export function useUpdateColumnsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateColumnsMutation, UpdateColumnsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateColumnsMutation, UpdateColumnsMutationVariables>(UpdateColumnsDocument, options);
      }
export type UpdateColumnsMutationHookResult = ReturnType<typeof useUpdateColumnsMutation>;
export type UpdateColumnsMutationResult = Apollo.MutationResult<UpdateColumnsMutation>;
export type UpdateColumnsMutationOptions = Apollo.BaseMutationOptions<UpdateColumnsMutation, UpdateColumnsMutationVariables>;
export const StartTimerDocument = gql`
    mutation StartTimer($payload: StartTimerInput!) {
  startTimer(payload: $payload)
}
    `;
export type StartTimerMutationFn = Apollo.MutationFunction<StartTimerMutation, StartTimerMutationVariables>;

/**
 * __useStartTimerMutation__
 *
 * To run a mutation, you first call `useStartTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startTimerMutation, { data, loading, error }] = useStartTimerMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useStartTimerMutation(baseOptions?: Apollo.MutationHookOptions<StartTimerMutation, StartTimerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartTimerMutation, StartTimerMutationVariables>(StartTimerDocument, options);
      }
export type StartTimerMutationHookResult = ReturnType<typeof useStartTimerMutation>;
export type StartTimerMutationResult = Apollo.MutationResult<StartTimerMutation>;
export type StartTimerMutationOptions = Apollo.BaseMutationOptions<StartTimerMutation, StartTimerMutationVariables>;
export const StopTimerDocument = gql`
    mutation StopTimer {
  stopTimer {
    id
    description
    startDate
    endDate
    task {
      id
      name
    }
  }
}
    `;
export type StopTimerMutationFn = Apollo.MutationFunction<StopTimerMutation, StopTimerMutationVariables>;

/**
 * __useStopTimerMutation__
 *
 * To run a mutation, you first call `useStopTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopTimerMutation, { data, loading, error }] = useStopTimerMutation({
 *   variables: {
 *   },
 * });
 */
export function useStopTimerMutation(baseOptions?: Apollo.MutationHookOptions<StopTimerMutation, StopTimerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StopTimerMutation, StopTimerMutationVariables>(StopTimerDocument, options);
      }
export type StopTimerMutationHookResult = ReturnType<typeof useStopTimerMutation>;
export type StopTimerMutationResult = Apollo.MutationResult<StopTimerMutation>;
export type StopTimerMutationOptions = Apollo.BaseMutationOptions<StopTimerMutation, StopTimerMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($payload: CreateTaskInput!, $projectId: Int!) {
  createTask(payload: $payload, projectId: $projectId) {
    id
    name
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($payload: UpdateTaskInput!) {
  updateTask(payload: $payload)
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const UpdateTaskPositionDocument = gql`
    mutation UpdateTaskPosition($taskId: Int!, $prevCursor: String, $nextCursor: String) {
  updateTaskPosition(
    taskId: $taskId
    prevCursor: $prevCursor
    nextCursor: $nextCursor
  )
}
    `;
export type UpdateTaskPositionMutationFn = Apollo.MutationFunction<UpdateTaskPositionMutation, UpdateTaskPositionMutationVariables>;

/**
 * __useUpdateTaskPositionMutation__
 *
 * To run a mutation, you first call `useUpdateTaskPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskPositionMutation, { data, loading, error }] = useUpdateTaskPositionMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      prevCursor: // value for 'prevCursor'
 *      nextCursor: // value for 'nextCursor'
 *   },
 * });
 */
export function useUpdateTaskPositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskPositionMutation, UpdateTaskPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskPositionMutation, UpdateTaskPositionMutationVariables>(UpdateTaskPositionDocument, options);
      }
export type UpdateTaskPositionMutationHookResult = ReturnType<typeof useUpdateTaskPositionMutation>;
export type UpdateTaskPositionMutationResult = Apollo.MutationResult<UpdateTaskPositionMutation>;
export type UpdateTaskPositionMutationOptions = Apollo.BaseMutationOptions<UpdateTaskPositionMutation, UpdateTaskPositionMutationVariables>;
export const UpdateActiveTimerDocument = gql`
    mutation UpdateActiveTimer($payload: EditActiveTimerInput!) {
  updateActiveTimer(payload: $payload)
}
    `;
export type UpdateActiveTimerMutationFn = Apollo.MutationFunction<UpdateActiveTimerMutation, UpdateActiveTimerMutationVariables>;

/**
 * __useUpdateActiveTimerMutation__
 *
 * To run a mutation, you first call `useUpdateActiveTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateActiveTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateActiveTimerMutation, { data, loading, error }] = useUpdateActiveTimerMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useUpdateActiveTimerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateActiveTimerMutation, UpdateActiveTimerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateActiveTimerMutation, UpdateActiveTimerMutationVariables>(UpdateActiveTimerDocument, options);
      }
export type UpdateActiveTimerMutationHookResult = ReturnType<typeof useUpdateActiveTimerMutation>;
export type UpdateActiveTimerMutationResult = Apollo.MutationResult<UpdateActiveTimerMutation>;
export type UpdateActiveTimerMutationOptions = Apollo.BaseMutationOptions<UpdateActiveTimerMutation, UpdateActiveTimerMutationVariables>;
export const RequestBetaAccessDocument = gql`
    mutation RequestBetaAccess($input: BetaAccessInput!) {
  requestBetaAccess(input: $input)
}
    `;
export type RequestBetaAccessMutationFn = Apollo.MutationFunction<RequestBetaAccessMutation, RequestBetaAccessMutationVariables>;

/**
 * __useRequestBetaAccessMutation__
 *
 * To run a mutation, you first call `useRequestBetaAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestBetaAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestBetaAccessMutation, { data, loading, error }] = useRequestBetaAccessMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestBetaAccessMutation(baseOptions?: Apollo.MutationHookOptions<RequestBetaAccessMutation, RequestBetaAccessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestBetaAccessMutation, RequestBetaAccessMutationVariables>(RequestBetaAccessDocument, options);
      }
export type RequestBetaAccessMutationHookResult = ReturnType<typeof useRequestBetaAccessMutation>;
export type RequestBetaAccessMutationResult = Apollo.MutationResult<RequestBetaAccessMutation>;
export type RequestBetaAccessMutationOptions = Apollo.BaseMutationOptions<RequestBetaAccessMutation, RequestBetaAccessMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser {
    id
    email
    name
    phoneNumber
    dateOfBirth
    address
    profilePhotoUrl
    company {
      website
      id
      businessName
    }
  }
  currentEmployee {
    id
    bankInformation {
      bankName
      bankAccountNumber
    }
    permissionRole
    role {
      id
      name
    }
    team {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetFileUploadUrlDocument = gql`
    query GetFileUploadUrl($fileName: String!) {
  getFileUploadUrl(fileName: $fileName) {
    url
    fileName
  }
}
    `;

/**
 * __useGetFileUploadUrlQuery__
 *
 * To run a query within a React component, call `useGetFileUploadUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFileUploadUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFileUploadUrlQuery({
 *   variables: {
 *      fileName: // value for 'fileName'
 *   },
 * });
 */
export function useGetFileUploadUrlQuery(baseOptions: Apollo.QueryHookOptions<GetFileUploadUrlQuery, GetFileUploadUrlQueryVariables> & ({ variables: GetFileUploadUrlQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFileUploadUrlQuery, GetFileUploadUrlQueryVariables>(GetFileUploadUrlDocument, options);
      }
export function useGetFileUploadUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFileUploadUrlQuery, GetFileUploadUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFileUploadUrlQuery, GetFileUploadUrlQueryVariables>(GetFileUploadUrlDocument, options);
        }
export function useGetFileUploadUrlSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFileUploadUrlQuery, GetFileUploadUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFileUploadUrlQuery, GetFileUploadUrlQueryVariables>(GetFileUploadUrlDocument, options);
        }
export type GetFileUploadUrlQueryHookResult = ReturnType<typeof useGetFileUploadUrlQuery>;
export type GetFileUploadUrlLazyQueryHookResult = ReturnType<typeof useGetFileUploadUrlLazyQuery>;
export type GetFileUploadUrlSuspenseQueryHookResult = ReturnType<typeof useGetFileUploadUrlSuspenseQuery>;
export type GetFileUploadUrlQueryResult = Apollo.QueryResult<GetFileUploadUrlQuery, GetFileUploadUrlQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  login(input: {email: $email, password: $password})
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const SaveUserDetailsDocument = gql`
    mutation SaveUserDetails($personalDetails: UpdateUserInput!) {
  updateDetails(personalDetails: $personalDetails)
}
    `;
export type SaveUserDetailsMutationFn = Apollo.MutationFunction<SaveUserDetailsMutation, SaveUserDetailsMutationVariables>;

/**
 * __useSaveUserDetailsMutation__
 *
 * To run a mutation, you first call `useSaveUserDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUserDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUserDetailsMutation, { data, loading, error }] = useSaveUserDetailsMutation({
 *   variables: {
 *      personalDetails: // value for 'personalDetails'
 *   },
 * });
 */
export function useSaveUserDetailsMutation(baseOptions?: Apollo.MutationHookOptions<SaveUserDetailsMutation, SaveUserDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveUserDetailsMutation, SaveUserDetailsMutationVariables>(SaveUserDetailsDocument, options);
      }
export type SaveUserDetailsMutationHookResult = ReturnType<typeof useSaveUserDetailsMutation>;
export type SaveUserDetailsMutationResult = Apollo.MutationResult<SaveUserDetailsMutation>;
export type SaveUserDetailsMutationOptions = Apollo.BaseMutationOptions<SaveUserDetailsMutation, SaveUserDetailsMutationVariables>;
export const SaveBankDetailsDocument = gql`
    mutation SaveBankDetails($bankDetails: BankDetailsInput!) {
  saveBankDetails(bankDetails: $bankDetails)
}
    `;
export type SaveBankDetailsMutationFn = Apollo.MutationFunction<SaveBankDetailsMutation, SaveBankDetailsMutationVariables>;

/**
 * __useSaveBankDetailsMutation__
 *
 * To run a mutation, you first call `useSaveBankDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveBankDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveBankDetailsMutation, { data, loading, error }] = useSaveBankDetailsMutation({
 *   variables: {
 *      bankDetails: // value for 'bankDetails'
 *   },
 * });
 */
export function useSaveBankDetailsMutation(baseOptions?: Apollo.MutationHookOptions<SaveBankDetailsMutation, SaveBankDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveBankDetailsMutation, SaveBankDetailsMutationVariables>(SaveBankDetailsDocument, options);
      }
export type SaveBankDetailsMutationHookResult = ReturnType<typeof useSaveBankDetailsMutation>;
export type SaveBankDetailsMutationResult = Apollo.MutationResult<SaveBankDetailsMutation>;
export type SaveBankDetailsMutationOptions = Apollo.BaseMutationOptions<SaveBankDetailsMutation, SaveBankDetailsMutationVariables>;
export const DeleteUserProfilePhotoDocument = gql`
    mutation DeleteUserProfilePhoto {
  removeUserProfilePhoto
}
    `;
export type DeleteUserProfilePhotoMutationFn = Apollo.MutationFunction<DeleteUserProfilePhotoMutation, DeleteUserProfilePhotoMutationVariables>;

/**
 * __useDeleteUserProfilePhotoMutation__
 *
 * To run a mutation, you first call `useDeleteUserProfilePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserProfilePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserProfilePhotoMutation, { data, loading, error }] = useDeleteUserProfilePhotoMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserProfilePhotoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserProfilePhotoMutation, DeleteUserProfilePhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserProfilePhotoMutation, DeleteUserProfilePhotoMutationVariables>(DeleteUserProfilePhotoDocument, options);
      }
export type DeleteUserProfilePhotoMutationHookResult = ReturnType<typeof useDeleteUserProfilePhotoMutation>;
export type DeleteUserProfilePhotoMutationResult = Apollo.MutationResult<DeleteUserProfilePhotoMutation>;
export type DeleteUserProfilePhotoMutationOptions = Apollo.BaseMutationOptions<DeleteUserProfilePhotoMutation, DeleteUserProfilePhotoMutationVariables>;
export const SaveUserProfilePhotoDocument = gql`
    mutation SaveUserProfilePhoto($fileName: String!) {
  saveUserProfilePhoto(fileName: $fileName)
}
    `;
export type SaveUserProfilePhotoMutationFn = Apollo.MutationFunction<SaveUserProfilePhotoMutation, SaveUserProfilePhotoMutationVariables>;

/**
 * __useSaveUserProfilePhotoMutation__
 *
 * To run a mutation, you first call `useSaveUserProfilePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUserProfilePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUserProfilePhotoMutation, { data, loading, error }] = useSaveUserProfilePhotoMutation({
 *   variables: {
 *      fileName: // value for 'fileName'
 *   },
 * });
 */
export function useSaveUserProfilePhotoMutation(baseOptions?: Apollo.MutationHookOptions<SaveUserProfilePhotoMutation, SaveUserProfilePhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveUserProfilePhotoMutation, SaveUserProfilePhotoMutationVariables>(SaveUserProfilePhotoDocument, options);
      }
export type SaveUserProfilePhotoMutationHookResult = ReturnType<typeof useSaveUserProfilePhotoMutation>;
export type SaveUserProfilePhotoMutationResult = Apollo.MutationResult<SaveUserProfilePhotoMutation>;
export type SaveUserProfilePhotoMutationOptions = Apollo.BaseMutationOptions<SaveUserProfilePhotoMutation, SaveUserProfilePhotoMutationVariables>;
export const SignupUserDocument = gql`
    mutation SignupUser($input: SignupInput!) {
  signup(input: $input)
}
    `;
export type SignupUserMutationFn = Apollo.MutationFunction<SignupUserMutation, SignupUserMutationVariables>;

/**
 * __useSignupUserMutation__
 *
 * To run a mutation, you first call `useSignupUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupUserMutation, { data, loading, error }] = useSignupUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupUserMutation(baseOptions?: Apollo.MutationHookOptions<SignupUserMutation, SignupUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupUserMutation, SignupUserMutationVariables>(SignupUserDocument, options);
      }
export type SignupUserMutationHookResult = ReturnType<typeof useSignupUserMutation>;
export type SignupUserMutationResult = Apollo.MutationResult<SignupUserMutation>;
export type SignupUserMutationOptions = Apollo.BaseMutationOptions<SignupUserMutation, SignupUserMutationVariables>;
export const VerifyUserDocument = gql`
    mutation VerifyUser($input: VerificationInput!) {
  verify(input: $input)
}
    `;
export type VerifyUserMutationFn = Apollo.MutationFunction<VerifyUserMutation, VerifyUserMutationVariables>;

/**
 * __useVerifyUserMutation__
 *
 * To run a mutation, you first call `useVerifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyUserMutation, { data, loading, error }] = useVerifyUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyUserMutation(baseOptions?: Apollo.MutationHookOptions<VerifyUserMutation, VerifyUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyUserMutation, VerifyUserMutationVariables>(VerifyUserDocument, options);
      }
export type VerifyUserMutationHookResult = ReturnType<typeof useVerifyUserMutation>;
export type VerifyUserMutationResult = Apollo.MutationResult<VerifyUserMutation>;
export type VerifyUserMutationOptions = Apollo.BaseMutationOptions<VerifyUserMutation, VerifyUserMutationVariables>;