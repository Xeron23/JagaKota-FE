import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import http from '../lib/axios';

// Create Comment
const createComment = async ({ reportId, content }) => {
  try {
    const response = await http.post('/report/comment', {
      report_id: reportId,
      content: content
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Gagal menambahkan komentar");
  }
};

// Delete Comment
const deleteComment = async (commentId) => {
  try {
    const response = await http.delete(`/report/comment/${commentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Gagal menghapus komentar");
  }
};

// Fetch Comments
const fetchComments = async (reportId) => {
  if (!reportId) return [];
  const res = await http.get(`/report/${reportId}/comment`);
  const payload = res.data?.data?.data || res.data?.data || [];

  console.log("Fetched comments:", payload);
  return payload;
};

// Custom Hook
export const useComments = (reportId) => {
  const queryClient = useQueryClient();

  // Query untuk ambil data komentar
  const commentsQuery = useQuery({
    queryKey: ['comments', reportId],
    queryFn: () => fetchComments(reportId),
    enabled: !!reportId,
    staleTime: 10000
  });

  // Mutation untuk create comment
  const createCommentMutation = useMutation({
    mutationFn: ({ content }) => createComment({ reportId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', reportId]);
      queryClient.invalidateQueries(['report', reportId]);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  // Mutation untuk delete comment
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', reportId]);
      queryClient.invalidateQueries(['report', reportId]);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return {
    comments: commentsQuery.data,
    isLoadingComments: commentsQuery.isLoading,
    createComment: createCommentMutation,
    deleteComment: deleteCommentMutation,
    isCreating: createCommentMutation.isLoading,
    isDeleting: deleteCommentMutation.isLoading
  };
};
