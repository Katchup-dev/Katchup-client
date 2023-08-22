import { getCategories, getFolders, getTasks } from 'core/apis/input';
import { InputCategoryInfo, InputFolderInfo, InputTaskInfo, KatchupResponse } from 'types/input';

import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
  const { data, isLoading, error } = useQuery<KatchupResponse<InputCategoryInfo[]>>(['categories'], getCategories);

  return {
    categories: data?.data,
    isCategoriesLoading: isLoading,
    isCategoriesError: error,
  };
};

export const useGetFolders = () => {
  const { data, isLoading, error } = useQuery<KatchupResponse<InputFolderInfo[]>>(['folders'], getFolders);

  return {
    folders: data?.data,
    isFoldersLoading: isLoading,
    isFoldersError: error,
  };
};

export const useGetTasks = () => {
  const { data, isLoading, error } = useQuery<KatchupResponse<InputTaskInfo[]>>(['tasks'], getTasks);

  return {
    tasks: data?.data,
    isTasksLoading: isLoading,
    isTasksError: error,
  };
};
