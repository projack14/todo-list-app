export interface UserType {
  content: string;
  description: string;
  id: string;
  priority: number;
}

// export interface UserEdit extends UserType {
//   priority: number;
// }
export interface completedType {
  isCompleted: boolean;
}
