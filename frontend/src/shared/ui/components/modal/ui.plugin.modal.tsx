import { FormEvent, useEffect, useState } from 'react';
import { ModalModel } from './modal.modal';
import { PluginModel } from '../../../../pages/home/page.home';
import { MODAL_TYPE } from '../../../../utils/contants';

export function PluginModal(props: ModalModel) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([] as PluginModel[]);
  const [formData, setFormData] = useState<PluginModel[]>();

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    // TODO: send data to backend.
    props.setPlugins(formData as PluginModel[]);
    (document.getElementById(MODAL_TYPE.NEW_PLUGIN) as any).close();
    props.setTrigger(false);
  }

  function selectPlugin(pluginId: string) {
    if (formData) {
      const index = formData.findIndex(item => item.id === pluginId);
      if (index !== -1) {
        formData.splice(index, 1);
      } else {
        formData.push(data.find(item => item.id === pluginId) as PluginModel);
      }
      setFormData([...formData]);
    } else {
      setFormData([data.find(item => item.id === pluginId) as PluginModel]);
    }
  }

  useEffect(() => {
    if (props?.trigger) {
      setIsLoading(true);
      try {
        // TODO: GET ALL PLUGINS
        setData([
          {
            title: 'plugin 1',
            id: 'plugin_1',
          },
          {
            title: 'plugin 2',
            id: 'plugin_2',
          },
          {
            title: 'plugin 3',
            id: 'plugin_3',
          },
          {
            title: 'plugin 4',
            id: 'plugin_4',
          },
          {
            title: 'plugin 5',
            id: 'plugin_5',
          },
          {
            title: 'plugin 6',
            id: 'plugin_6',
          },
        ]);

        setFormData(props.plugins);
      } catch (error) {
        console.error('Failed to fetch plugins:', error);
      } finally {
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line
  }, [props.trigger]);

  return (
    <dialog id={props.id} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <div className="modal-header">
          <div className="py-4">
            <h2 className="text-2xl text-center">{props.title}</h2>
          </div>
        </div>

        <div className="modal-body flex flex-col items-center mt-6">
          <form onSubmit={(e: FormEvent) => onSubmit(e)} className="flex flex-col">
            <div className="flex flex-wrap gap-6">
              {!isLoading && data.length > 0
                ? data.map((value, index) => (
                    <span
                      key={index}
                      className={`badge animate-badge-${index % 3} cursor-pointer ${
                        formData?.find(item => item.id === value.id) ? 'badge-primary' : ''
                      }`}
                      onClick={() => {
                        selectPlugin(value.id);
                      }}
                    >
                      {value.title}
                    </span>
                  ))
                : null}
            </div>
            <button type="submit" className="btn btn-outline mt-8">
              Submit
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
