import { PaginatedQueryInput } from '../../shared/paginated-query.input';
import { GetTimeEntriesFilters } from './dto/get-time-entries.filters';

export type GetTimeCompanyEntriesArgs = {
  companyId: number;
  options: PaginatedQueryInput | null;
  filters: GetTimeEntriesFilters | null;
};

export type GetTimeEmployeeEntriesArgs = {
  employeeId: number;
  options: PaginatedQueryInput | null;
};
