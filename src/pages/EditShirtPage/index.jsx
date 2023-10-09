import { useLocation } from "react-router-dom";
import ShirtForm from "../../components/ShirtForm";

function EditShirtPage() {
  const { state } = useLocation();
  const { currentGender } = state;
  const { item } = state;

  return <ShirtForm currentGender={currentGender} item={item} />;
}

export default EditShirtPage;
