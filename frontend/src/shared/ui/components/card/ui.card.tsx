import { CardModel } from './model.card';
import { FaPlus } from 'react-icons/fa6';

export function Card(props: CardModel) {
  return (
    <div
      className={
        'card w-64 h-48 p-6 bg-base-100 shadow-xl mt-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer'
      }
      onClick={() => {
        props.action && props.action();
      }}
    >
      <div className="card-body flex items-center justify-center">
        {props.type === 'new' ? (
          <>
            <FaPlus size={30} className="font-black"></FaPlus>
          </>
        ) : (
          <h2 className="card-title font-semibold">{props.title}</h2>
        )}
      </div>
    </div>
  );
}
