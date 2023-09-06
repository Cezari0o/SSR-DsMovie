import { PrismaClient } from '@prisma/client';
import Movie from '../src/types/movie';
import * as fs from 'fs';

const prisma = new PrismaClient;

async function seeder() {

  const rawData = fs.readFileSync('prisma/movie-seed.json');
  const movies: Movie[] = JSON.parse(rawData);

  await prisma.movie.createMany({
    data: movies,
    skipDuplicates: true,
  });

  console.log('Seed completed successfully!');
  console.log('A movie example', movies[0]);
}


seeder()
.then(async () => {
  await prisma.$disconnect();
})
.catch(async (err) => {
  console.error(`Error while seeding:`, err);

  await prisma.$disconnect();
  process.exit(1);
})