export const site = {
  name: 'Muhammad Ekramah',
  url: 'https://itsekramah.github.io',
  github: 'https://github.com/itsEkramah',
  linkedin: 'https://www.linkedin.com/in/muhammad-ekramah/',
  email: 'its.ekramah@outlook.com',
  booking: 'https://calendly.com/its-ekramah/30min',
  callMinutes: 15,
  cv: '/EKRAMAH_s_CV..pdf',
};
export const articleUrl = (article: {
  id: string;
  data: { category: string };
}) => `/writing/${article.data.category}/${article.id}/`;
export const dateLabel = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
