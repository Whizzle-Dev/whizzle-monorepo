import { PaginatedQueryInput } from '../../shared/paginated-query.input';
import { GetTimeEntriesFilters } from './dto/get-time-entries.filters';

export type GetTimeEntriesArgs = {
  companyId: number;
  options: PaginatedQueryInput | null;
  filters: GetTimeEntriesFilters | null;
};
