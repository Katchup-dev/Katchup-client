import { useMutation } from '@tanstack/react-query';
import { deleteFile, deleteScreenshot } from 'core/apis/input';

export const useDeleteScreenshot = () => {
  const { mutateAsync, isLoading, isError } = useMutation(deleteScreenshot);

  return {
    deleteScreenshot: mutateAsync,
    isLoading: isLoading,
    error: isError,
  };
};

export const useDeleteFile = () => {
  const { mutateAsync, isLoading, isError } = useMutation(deleteFile);

  return {
    deleteFile: mutateAsync,
    isLoading: isLoading,
    error: isError,
  };
};
