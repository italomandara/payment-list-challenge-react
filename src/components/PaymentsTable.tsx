import { I18N } from "../constants/i18n";
import { Nullable, Payment, Payments } from "../types/payment";
import { formatAmount, formatDate } from "../util/payments";
import {
  StatusBadge,
  Table,
  TableBodyWrapper,
  TableCell,
  TableHeader,
  TableHeaderRow,
  TableRow,
  TableWrapper,
} from "./components";

type PaymentsTableProps = {
  data: Nullable<Payments>;
};

export const PaymentsTable = ({ data }: PaymentsTableProps) => {
  return (
    <TableWrapper>
      <Table>
        <TableBodyWrapper>
          <TableHeaderRow>
            <TableHeader>{I18N.TABLE_HEADER_PAYMENT_ID}</TableHeader>
            <TableHeader>{I18N.TABLE_HEADER_DATE}</TableHeader>
            <TableHeader>{I18N.TABLE_HEADER_AMOUNT}</TableHeader>
            <TableHeader>{I18N.TABLE_HEADER_CUSTOMER}</TableHeader>
            <TableHeader>{I18N.TABLE_HEADER_CURRENCY}</TableHeader>
            <TableHeader>{I18N.TABLE_HEADER_STATUS}</TableHeader>
          </TableHeaderRow>
          {data !== null ? (
            data.map((item: Payment) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{formatDate(item.date)}</TableCell>
                <TableCell>{formatAmount(item.amount)}</TableCell>
                <TableCell>{item.customerName}</TableCell>
                <TableCell>{item.currency}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status}>{item.status}</StatusBadge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No data</TableCell>
            </TableRow>
          )}
        </TableBodyWrapper>
      </Table>
    </TableWrapper>
  );
};
