import { instance } from '@/lib/axios';

import { DeleteReviews, PostReviews, PutReviews, ReviewsParams } from '@/types/reviews';

export const getReviewsMine = async (value: ReviewsParams) => {
  const { page, size, sortBy, sortOrder } = value;
  const res = await instance.get(
    `/reviews/mine?page=${page}&size=${size}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  );
  return res.data;
};

export const postReviews = async (value: PostReviews) => {
  const res = await instance.post(`/reviews`, value);
  return res;
};

export const putReviews = async ({ reviewId, value }: PutReviews) => {
  const res = await instance.put(`/reviews/${reviewId}`, value);
  return res;
};

export const deleteReviews = async ({ reviewId, value }: DeleteReviews) => {
  const config = {
    data: value,
  };
  const res = await instance.delete(`/reviews/${reviewId}`, config);
  return res;
};
