import { Link } from 'react-router';
import { PLUGIN_TYPE } from '../../../../utils/contants';
import { CardModel } from './model.card';
import { FaPlus } from 'react-icons/fa6';

export function Card(props: CardModel) {
  const renderCard = (type: PLUGIN_TYPE) => {
    switch (type) {
      case PLUGIN_TYPE.NEW:
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
              <FaPlus size={30} className="font-black"></FaPlus>
            </div>
          </div>
        );
      case PLUGIN_TYPE.INFO:
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
              <h2 className="card-title font-semibold">{props.title}</h2>
            </div>
          </div>
        );
      case PLUGIN_TYPE.DETAIL:
        return (
          <Link to={'dt/'+props.id} className="card bg-base-100 w-96 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <h2 className="card-title items-start p-8">{props.title}</h2>
            <div className="card-body mt-[-20px]">
              <div className="flex h-[195px] overflow-hidden">{props.description}</div>
              <div className="card-actions justify-end mt-2">
                {props.tags?.map((tag, index) => (
                  <div key={`${tag}-${index}`} className="badge badge-outline">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        );
    }
  };

  return <div key={props.title}>{renderCard(props.type)}</div>;
}
