export type PtoRequestCreatedEvent = {
  approvers: number[];
  timeOfRequest: {
    id: number;
    endDate: Date;
    startDate: Date;
    workingDays: number;
    requestedById: number;
    categoryId: number;
  };
};
