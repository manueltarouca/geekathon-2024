import { FormEvent, useEffect, useState } from 'react';
import { ModalFormModel, ModalModel } from './modal.modal';
import { PluginModel } from '../../../../pages/home/page.home';
import { MODAL_TYPE } from '../../../../utils/contants';

export function PluginModal(props: ModalModel) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([] as PluginModel[]);
  const [formData, setFormData] = useState<ModalFormModel>();

  function onsubmit(event: FormEvent) {
    event.preventDefault();
    // TODO: send data to backend.
    (document.getElementById(MODAL_TYPE.NEW_PLUGIN) as any).close();
    setFormData({
      selectedPluginsIds: [],
      userId: 'none',
    });
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
      } catch (error) {
        console.error('Failed to fetch plugins:', error);
      } finally {
        setIsLoading(false);
      }
      props.setTrigger(false);
    }
  }, [props]);

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
          <form onSubmit={(e: FormEvent) => onsubmit(e)} className="flex flex-col gap-6">
            {!isLoading && (
              <label className="form-control w-full max-w-xs">
                <select
                  className="select select-bordered"
                  value={formData?.selectedPluginsIds[0] ?? ''}
                  onChange={e =>
                    setFormData({
                      selectedPluginsIds: [e.target.value],
                      userId: 'user_id_token',
                    })
                  }
                >
                  <option disabled selected value="">
                    Select a plugin
                  </option>
                  {data?.map((plugin, index) => {
                    return (
                      <option key={`option-plugin-${index}`} value={plugin.id}>
                        {plugin.title}
                      </option>
                    );
                  })}
                </select>
              </label>
            )}
            <button type="submit" className="btn btn-outline">
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
