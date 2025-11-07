import { useSearchPayments } from "../hooks/payments";
import {
  ClearButton,
  Container,
  ErrorBox,
  FilterRow,
  SearchButton,
  SearchInput,
  Title,
} from "./components";
import { PaymentsTable } from "./PaymentsTable";
import { I18N } from "../constants/i18n";
import { useMemo } from "react";

export const PaymentsPage = () => {
  const {
    data,
    onInputChange,
    onSubmit,
    onClickClear,
    search,
    isLoadingError,
    error,
  } = useSearchPayments();

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
      <form onSubmit={onSubmit}>
        <FilterRow>
          <SearchInput
            aria-label="search"
            role="searchbox"
            onChange={onInputChange}
            value={search}
            placeholder={I18N.SEARCH_PLACEHOLDER}
          />

          <SearchButton>{I18N.SEARCH_BUTTON}</SearchButton>
          {search && (
            <ClearButton onClick={onClickClear}>
              {I18N.CLEAR_FILTERS}
            </ClearButton>
          )}
        </FilterRow>
      </form>
      {isLoadingError ? (
        <ErrorBox>{errorMsg}</ErrorBox>
      ) : (
        <PaymentsTable data={data?.payments ?? null} />
      )}
    </Container>
  );
};
