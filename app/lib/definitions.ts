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
  address: string;
  password: string;
  name: string;
  role: Role;
  email: string;
  imageLink: string;
};
export type User = {
  id: number;
  name: string;
  password: string;
  role: string;
  email: string;
  address: string;
  imageLink: string;
  posts: Array<Post>;
};
export enum Role {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
}

export type Post = {
  map(
    arg0: (post: {
      id: string;
      title: string;
      content: string;
    }) => import("react").JSX.Element
  ): import("react").ReactNode;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  author: Member;
  authorId: number;
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
