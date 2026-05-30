import { toast } from "sonner";
import { ToasterType } from "../types/toaster-types";

interface errorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export const successToast = (type: ToasterType, message: string) => {
  if (type === "SUCCESS") {
    toast.success(message);
  }
};

export const errorToast = (type: ToasterType, error: errorResponse) => {
  const errorMessage =
    error?.response?.data?.message || "Something went wrong!";
  if (type === "ERROR") {
    toast.error(errorMessage);
  }
};
