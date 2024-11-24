import { useEffect, useState } from 'react';
import { FaLockOpen } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import { getTranscription, updateTranscription } from '../../services/api.service';
import { Transcription } from './modal.summary';
import Markdown from 'react-markdown';
import Loading from '../../shared/ui/components/loading/ui.loading';
import { IoIosAdd } from 'react-icons/io';

export function Summary() {
  const [data, setData] = useState<Transcription>();
  const [loading, setLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const updateTags = (tags: string[]) => {
    const { transId } = params;
    if (!transId) {
      return;
    }

    try {
      updateTranscription(transId, { tags })
        .then(result => {
        })
        .catch(err => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const { transId } = params;

    if (!transId) {
      navigate(-1);
      return;
    }

    setLoading(true);

    try {
      getTranscription(transId)
        .then((result: any) => {
          setData(result.transcription);
        })
        .catch(err => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col h-full">
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Main Layout with Sidebar */}
          <div className="flex flex-1 flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-1/6 p-4 border-r-2 flex-shrink-0">
              <div className="flex flex-col gap-4">
                {Array.from({ length: data?.speakers || 0 }, (_, i) => (
                  <div key={i} className="flex flex-col gap-4 mt-8">
                    <div className="flex flex-row gap-4 items-center">
                      <img
                        className="mask mask-squircle"
                        alt="Speaker Avatar"
                        height={72}
                        width={72}
                        src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp"
                      />
                      <div>
                        <h2 className="text-lg font-bold">Speaker {i + 1}</h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex flex-col flex-grow p-4 gap-4 ">
              {/* Markdown Viewer */}
              <h1 className="text-3xl font-bold">{data?.title}</h1>
              <div role="tablist" className="tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Summary" defaultChecked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                  <section className="flex flex-grow w-full border rounded-lg shadow-md p-4 overflow-auto">
                    <div className="prose max-w-full">
                      <p>{data?.summary}</p>
                    </div>
                  </section>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Formatted" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                  <section className="flex flex-grow w-full border rounded-lg shadow-md p-4 overflow-auto">
                    <div className="prose max-w-full">{<Markdown>{data?.transcription}</Markdown>}</div>
                  </section>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="🥩" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                  <section className="flex flex-grow w-full border rounded-lg shadow-md p-4 overflow-auto">
                    <div className="prose max-w-full">
                      <p>{data?.transcription}</p>
                    </div>
                  </section>
                </div>
              </div>

              {/* Badges and Controls */}
              <section className="flex flex-wrap justify-between items-center w-full gap-4 px-4 relative">
                <div className="flex flex-wrap gap-2">
                  {data?.tags.map((tag, index) => (
                    <div
                      key={tag + index}
                      className="badge badge-lg cursor-pointer badge-primary font-semibold"
                      onClick={() => {
                        const current = data?.tags || [];
                        current.splice(index, 1);
                        setData({ ...data, tags: current });
                        updateTags(current);
                      }}
                    >
                      {tag}{' '}
                      <span className="rotate-45">
                        <IoIosAdd size={20} />
                      </span>
                    </div>
                  ))}
                  {!showInput ? (
                    <div
                      className="badge badge-lg cursor-pointer badge-ghost font-semibold"
                      onClick={() => {
                        setShowInput(true);
                      }}
                    >
                      <IoIosAdd size={20} />
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="input input-primary"
                      placeholder="Add a tag"
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === 'Escape') {
                          // update tags
                          const current = data?.tags || [];
                          current.push(e.currentTarget.value);
                          if (data) {
                            setData({ ...data, tags: current });
                            updateTags(current);
                          }
                          setShowInput(false);
                        }
                      }}
                      onBlur={() => {
                        setShowInput(false);
                      }}
                    />
                  )}
                </div>
                <div className="absolute right-4 top-0 md:static">
                  <label className="swap swap-flip">
                    <input type="checkbox" />
                    <div className="swap-on">
                      <FaLockOpen size={30} />
                    </div>
                    <div className="swap-off">
                      <FaLock size={30} />
                    </div>
                  </label>
                </div>
              </section>
            </main>
          </div>
        </>
      )}
    </div>
  );
}
