import { instance } from '@/lib/axios';

import { GatheringsParams } from '@/types/gatherings';

// 전체에 대한 값은 어떻게 보내야하는지? 전체 안되고 특정 헬스, 러닝은 가능함.
export const getGatherings = async (
  page: number,
  mainCategoryName: string,
  subCategoryName: string,
  sortBy: string = 'dateTime',
  sortOrder: string = 'asc',
  location: string | null,
  size: number = 5,
) => {
  // `/gatherings?mainCategoryName=${mainCategoryName}&subCategoryName=${subCategoryName}&page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}&location=${location}`,
  const res = await instance.get(`/gatherings?`, {
    params: { page, mainCategoryName, subCategoryName, sortBy, sortOrder, location, size },
    // params: { page },
  });
  return res.data;
};

export const getDetailGatherings = async (gatheringId: number) => {
  const res = await instance.get(`/gatherings/${gatheringId}`);
  return res.data;
};

export const postGatherings = async (value: FormData) => {
  const res = await instance.post('/gatherings', value);
  return res;
};

export const getGatheringsMine = async (value: GatheringsParams) => {
  const { page, size, sortBy, sortOrder } = value;
  const res = await instance.get(
    `/gatherings/mine?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  );

  return res.data;
};

export const getGatheringsJoined = async (value: GatheringsParams) => {
  const { page, size, sortBy, sortOrder } = value;
  const res = await instance.get(
    `/gatherings/joined?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  );
  return res.data;
};

export const postGatheringsJoin = async (gatheringId: number) => {
  const res = await instance.post(`/gatherings/${gatheringId}/join`);
  return res.data;
};

export const postGatheringsLeave = async (gatheringId: number) => {
  const res = await instance.post(`/gatherings/${gatheringId}/leave`);
  return res.data;
};

export const deleteGatherings = async (gatheringId: number) => {
  const res = await instance.delete(`/gatherings/${gatheringId}/cancel`);
  return res.data;
};
