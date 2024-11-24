import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import moment from 'moment';
import { TimeLineModel } from './model.timeline';
import { Card } from '../../shared/ui/components/card/ui.card';
import { PLUGIN_TYPE } from '../../utils/contants';
import { getTranscriptions } from '../../services/api.service';
import Loading from '../../shared/ui/components/loading/ui.loading';

export function TimeLine() {
  const params = useParams();
  const navigate = useNavigate();
  const [transcriptions, setTranscriptions] = useState<TimeLineModel>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { pluginId } = params;

    if (!pluginId) {
      navigate('');
      return;
    }
    try {
      setLoading(true);
      getTranscriptions()
        .then((result: any) => {
          setTranscriptions(result);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params, navigate]);

  return (
    <section className="flex px-4 gap-4 flex-col items-center">
      {loading ? (
        <Loading />
      ) : (
        <>
          {transcriptions?.grouped.map(timeLine => (
            <div key={timeLine.date}>
              <div className="divider font-semibold">{moment(timeLine.date).format('MMMM Do YYYY')}</div>
              <div className="flex px-4 gap-4 flex-wrap">
                {timeLine?.items?.map(content => (
                  <Card
                    key={content.id}
                    id={content.id}
                    type={PLUGIN_TYPE.DETAIL}
                    title={content.title}
                    description={content.summary}
                    tags={content.tags.slice(0, 3)}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
}
