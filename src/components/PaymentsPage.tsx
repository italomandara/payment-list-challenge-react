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
import { AxiosError } from "axios";

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
      {isLoadingError && error.status === 404 ? (
        <ErrorBox>{I18N.PAYMENT_NOT_FOUND}</ErrorBox>
      ) : (
        <PaymentsTable data={data?.payments ?? null} />
      )}
    </Container>
  );
};
