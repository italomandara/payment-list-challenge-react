import { useSearchPayments } from "../hooks/payments";
import { Container, Title } from "./components";
import { PaymentsTable } from "./PaymentsTable";
import { I18N } from "../constants/i18n";

export const PaymentsPage = () => {
  const { data } = useSearchPayments({ page: 1, pageSize: 5 });
  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>
      <PaymentsTable data={data ?? null} />
    </Container>
  );
};
