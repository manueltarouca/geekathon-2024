import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

export function TimeLine() {
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const { pluginId } = params;

    if (!pluginId) {
      navigate('');
      return;
    }
    console.log(pluginId);
  }, [params, navigate]);
  return (
    <section className="flex px-4 gap-4 flex-wrap">
      <h1>TIMELINE</h1>
    </section>
  );
}
