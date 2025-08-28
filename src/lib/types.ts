type TaskColor = string;

export interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  color?: TaskColor;
}

export interface UpdateTaskDto {
  title?: string;
  color?: TaskColor;
  completed?: boolean;
}

export interface UpdateTaskInput {
  title?: string;
  color?: TaskColor;
  completed?: boolean;
}
