import { useBtnsBar } from '../hooks/useBtnsRar';
import { STATUS } from '../types/Status';
import cn from 'classnames';

export const BtnsBar = () => {
  const { filter, hanbleStatus } = useBtnsBar();

  return (
    <div className='col-span-12 flex gap-x-4'>
      {Object.entries(STATUS).map(([key, value]) => {
        return (
          <button
            key={key}
            className={cn({
              'opacity-40': filter === value,
            })}
            onClick={() => hanbleStatus(value)}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};
