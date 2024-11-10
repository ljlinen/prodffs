import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function useAdminContext() {
  const context = useContext(AdminContext);

  if (!context) throw Error("You must be inside AdminContextPRovider");

  return context;
}
