import slugGenerator from '@/utils/slugGenerator';

function CardMovie({ data, mediaType }) {
  const title = mediaType === 'tv' ? data.name ?? data.original_name : data.title ?? data.original_title;

  const slug = slugGenerator(title);

  return (
    <a href={`/${mediaType}/${data.id}-${slug}`}>
      <image
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        // fallbackSrc="https://res.cloudinary.com/dmgrxm78p/image/upload/v1665148820/poster_not_found.png"
        alt={data.title ?? data.name ?? data.original_name ?? data.original_title}
        width="200"
      />
      <p>{data.title ?? data.name ?? data.original_name ?? data.original_title}</p>
    </a>
  );
}

export default CardMovie;
