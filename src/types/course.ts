export interface ModuleData {
  id: string;
  title: string;
  description: string;
  videoUploaded: boolean;
  video: File | null;
  videoPreview: string | null;
  duration: string;
}

export interface CourseDataToSave {
  title: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  instructor: string;
  instructorBio?: string;
  modules?: ModuleData[];
  thumbnail?: string;
}

export interface Course extends CourseDataToSave {
  id: string;
  students: number;
}