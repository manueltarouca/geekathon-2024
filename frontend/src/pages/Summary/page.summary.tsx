import { useEffect, useState } from 'react';
import { FaLockOpen } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';

export function Summary() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const { transId } = params;

    if (!transId) {
      navigate(-1);
      return;
    }

    setLoading(true);

    try {
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <div className="flex flex-col h-full">
      {/* Main Layout with Sidebar */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-1/6 p-4 border-r-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex flex-row gap-4 items-center">
                <img
                  className="mask mask-squircle"
                  alt="image_2"
                  height={72}
                  width={72}
                  src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp"
                />
                <div>
                  <h2 className="text-lg font-bold">Speaker 1</h2>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <img
                  className="mask mask-squircle"
                  alt="image_2"
                  height={72}
                  width={72}
                  src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp"
                />
                <div>
                  <h2 className="text-lg font-bold">Speaker 2</h2>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <img
                  className="mask mask-squircle"
                  alt="image_2"
                  height={72}
                  width={72}
                  src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp"
                />
                <div>
                  <h2 className="text-lg font-bold">Speaker 3</h2>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex flex-col flex-grow p-4 gap-4 bg-white">
          {/* Badges and Controls */}
          <section className="flex flex-wrap justify-between w-full gap-4 px-4">
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-lg badge-primary">Cat 1</span>
              <span className="badge badge-lg badge-primary">Cat 2</span>
              <span className="badge badge-lg badge-primary">Cat 3</span>
              <span className="badge badge-lg badge">Cat 4</span>
              <span className="badge badge-lg badge">Cat 5</span>
              <span className="badge badge-lg badge">Cat 6</span>
            </div>
            <div>
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

          {/* Markdown Viewer */}
          <section className="flex flex-grow w-full border rounded-lg shadow-md bg-gray-50 p-4 overflow-auto">
            <div className="prose max-w-full">
              {/* Placeholder for Markdown content */}
              <h1>Markdown Content</h1>
              <p>This is where the markdown content will be rendered dynamically.</p>
              <ul>
                <li>Point 1</li>
                <li>Point 2</li>
                <li>Point 3</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
