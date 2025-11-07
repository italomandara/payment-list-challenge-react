import { useSearchPayments } from "../hooks/payments";
import {
  ClearButton,
  Container,
  FilterRow,
  SearchButton,
  SearchInput,
  Title,
} from "./components";
import { PaymentsTable } from "./PaymentsTable";
import { I18N } from "../constants/i18n";

export const PaymentsPage = () => {
  const { data, onInputChange, onClickSearch, onClickClear, search } =
    useSearchPayments();

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>
      <FilterRow>
        <SearchInput
          aria-label="search"
          role="searchbox"
          onChange={onInputChange}
          value={search}
          placeholder={I18N.SEARCH_PLACEHOLDER}
        />

        <SearchButton onClick={onClickSearch}>
          {I18N.SEARCH_BUTTON}
        </SearchButton>
        {search && (
          <ClearButton onClick={onClickClear}>{I18N.CLEAR_FILTERS}</ClearButton>
        )}
      </FilterRow>
      <PaymentsTable data={data?.payments ?? null} />
    </Container>
  );
};
