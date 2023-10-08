import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useNewShirtsByGender() {
  const [newShirts, setNewShirts] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const currentShirts = useSelector((state) => state.shirts.shirts);

  useEffect(() => {
    setIsPageLoading(true);
    if (Object.keys(currentShirts).length) {
      setIsPageLoading(false);
      const shirts = currentShirts;
      let genderTitles = Object.keys(shirts);
      let firstKidsShirt = shirts.kids[Object.keys(shirts.kids)[0]];
      let firstMenShirt = shirts.men[Object.keys(shirts.men)[0]];
      let firstWomenShirt = shirts.women[Object.keys(shirts.women)[0]];

      setNewShirts([
        { ...firstKidsShirt, gender: genderTitles[0] },
        { ...firstMenShirt, gender: genderTitles[1] },
        { ...firstWomenShirt, gender: genderTitles[2] },
      ]);
    }
  }, [currentShirts, setNewShirts, setIsPageLoading]);
  return [newShirts, isPageLoading];
}
