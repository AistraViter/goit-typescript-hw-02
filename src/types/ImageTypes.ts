export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
  width: number | null;
  height: number | null;
}
