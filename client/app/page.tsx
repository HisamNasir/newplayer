"use client";
import React, { useState } from "react";
import axios from "axios";
import { SpotifyApiContext } from "react-spotify-web-playback";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { FaPause, FaPlay } from "react-icons/fa";
import "@/app/globals.css";
import Image from "next/image";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
        {
          headers: {
            Authorization: `Bearer BQALGDs-zpzL1wHnviUbRn3xxuxggKYPVYHuMjfmRXThVa8Dlpo-2RX-7guaxeJp9VrEdKZNyTvMHPfLet9oDV9JArvesK08e-QmoSBxabE7a2BkTDznMt4Jqnb94wdUHke8NHiZbGwWJkjgHaXy6x4BFqnL8K6tlPWesRvvN8m5HKMExVQWMCs2hoxeYbpysCi113OQeePc2COHgyScHmgzPwMX4b4FfDI0psrdp-h1pv9AgQipwaBzV8m9FWl4gsqW2_RcUtATHrZOB435oIzF`,
          },
        }
      );
      setSearchResults(response.data.tracks.items);
    } catch (error) {
      console.error("Error searching for tracks:", error);
    }
  };

  const handlePlayTrack = (previewUrl) => {
    if (previewUrl) {
      setCurrentTrack(previewUrl);
    } else {
      console.error("No preview available for this track");
    }
  };

  return (
    <main className=" bg-gray-900">
      <div className="container flex justify-between mx-auto py-8 ">
        <div className=" text-white">
          <h1 className="text-3xl font-bold mb-4 ">Spotify Search & Play</h1>
          <div className="flex">
            <input
              className="focus:outline-none bg-black border border-green-500 rounded-l px-4 py-2 w-full"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for tracks"
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-r"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <ul className="mt-4 h-1/3 overflow-hidden overflow-y-scroll">
            {searchResults.map((track) => (
              <li
                key={track.id}
                onClick={() => handlePlayTrack(track.preview_url)}
                className={`flex items-center cursor-pointer rounded px-4 py-2 ${
                  track.preview_url ? "hover:bg-black" : "text-gray-500"
                }`}
              >
                {track.album.images.length > 0 && (
                  <Image
                    width={100}
                    height={100}
                    className="w-10 h-10 mr-4"
                    src={track.album.images[0].url}
                    alt={track.name}
                  />
                )}
                <div>
                  <div>{track.name}</div>
                  <div className="text-gray-600">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </div>
                </div>
                {!track.preview_url && (
                  <span className="ml-2">(Preview not available)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        {currentTrack && (
          <div
            className=" relative bg-white h-[489px] w-[314px] tracking-[0.1em] uppercase  rounded-3xl"
            style={{
              clipPath:
                "polygon(34.9% 0, 100% 0, 100% 100%, 0 100%, 0 22.5%, 34.9% 22.5%)",
            }}
          >
            <div className=" h-full w-full">
              <div id="TopSide" className="flex z-50">
                <h1 className="text-[22px] h-[110px] w-[110px] flex justify-center items-center text-white">
                  Music
                </h1>
                <div className="relative h-[110px] w-full max-w-[65%] flex flex-col justify-end">
                  <div className="p-4 absolute top-0 right-0">
                    <Image
                      width={12.18}
                      height={15.5}
                      src={"/Assets/lockicon.svg"}
                      alt={""}
                    />
                  </div>
                  {searchResults.map((track) => {
                    if (track.preview_url === currentTrack) {
                      return (
                        <React.Fragment key={track.id}>
                          <div className="flex w-[85%] overflow-hidden h-full items-end">
                            <div className=" text-[14px] w-full px-8 pb-2 over flex flex-col gap-3">
                              <h2 className="text-end min-w-max overflow-hidden w-full">
                                {track.name}
                              </h2>
                              <h2 className="text-end overflow-hidden min-w-max font-semibold italic">
                                {track.artists
                                  .map((artist) => artist.name)
                                  .join(", ")}
                              </h2>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
              <div className=" flex flex-col gap-[5px]">
                <div id="PlayPauseandSliderSection" className=" relative flex ">
                  <p className="text-[14px] absolute z-10 ml-6 mt-2 flex items-start w-1/3">
                    $25.00 US
                  </p>
                  <AudioPlayer
                    autoPlay
                    src={currentTrack}
                    autoPlayAfterSrcChange={false}
                    showJumpControls={false}
                    customAdditionalControls={[]}
                    customVolumeControls={[]}
                    customIcons={{
                      play: (
                        <FaPlay className="mt-2 mx-auto text-[#990000] z-10 w-5 h-5" />
                      ),
                      pause: (
                        <FaPause className="mt-2 mx-auto text-[#990000] z-10 w-5 h-5" />
                      ),
                    }}
                    layout="stacked-reverse"
                    customProgressBarSection={[RHAP_UI.PROGRESS_BAR]}
                    style={{
                      border: "none",
                      outline: "none",
                      boxShadow: "none",
                      margin: "0",
                      padding: "0",
                      paddingLeft: "22px",
                      paddingRight: "22px",
                    }}
                  />
                </div>
              </div>
              <h2 className="text-[13px] text-center mt-1 ">
                GB63913710211241047
              </h2>
              <div className="flex justify-center items-center mt-3">
                <div className="h-[268px] w-[268px] object-cover rounded-2xl overflow-hidden bg-slate-400 flex">
                  {searchResults.map((track) => {
                    if (track.preview_url === currentTrack) {
                      return (
                        <React.Fragment key={track.id}>
                          {/* / */}
                          {track.album.images.length > 0 && (
                            <Image
                              width={1000}
                              height={1000}
                              className="w-full h-full "
                              src={track.album.images[0].url}
                              alt={track.name}
                            />
                          )}
                        </React.Fragment>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
