const BASE_URL = "https://upskilling-egypt.com:3003/api/v1";

export const BASE_USER = `${BASE_URL}/Users`;

export const URL_USER = {
  login: `${BASE_USER}/Login`,
  register: `${BASE_USER}/Register`,
  frogetpassword: `${BASE_USER}/Reset/Request`,
  resetpassword: `${BASE_USER}/Reset`,
  verifyAccount: `${BASE_USER}/verify`,
  GetallusersBymanger: `${BASE_USER}`,
  GetIdUser: (id: number) => `${BASE_USER}/${id}`,
  currentuser: `${BASE_USER}/currentUser`,
  changePassword: `${BASE_USER}/ChangePassword`,
};

const BASE_PROJECT = `${BASE_URL}/Project/`;

export const URL_PROJECT = {
  getallProject: BASE_PROJECT,
  deleteProject: (id: number) => `${BASE_PROJECT}/${id}`,
  getProjectById: (id: number) => `${BASE_PROJECT}/${id}`,
  updateProject: (id: number) => `${BASE_PROJECT}/${id}`,
  getProjectForemployee: `${BASE_PROJECT}/employee`,
  createProject: BASE_PROJECT,
};
export const BASE_TASKS = `${BASE_URL}/Task`;
// export const createtask="https://upskilling-egypt.com:3003/api/v1/Task"

export const URL_TASKS = {
  getallTasks: `${BASE_TASKS}/manager`,
  deletetask: (id: number) => `${BASE_TASKS}/${id}`,
  getTaskById: (id: number) => `${BASE_TASKS}/${id}`,
  updateTask: (id: number) => `${BASE_TASKS}/${id}`,
  createTask: BASE_TASKS,
  getmyassigntask: BASE_TASKS,
  changeStatus: (id: number) => `${BASE_TASKS}/${id}/change-status`,
  countalltask: `${BASE_TASKS}/count`,
};

export const BASE_IAMGE = "https://upskilling-egypt.com:3003/";
