import { child, push, ref } from "firebase/database";
import { db } from "../firebase-config";
import {
  useDatabaseSetMutation,
  useDatabaseUpdateMutation,
} from "@react-query-firebase/database";
import { useEffect, useState } from "react";
import { queryClient } from "../util/http";
import { useNavigate } from "react-router-dom";

const useUpdateShirt = () => {
  const [givenItem, setGivenItem] = useState({});
  const navigate = useNavigate();

  const gender = givenItem.gender;
  const shirtRef = ref(db, `shirts/${gender}/${givenItem.id}`);
  const {
    mutate: setMutate,
    isLoading: setMutIsLoading,
    isSuccess: setMutIsSuccess,
    isError: setMutIsError,
    error: setMutError,
  } = useDatabaseSetMutation(shirtRef, undefined, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shirts", gender],
      });
      navigate("/" + gender);
    },
  });
  const {
    mutate: updateMutate,
    isLoading: updateMutIsLoading,
    isSuccess: updateMutIsSuccess,
    isError: updateMutIsError,
    error: updateMutError,
  } = useDatabaseUpdateMutation(shirtRef, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shirts", gender],
      });
      navigate("/" + gender);
    },
  });

  const mutate = (providedItem) => {
    if (!providedItem.id) {
      const newShirtKey = push(child(ref(db), "shirts/" + gender)).key;
      const newShirtId =
        providedItem.name.replace(/[^A-Z0-9]/gi, "_").toLowerCase() +
        "_" +
        newShirtKey;
      setGivenItem({ ...providedItem, id: newShirtId, update: false });
    } else {
      setGivenItem({ ...providedItem, update: true });
    }
  };

  useEffect(() => {
    if (givenItem.id) {
      const processedItem = {
        imgs: givenItem.imgs,
        price: givenItem.price,
        sizes: givenItem.sizes,
        name: givenItem.name,
        commonTypos: givenItem.commonTypos,
        id: givenItem.id,
      };

      if (givenItem.update) {
        updateMutate({ ...processedItem });
      } else {
        setMutate({ ...processedItem });
      }
    }
  }, [givenItem, updateMutate, setMutate]);

  let returnObj;
  if (givenItem.id) {
    returnObj = {
      isLoading: updateMutIsLoading,
      isSuccess: updateMutIsSuccess,
      isError: updateMutIsError,
      error: updateMutError,
      mutate,
    };
  } else {
    returnObj = {
      isLoading: setMutIsLoading,
      isSuccess: setMutIsSuccess,
      isError: setMutIsError,
      error: setMutError,
      mutate,
    };
  }

  return returnObj;
};

export default useUpdateShirt;
