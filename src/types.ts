export type Book = {
  title: string;
  authors?: string[];
  imageUrl: string | null;
  key: string;
};

export type RootStackParamList = {
  HomeScreen: undefined;
  BookDetailsScreen: {book: Book};
  FavoritesScreen: undefined;
};
