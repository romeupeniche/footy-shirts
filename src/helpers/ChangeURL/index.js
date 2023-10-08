import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ChangeURL = () => {
  const { pathname } = useLocation();
  const pageName = pathname.replace(/[^\w\s]/gi, "");
  let formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  useEffect(() => {
    if (formattedPageName.trim().length === 0) {
      document.title = "Footy Shirts";
    } else if (formattedPageName.match(/\d/)) {
      return;
    } else if (formattedPageName.includes("Search")) {
      const search = formattedPageName.split("Search")[1];
      document.title = `Footy Shirts | Search | "${search}"`;
    } else if (formattedPageName.includes("checkout")) {
      document.title = `Footy Shirts | Checkout`;
    } else {
      document.title = `Footy Shirts | ${formattedPageName}`;
    }
  }, [formattedPageName]);
};

const changeURLWithShirtTitle = (title) => {
  document.title = `Footy Shirts | ${title}`;
};

const changeURLDueToError = () => {
  document.title = `Footy Shirts | Page Not Found`;
};

export default ChangeURL;
export { changeURLWithShirtTitle, changeURLDueToError };
