export type Book = {
  id: number;
  author: string;
  country: string;
  link: string;
  imageLink: string;
  language: string;
  pages: number;
  title: string;
  year: number;
};

export type Member = {
  id: number;
  name: string;
  role: Role;
  email: string;
  posts: Post[];
  profile: Profile;
  address: string;
  imageLink: string;
};

export enum Role {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
}
export type Post = {
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  title?: string;
  published: boolean;
  author: Member;
  authorId: number;
  categories?: Category[];
};

// Define TypeScript type for the Profile model
export type Profile = {
  id?: number;
  bio?: string;
  member?: Member;
  memberId?: number;
};

// Define TypeScript type for the Category model
export type Category = {
  id?: number;
  name?: string;
  description?: string;
  post: Post[];
};
