import { useSearchPayments } from "../hooks/payments";
import { Container, ErrorBox, TableWrapper, Title } from "./components";
import { PaymentsTable } from "./PaymentsTable";
import { I18N } from "../constants/i18n";
import { useMemo } from "react";
import { PaymentFilters } from "./PaymentFilters";

export const PaymentsPage = () => {
  const { data, isLoadingError, error, ...filtersProps } = useSearchPayments();

  const errorMsg = useMemo(() => {
    switch (error?.status) {
      case 404:
        return I18N.PAYMENT_NOT_FOUND;
      case 500:
        return I18N.INTERNAL_SERVER_ERROR;
      default:
        return I18N.SOMETHING_WENT_WRONG;
    }
  }, [error?.status]);

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>
      <PaymentFilters
        reset={filtersProps.reset}
        formState={filtersProps.formState}
        register={filtersProps.register}
        onSubmit={filtersProps.onSubmit}
      />
      {isLoadingError ? (
        <ErrorBox>{errorMsg}</ErrorBox>
      ) : (
        <TableWrapper>
          <PaymentsTable data={data?.payments ?? null} />
        </TableWrapper>
      )}
    </Container>
  );
};
