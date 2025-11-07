import { FormEvent, useEffect, useState } from "react";
import {
  PaymentFiltersForm,
  PaymentSearchResponse,
  Query,
} from "../types/payments";
import axios, { AxiosError, AxiosResponse } from "axios";
import { objToQueryString } from "../util/payments";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../constants";
import { useForm } from "react-hook-form";

export const useSearchPayments = () => {
  const [query, setQuery] = useState<Query>({});
  const [currentPage, setCurrentPage] = useState(1);
  const { register, getValues, reset, formState } = useForm<PaymentFiltersForm>(
    {
      defaultValues: {
        search: "",
        currency: "",
      },
    }
  );

  useEffect(() => {
    setQuery({ ...getValues(), page: currentPage });
  }, [currentPage]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(getValues());
    setCurrentPage(1);
    setQuery({ ...getValues() });
  };

  const queryString = objToQueryString(query as Record<string, string>);

  const getData = async (): Promise<AxiosResponse<PaymentSearchResponse>> => {
    return axios.get(`${API_URL}/?${queryString}`);
  };

  const { data, isLoadingError, error } = useQuery({
    queryKey: ["payments", query],
    queryFn: getData,
  });

  return {
    data: data?.data ?? null,
    currentPage,
    setCurrentPage,
    isLoadingError,
    error: error as AxiosError,
    register,
    formState,
    reset,
    onSubmit,
  };
};
