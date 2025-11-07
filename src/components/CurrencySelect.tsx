import { SelectHTMLAttributes } from "react";
import { CURRENCIES } from "../constants";
import { Select } from "./components";
import { I18N } from "../constants/i18n";

export const CurrencySelect = (
  props: SelectHTMLAttributes<HTMLSelectElement>
) => {
  return (
    <Select {...props} aria-label={I18N.CURRENCY_FILTER_LABEL}>
      <option value=""></option>
      {CURRENCIES.map((currency) => {
        return (
          <option key={currency} value={currency}>
            {currency}
          </option>
        );
      })}
    </Select>
  );
};
