interface Score {
  id?: number;
  count: number;
  movieId: number;
  userId: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export default Score;