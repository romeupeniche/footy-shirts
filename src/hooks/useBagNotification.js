import {
  clearBagNotificationMessage,
  hideBagNotification,
  triggerBagNotification,
} from "../store/bagSlice";
import { useDispatch } from "react-redux";

export default function useBagNotification() {
  const dispatch = useDispatch();

  const trigger = (message) => {
    dispatch(triggerBagNotification(message));
    setTimeout(() => {
      dispatch(hideBagNotification());
    }, 3000);
    setTimeout(() => {
      dispatch(clearBagNotificationMessage());
    }, 3300);
  };

  return trigger;
}
