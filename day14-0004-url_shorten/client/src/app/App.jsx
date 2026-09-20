import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

const dummyUrls = [
  {
    _id: "1",
    originalUrl:
      "https://www.amazon.in/dp/B0FSKKX685/?_encoding=UTF8&pd_rd_w=arNMZ&content-id=amzn1.sym.668c4a8f-aac9-442e-b19d-bf8d4a5e28e8&pf_rd_p=668c4a8f-aac9-442e-b19d-bf8d4a5e28e8&pf_rd_r=J49A1MK945P1K1ZY5EAK&pd_rd_wg=ytk2l&pd_rd_r=7d1f4082-31b8-4ad3-a44c-75427041b55e&ref_=pd_hp_d_r_btf_unk&th=1",
    shortCode: "IUSdfg",
    clicks: 9,
  },

  {
    _id: "2",
    originalUrl:
      "https://www.amazon.in/dp/B0FSKKX685/?_encoding=UTF8&pd_rd_w=arNMZ&content-id=amzn1.sym.668c4a8f-aac-442e-b19d-bf8d4a5e28e8&pf_rd_p=668c4a8f-aac-442e-b19d-bf8d4a5e28e8&pf_rd_r=J49A1MK945P1K1ZY5EAK&pd_rd_wg=ytk2l&pd_rd_r=7d1f4082-31b8-4ad3-a44c-75427041b55e&ref_=pd_hp_d_r_btf_unk&th=1",
    shortCode: "IUSdfg",
    clicks: 5,
  },

  {
    _id: "3",
    originalUrl:
      "https://www.amazon.in/dp/B0FSKKX685/?_encoding=UTF8&pd_rd_w=arNMZ&content-id=amzn1.sym.668c4a8f-aac-442e-b19d-bf8d4a5e28e8&pf_rd_p=668c4a8f-aac-442e-b19d-bf8d4a5e28e8&pf_rd_r=J49A1MK945P1K1ZY5EAK&pd_rd_wg=ytk2l&pd_rd_r=7d1f4082-31b8-4ad3-a44c-75427041b55e&ref_=pd_hp_d_r_btf_unk&th=1",
    shortCode: "IUSdfg",
    clicks: 3,
  },
];

function App() {
  const [urls, setUrls] = useState(dummyUrls);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);

  async function fetchUrls() {
    const response = await axios.get("http://localhost:5173/api/url");
    const responseData = response.data;
    setUrls(responseData.data.urls);
    console.log(responseData);
  }

  async function createShortUrl() {
    const res = await axios.post("http://localhost:5173/api/url", {
      url: inputValue,
    });

    setCurrentUrl({
      originalUrl: res.data.data.url,
      shortCode: res.data.data.shortCode,
    });

    fetchUrls();
  }

  async function deleteUrl(id) {
    await axios.delete(`http://localhost:5173/api/url/${id}`);
    fetchUrls();
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 px-4 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">

        {/* Header */}
        <div className="text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-600">
            Simple • Fast • Shareable
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            URL Shortener
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Turn long URLs into short, clean and easy-to-share links.
          </p>
        </div>

        {/* Input Section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-800">
              Enter your URL
            </label>

            <p className="mt-1 text-xs text-slate-400">
              Paste your long URL below to create a shortened link.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="https://example.com/your-long-url"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />

            <button
              onClick={createShortUrl}
              className="rounded-xl bg-orange-600 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-orange-700 hover:shadow-md active:scale-[0.98]"
            >
              Shorten URL
            </button>
          </div>
        </div>

        {/* URLs Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Your Short URLs
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage and track all your shortened links.
            </p>
          </div>

          <span className="w-fit rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold text-orange-700">
            {urls.length} Links
          </span>
        </div>

        {/* URL Cards */}
        <div className="flex flex-col gap-4">
          {urls.map((url) => {
            return (
              <div
                key={url._id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg sm:p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                  {/* URL Information */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                        Short URL
                      </span>

                      <a
                        href={`http://localhost:3000/${url.shortCode}`}
                        target="_blank"
                        className="rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-bold text-orange-600 transition hover:bg-orange-100 hover:text-orange-700"
                      >
                        /{url.shortCode}
                      </a>
                    </div>

                    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
                      <p
                        className="truncate text-sm text-slate-500"
                        title={url.originalUrl}
                      >
                        {url.originalUrl}
                      </p>
                    </div>
                  </div>

                  {/* Clicks */}
                  <div className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 lg:w-auto lg:min-w-[130px]">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-orange-600 shadow-sm">
                      ↗
                    </div>

                    <div>
                      <p className="text-lg font-bold leading-none text-slate-900">
                        {url.clicks}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Clicks
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 sm:flex-none">
                      Copy
                    </button>

                    <button
                      onClick={() => deleteUrl(url._id)}
                      className="flex-1 rounded-xl bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 transition-all hover:bg-red-100 sm:flex-none"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}

export default App;

