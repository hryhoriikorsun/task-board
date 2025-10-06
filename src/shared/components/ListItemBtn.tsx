interface ListItemBtnProps {
  value: string;
  isDeletingTask: boolean;
  isStatusChanging: boolean;
  handleActionTask: () => void;
}

export const ListItemBtn = ({
  value,
  isDeletingTask,
  isStatusChanging,
  handleActionTask,
}: ListItemBtnProps) => {
  return (
    <button
      className='font-semibold'
      onClick={handleActionTask}
      disabled={isStatusChanging || isDeletingTask}
    >
      {value}
    </button>
  );
};
