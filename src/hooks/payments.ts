import { ChangeEvent, useState } from "react";
import { PaymentSearchResponse, Query } from "../types/payment";
import axios, { AxiosResponse } from "axios";
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

  const onClickSearch = () => {
    setQuery((prev) => ({ ...prev, search }));
  };
  const queryString = objToQueryString(query);
  const getData = async (): Promise<AxiosResponse<PaymentSearchResponse>> => {
    return axios.get(`/api/payments?${queryString}`);
  };
  const { data, isFetching, error } = useQuery({
    queryKey: ["payments", query],
    queryFn: getData,
  });
  return {
    data: data?.data ?? null,
    isFetching,
    error,
    query,
    setQuery,
    search,
    onInputChange,
    onClickSearch,
    onClickClear,
  };
};
