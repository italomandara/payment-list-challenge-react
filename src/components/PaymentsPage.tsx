import { useSearchPayments } from "../hooks/payments";
import {
  Container,
  FilterRow,
  SearchButton,
  SearchInput,
  Title,
} from "./components";
import { PaymentsTable } from "./PaymentsTable";
import { I18N } from "../constants/i18n";
import { ChangeEvent, useState } from "react";

export const PaymentsPage = () => {
  const { data, onInputChange, onClickSearch, search } = useSearchPayments();

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
      </FilterRow>
      <PaymentsTable data={data?.payments ?? null} />
    </Container>
  );
};
