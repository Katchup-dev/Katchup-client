import { getCategories, getSubTasks, getTasks } from 'core/apis/input';
import { InputCategoryInfo, InputSubTaskInfo, InputTaskInfo, KatchupResponse } from 'types/input';

import { useQuery } from '@tanstack/react-query';

export const useGetCategories = (memberId: number) => {
  const { data, isLoading, error } = useQuery<KatchupResponse<InputCategoryInfo[]>>(['categories'], () =>
    getCategories(memberId),
  );

  return {
    categories: data?.data,
    isCategoriesLoading: isLoading,
    isCategoriesError: error,
  };
};

export const useGetTasks = (categoryId: number) => {
  const { data, isLoading, error } = useQuery<KatchupResponse<InputTaskInfo[]>>(['tasks', categoryId], () =>
    getTasks(categoryId),
  );

  return {
    tasks: data?.data,
    isTasksLoading: isLoading,
    isTasksError: error,
  };
};

export const useGetSubTasks = (taskId: number) => {
  const { data, isLoading, error } = useQuery<KatchupResponse<InputSubTaskInfo[]>>(['subTasks', taskId], () =>
    getSubTasks(taskId),
  );

  return {
    subTasks: data?.data,
    isSubTasksLoading: isLoading,
    isSubTasksError: error,
  };
};
