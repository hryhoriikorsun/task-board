export const SkeletonList = () => {
  return (
    <div className='col-span-12 animate-pulse h-60 bg-slate-300 border-2 rounded-md'>
      <div className='h-9 animate-pulse bg-slate-400 m-1' />
      <div className='h-9 animate-pulse bg-slate-400 m-1' />
      <div className='h-9 animate-pulse bg-slate-400 m-1' />
    </div>
  );
};
