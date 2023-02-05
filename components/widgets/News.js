export default function News({ article }) {
  return (
    <a href={article.url} target='_blank'>
      <div className='flex items-center justify-between px-4 py-2 space-x-2 hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-100'>
        <div className='space-y-.5'>
          <h6 className='text-sm font-bold'>{article.title}</h6>
          <p className="text-xs font-medium text-gray-400">{article.source.name}</p>
        </div>
        <img
          className='rounded-xl'
          src={article.urlToImage}
          alt='article'
          width='70'
        />
      </div>
    </a>
  );
}
