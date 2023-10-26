import { useLocation } from "react-router-dom";
import ShirtForm from "../../components/ShirtForm";
import useUpdateShirt from "../../hooks/useUpdateShirt";

function AddNewShirtPage() {
  const { mutate } = useUpdateShirt();
  const {
    state: {
      shirt: { gender },
    },
  } = useLocation();
  const onSubmit = (shirt) => {
    mutate(shirt);
  };

  return <ShirtForm onSubmit={onSubmit} currentGender={gender} />;
}

export default AddNewShirtPage;
