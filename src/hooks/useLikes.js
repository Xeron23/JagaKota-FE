import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import http from '../lib/axios';

const createLike = async (reportId) => {
  try {
    const response = await http.post('/report/like', {
      report_id: reportId
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Gagal menyukai laporan");
  }
};

const deleteLike = async (reportId) => {
  try {
    const response = await http.delete(`/report/like/${reportId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Gagal membatalkan like");
  }
};

const fetchLikes = async (reportId, username) => {
  if (!reportId) return { likesCount: 0, isLikedByUser: false };
  const res = await http.get(`/report/${reportId}/like`, {
    username: username
  });
  const payload =
    res.data?.data?.data ||
    res.data?.data ||
    { likesCount: 0, isLikedByUser: false };

  console.log("Fetched likes:", payload);
  return {
    likesCount: payload.likesCount ?? 0,
    isLikedByUser: payload.isLikedByUser ?? false
  };
};

export const useLikes = (reportId, username) => {
  const queryClient = useQueryClient();

  const likeQuery = useQuery({
    queryKey: ['likes', reportId],
    queryFn: () => fetchLikes(reportId, username),
    enabled: !!reportId,
    staleTime: 10000
  });

  const createLikeMutation = useMutation({
    mutationFn: () => createLike(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries(['likes', reportId]);
      queryClient.invalidateQueries(['report', reportId]);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const deleteLikeMutation = useMutation({
    mutationFn: () => deleteLike(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries(['likes', reportId]);
      queryClient.invalidateQueries(['report', reportId]);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return {
    likeData: likeQuery.data,
    isLoadingLikes: likeQuery.isLoading,
    createLike: createLikeMutation,
    deleteLike: deleteLikeMutation,
    isLiking: createLikeMutation.isLoading,
    isUnliking: deleteLikeMutation.isLoading
  };
};