export interface MembershipInfo {
  package: string;
  articles_accessed: number;
  articles_limit: number;
  videos_accessed: number;
  videos_limit: number;
  is_unlimited: boolean;
}

export interface UserInfo {
  id: string;
  full_name: string;
  email: string;
}

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
  membership_info: MembershipInfo;
  user_info: UserInfo;
  articles: Article[];
  videos: Video[];
}

export interface DashboardResponse {
  data: {
    success: boolean;
    data: DashboardData;
  };
}
