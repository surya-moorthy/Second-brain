import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import type { CardProps } from "../types/types";

// Fetch function
const fetchContents = async (): Promise<CardProps[]> => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return response.data.contents;
};

// Delete function
const deleteContent = async (id: string) => {
  await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
};

export function useContent() {
  const queryClient = useQueryClient();

  // Fetch contents
  const { data: contents = [], isLoading } = useQuery({
    queryKey: ["contents"],
    queryFn: fetchContents,
  });

  // Delete content mutation
  const deleteMutation = useMutation({
    mutationFn: deleteContent,
    onSuccess: () => {
      // Refetch contents after deletion
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
  });

  return {
    contents,
    loading: isLoading,
    deleteContent: deleteMutation.mutate,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["contents"] }),
  };
}
