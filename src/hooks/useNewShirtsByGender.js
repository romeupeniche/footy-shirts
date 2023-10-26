import { useDatabaseSnapshot } from "@react-query-firebase/database";
import { limitToFirst, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";

export default function useNewShirtsByGender() {
  const [newShirts, setNewShirts] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const dbMenRef = ref(db, "shirts/men");
  const dbKidsRef = ref(db, "shirts/kids");
  const dbWomenRef = ref(db, "shirts/women");
  const lastMenShirtRef = query(dbMenRef, limitToFirst(1));
  const lastKidsShirtRef = query(dbKidsRef, limitToFirst(1));
  const lastWomenShirtRef = query(dbWomenRef, limitToFirst(1));

  const { data: menData, isLoading: menIsLoading } = useDatabaseSnapshot(
    ["shirts", lastMenShirtRef, "men"],
    lastMenShirtRef,
    { subscribe: true }
  );
  const { data: womenData, isLoading: womenIsLoading } = useDatabaseSnapshot(
    ["shirts", lastWomenShirtRef, "women"],
    lastWomenShirtRef,
    { subscribe: true }
  );
  const { data: kidsData, isLoading: kidsIsLoading } = useDatabaseSnapshot(
    ["shirts", lastKidsShirtRef, "kids"],
    lastKidsShirtRef,
    { subscribe: true }
  );

  useEffect(() => {
    if (!menIsLoading && !womenIsLoading && !kidsIsLoading) {
      setIsPageLoading(false);

      const menShirtTitle = Object.keys(menData.val())[0];
      const womenShirtTitle = Object.keys(womenData.val())[0];
      const kidsShirtTitle = Object.keys(kidsData.val())[0];

      const menShirt = menData.val()[menShirtTitle];
      const womenShirt = womenData.val()[womenShirtTitle];
      const kidsShirt = kidsData.val()[kidsShirtTitle];

      setNewShirts([
        { ...kidsShirt, gender: "kids" },
        { ...menShirt, gender: "men" },
        { ...womenShirt, gender: "women" },
      ]);
    } else {
      setIsPageLoading(true);
    }
  }, [
    menData,
    womenData,
    kidsData,
    menIsLoading,
    womenIsLoading,
    kidsIsLoading,
  ]);

  return [newShirts, isPageLoading];
}
