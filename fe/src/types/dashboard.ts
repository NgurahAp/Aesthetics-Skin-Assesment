export interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  thumbnail: string;
  created_at: Date;
}

export interface Video {
  id: string;
  title: string;
  author: string;
  category: string;
  thumbnail: string;
  url: string;
  description: string;
  created_at: Date;
}

export interface DashboardData {
  articles: Article[];
  videos: Video[];
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export interface UpdateMembershipRequest {
  package: "A" | "B" | "C";
}

export interface ArticlesResponse {
  success: boolean;
  articles: Article[];
}

export interface VideosResponse {
  success: boolean;
  videos: Video[];
}
