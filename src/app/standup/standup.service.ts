import Axios from 'axios';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';

import { Project, Speaker } from './standup.types';

const ENDPOINT_STANDUP_PROJECTS = 'https://api.npoint.io/ad43d8dfafb526a7323c';
const ENDPOINT_STANDUP_SPEAKERS = 'https://api.npoint.io/6c13d8f51cd9c46d2c3d';

export const useProjects = (config: UseQueryOptions<Project[]> = {}) => {
  return useQuery(
    ['projects'],
    (): Promise<Project[]> => Axios.get(ENDPOINT_STANDUP_PROJECTS),
    {
      ...config,
    }
  );
};

export const useSpeakers = (config: UseQueryOptions<Speaker[]> = {}) => {
  return useQuery(
    ['speakers'],
    (): Promise<Speaker[]> => Axios.get(ENDPOINT_STANDUP_SPEAKERS),
    {
      ...config,
    }
  );
};

export const useSpeaker = (
  id: number,
  config: UseQueryOptions<Speaker> = {}
) => {
  return useQuery(
    ['speaker', id],
    (): Promise<Speaker> =>
      Axios.get(ENDPOINT_STANDUP_SPEAKERS).then((response) => {
        const speakers = (response as unknown) as Speaker[];
        return speakers?.find((speaker) => speaker?.id === id);
      }),
    {
      enabled: !!id,
      ...config,
    }
  );
};

export const useProjectAdd = (
  config: UseMutationOptions<string, unknown, string> = {}
) => {
  const { data: projects } = useProjects();
  const queryCache = useQueryClient();
  return useMutation(
    (name) =>
      Axios.post(ENDPOINT_STANDUP_PROJECTS, [
        ...projects,
        { name, id: projects?.length + 1 },
      ]),
    {
      ...config,
      onSuccess: () => {
        queryCache.invalidateQueries('projects');
      },
    }
  );
};

export const useSpeakerAdd = (
  config: UseMutationOptions<any, unknown, any> = {}
) => {
  const { data: speakers } = useSpeakers();
  const queryCache = useQueryClient();
  return useMutation(
    ({ name, projectId }) =>
      Axios.post(ENDPOINT_STANDUP_SPEAKERS, [
        ...speakers,
        { name, id: (Math.random() * 10000).toFixed(0), projectId },
      ]),
    {
      ...config,
      onSuccess: () => {
        queryCache.invalidateQueries('speakers');
      },
    }
  );
};

export const useSpeakerDelete = (
  config: UseMutationOptions<number, unknown, number> = {}
) => {
  const queryCache = useQueryClient();
  const { data: speakers } = useSpeakers();
  return useMutation(
    (id) =>
      Axios.post(
        ENDPOINT_STANDUP_SPEAKERS,
        speakers?.filter((speaker) => speaker?.id !== id)
      ),
    {
      ...config,
      onSuccess: () => {
        queryCache.invalidateQueries('speakers');
      },
    }
  );
};

export const useProjectDelete = (
  config: UseMutationOptions<number, unknown, number> = {}
) => {
  const queryCache = useQueryClient();
  const { data: projects } = useProjects();
  const { data: speakers } = useSpeakers();
  const { mutate: updateSpeakers } = useSpeakersUpdate();

  return useMutation(
    (id) => {
      updateSpeakers(
        speakers?.map((speaker) => ({
          ...speaker,
          projectId: speaker?.projectId === id ? undefined : speaker?.projectId,
        }))
      );
      return Axios.post(
        ENDPOINT_STANDUP_PROJECTS,
        projects?.filter((project) => project?.id !== id)
      );
    },
    {
      ...config,
      onSuccess: () => {
        queryCache.invalidateQueries('projects');
      },
    }
  );
};

export const useSpeakersUpdate = (
  config: UseMutationOptions<Speaker[], unknown, Speaker[]> = {}
) => {
  const queryCache = useQueryClient();
  return useMutation(
    (speakers) => Axios.post(ENDPOINT_STANDUP_SPEAKERS, speakers),
    {
      ...config,
      onSuccess: () => {
        queryCache.invalidateQueries('speakers');
      },
    }
  );
};
