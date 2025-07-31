export interface Post {
  id: number
  title: string
  body: string
}

export interface PostFormValues {
  title: string
  body: string
}

export interface PostFormProps {
  initialValues: PostFormValues
  isEdit?: boolean
}

export interface PostListProps {
  posts: Post[]
}

export interface PostCardProps {
  post: Post
}