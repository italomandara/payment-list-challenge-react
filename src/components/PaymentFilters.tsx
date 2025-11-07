import { UseFormReturn } from "react-hook-form";
import { I18N } from "../constants/i18n";
import {
  ClearButton,
  FilterRow,
  SearchButton,
  SearchInput,
} from "./components";
import { CurrencySelect } from "./CurrencySelect";
import { PaymentFiltersForm } from "../types/payments";

interface PaymentFiltersProps {
  formProps: Pick<
    UseFormReturn<PaymentFiltersForm>,
    "register" | "reset" | "formState"
  >;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const PaymentFilters = ({
  onSubmit,
  formProps: { reset, register, formState },
}: PaymentFiltersProps) => {
  const onClickClear = () => reset();
  return (
    <form onSubmit={onSubmit}>
      <FilterRow>
        <SearchInput
          aria-label={I18N.SEARCH_LABEL}
          role="searchbox"
          {...register("search")}
          placeholder={I18N.SEARCH_PLACEHOLDER}
        />
        <CurrencySelect {...register("currency")} />
        <SearchButton>{I18N.SEARCH_BUTTON}</SearchButton>
        {formState?.isDirty && (
          <ClearButton onClick={onClickClear}>{I18N.CLEAR_FILTERS}</ClearButton>
        )}
      </FilterRow>
    </form>
  );
};
