export const QUEUES = {
  PTO_QUEUE: {
    name: 'PTO_QUEUE',
    PTO_ACCRUALS: {
      id: 'PTO_ACCRUALS_CRON_JOB_ID',
      name: 'PTO_ACCRUALS_CRON_JOB',
    },
  },
  CHECK_INS_QUEUE: {
    name: 'CHECK_INS_QUEUE',
    CHECK_INS: {
      id: 'CRON_JOB_FOR_CHECK_INS_ID_UNIQUE_ID',
      name: 'cron-job-for-check-ins',
    },
  },
  EMPLOYEES_QUEUE: {
    name: 'EMPLOYEES_QUEUE',
    EXPIRED_INVITES: {
      id: 'EMPLOYEE_EXPIRED_INVITES_JOB_ID',
      name: 'EMPLOYEE_EXPIRED_INVITES_JOB',
    },
    PROFILE_IMAGE_GENERATOR: {
      id: 'EMPLOYEE_PROFILE_IMAGE_GENERATOR_JOB_ID',
      name: 'EMPLOYEE_PROFILE_IMAGE_GENERATOR_JOB',
    },
  },
  NOTIFICATIONS_QUEUE: {
    name: 'notifications-queue',
    SEND_EMAIL: {
      name: 'send-email',
    },
  },
};
