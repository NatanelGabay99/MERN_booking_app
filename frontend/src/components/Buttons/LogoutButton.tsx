import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../api-clients/usersAPIservice";

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const mutation = useMutation<unknown, Error>({
    mutationFn: () => apiClient.logout(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      showToast({ message: "Logout successful", type: "success" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "error" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div onClick={handleClick} className="logout-btn">
      Logout
    </div>
  );
};

export default LogoutButton;
