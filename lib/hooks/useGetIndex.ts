import { getCategories, getSubTasks, getTasks } from 'core/apis/input';
import { InputCategoryInfo, InputSubTaskInfo, InputTaskInfo, KatchupResponse } from 'types/input';

import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
  const { data, isLoading, error } = useQuery<KatchupResponse<InputCategoryInfo[]>>(['categories'], getCategories);

  return {
    categories: data?.data,
    isCategoriesLoading: isLoading,
    isCategoriesError: error,
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

export const useGetSubTasks = () => {
  const { data, isLoading, error } = useQuery<KatchupResponse<InputSubTaskInfo[]>>(['subTasks'], getSubTasks);

  return {
    subTasks: data?.data,
    isSubTasksLoading: isLoading,
    isSubTasksError: error,
  };
};
