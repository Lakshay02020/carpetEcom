// image-utils.ts

export const placeholderImages: string[] = [
  'assests/images/carpet1.jpg',
  'assests/images/carpet2.jpg',
  'assests/images/carpet3.jpg',
  'assests/images/carpet4.png'
];

export function getRandomPlaceholderImage(): string {
  const index = Math.floor(Math.random() * placeholderImages.length);
  console.log('Selected placeholder image index:', index);
  return placeholderImages[index];
}
