import { ChangeEvent, FormEvent, useState } from "react";
import { PaymentSearchResponse, Query } from "../types/payment";
import axios, { AxiosError, AxiosResponse } from "axios";
import { objToQueryString } from "../util/payments";
import { useQuery } from "@tanstack/react-query";

export const useSearchPayments = () => {
  const [query, setQuery] = useState<Query>({});
  const [search, setSearch] = useState("");
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  const onClickClear = () => {
    setSearch("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery((prev) => ({ ...prev, search }));
  };

  const queryString = objToQueryString(query);

  const getData = async (): Promise<AxiosResponse<PaymentSearchResponse>> => {
    return axios.get(`/api/payments?${queryString}`);
  };

  const { data, isFetching, isLoadingError, error } = useQuery({
    queryKey: ["payments", query],
    queryFn: getData,
  });

  return {
    data: data?.data ?? null,
    isFetching,
    isLoadingError,
    error: error as AxiosError, //Tanstack query is wrongly casting error as Error
    query,
    setQuery,
    search,
    onInputChange,
    onSubmit,
    onClickClear,
  };
};
