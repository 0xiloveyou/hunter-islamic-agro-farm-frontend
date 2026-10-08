import {
  
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function getAllSharkRequest() {
  return useMutation({
    mutationFn: getAllSharkRequest,
  });
}
