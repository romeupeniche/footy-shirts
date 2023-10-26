import { useLocation } from "react-router-dom";
import ShirtForm from "../../components/ShirtForm";
import useUpdateShirt from "../../hooks/useUpdateShirt";
function EditShirtPage() {
  const { mutate } = useUpdateShirt();
  const { state } = useLocation();
  const { currentGender } = state;
  const { item } = state;

  const onSubmit = (shirt) => {
    mutate(shirt);
  };

  return (
    <ShirtForm
      currentGender={currentGender}
      item={item}
      onSubmit={onSubmit}
      isEditing={true}
    />
  );
}

export default EditShirtPage;
