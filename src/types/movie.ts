export type Screening = {
  screen: string;
  times: string[];
};

export type Movie = {
  title: string;
  poster: string;
  rating: string;
  duration: string;
  genres: string;
  screenings: Screening[];
}; 

export type MovieDatabase = {
  [date: string]: Movie[];
};