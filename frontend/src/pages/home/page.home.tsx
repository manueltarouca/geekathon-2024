import { useEffect, useState } from 'react';
import { Card } from '../../shared/ui/components/card/ui.card';
import { PluginModal } from '../../shared/ui/components/modal/ui.plugin.modal';
import { MODAL_TYPE, PLUGIN_TYPE } from '../../utils/contants';
import { useNavigate } from 'react-router';

export type PluginModel = {
  title: string;
  id: string;
};

export function Home() {
  const navigate = useNavigate();
  const [plugins, setPlugins] = useState([] as PluginModel[]);
  const [triggerModal, setTriggerModal] = useState(false);

  useEffect(() => {
    const data: PluginModel[] = [
      {
        title: 'Plugin 1',
        id: 'plugin_1',
      },
    ];
    setPlugins(data);
  }, []);

  const newPlugin = () => {
    (document.getElementById(MODAL_TYPE.NEW_PLUGIN) as any).showModal();
    setTriggerModal(true);
  };

  return (
    <section className="flex px-4 gap-4 flex-wrap">
      <PluginModal
        id={MODAL_TYPE.NEW_PLUGIN}
        title="Activate Plugin"
        trigger={triggerModal}
        setTrigger={setTriggerModal}
        setPlugins={setPlugins}
        plugins={plugins}
      />
      {plugins.map((plugin, index) => {
        return (
          <Card
            key={index}
            title={plugin.title}
            type={PLUGIN_TYPE.INFO}
            action={() => navigate(`tm/` + plugin.id)}
          ></Card>
        );
      })}
      <Card key={'new-plugin-card'} type={PLUGIN_TYPE.NEW} action={newPlugin}></Card>
    </section>
  );
}
