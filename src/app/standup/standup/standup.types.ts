export interface Speaker {
  id?: string;
  name: string;
  projectId: string;
  index: number;
  isAbsent: boolean;
  photoUrl: string;
}

export interface Project {
  id?: string;
  name: string;
  index: number;
}
