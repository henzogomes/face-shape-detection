export type FaceShapeType =
  | "oval"
  | "round"
  | "square"
  | "heart"
  | "diamond"
  | "oblong";

export interface FaceShape {
  type: FaceShapeType;
  description: string;
  shortDescription: string;
  path: string;
}
