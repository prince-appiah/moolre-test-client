import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { paymentsState } from "../atoms/paymentsAtom";
import { api } from "../axios";

const usePayments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const payments = useRecoilValue(paymentsState);
  const setPaymentsState = useSetRecoilState(paymentsState);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/payments");

        setPaymentsState(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [setPaymentsState]);

  const getPaidProduct = (product_id) => {
    const res = payments.find((item) => item.product_id === product_id);
    return res;
  };

  return { payments, isLoading, getPaidProduct };
};

export default usePayments;
