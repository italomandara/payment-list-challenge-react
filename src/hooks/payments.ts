import { useEffect, useState } from "react";
import {
  Nullable,
  Payments,
  PaymentSearchResponse,
  Query,
} from "../types/payment";
import axios, { AxiosResponse } from "axios";
import { objToQueryString } from "../util/payments";

export const useSearchPayments = (query: Query) => {
  const [data, setData] = useState<Nullable<Payments>>(null);
  const queryString = objToQueryString(query);
  const getData = async () => {
    // this could use tanstack query if loading states are needed, but it's not needed at the moment
    const res: AxiosResponse<PaymentSearchResponse> = await axios.get(
      `/api/payments?${queryString}`
    );
    if (res.data) {
      setData(res.data.payments);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return { data };
};
