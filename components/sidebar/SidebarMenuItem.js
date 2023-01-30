export default function SidebarMenuItem({
  text,
  Icon,
  active,
  className,
  onClick,
}) {
  return (
    <div
      className='hoverEffect flex items-center justify-center xl:justify-start text-gray-400 text-lg space-x-3'
      onClick={onClick}
    >
      <Icon className={className} />
      <span
        className={`${
          active && 'font-bold dark:text-gray-100'
        } hidden xl:inline dark:text-gray-400 text-gray-700`}
      >
        {text}
      </span>
    </div>
  );
}
