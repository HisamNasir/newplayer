"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaPlay, FaPause } from "react-icons/fa";
import { SpotifyApiContext } from "react-spotify-web-playback";
import { AudioPlayer, RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const CustomAudioPlayer = ({ title, artistName, selectedSong, picture }) => {
  const audioRef = React.useRef();

  return (
    <div className="relative h-[489px] w-[314px] tracking-[0.1em] uppercase">
      <div className="absolute -z-10 bg-white h-full w-full rounded-3xl"></div>
      <div id="TopSide" className="flex">
        <div>
          <h1 className="text-[22px] h-[110px] w-[110px] flex justify-center items-center text-white">
            Music
          </h1>
        </div>
        <div className="relative h-[110px] w-full max-w-[65%] flex flex-col justify-end">
          <div className="p-4 absolute top-0 right-0">
            <Image
              width={12.18}
              height={15.5}
              src={"/Assets/lockicon.svg"}
              alt={""}
            />
          </div>
          <div className="flex w-[85%] overflow-hidden h-full items-end">
            <div className=" text-[14px] w-full px-8 pb-2 over flex flex-col gap-3">
              <h2 className="text-end min-w-max overflow-hidden w-full">
                {title}
              </h2>
              <h2 className="text-end overflow-hidden min-w-max font-semibold italic">
                {artistName}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-[5px]">
        <div id="PlayPauseandSliderSection" className=" relative flex ">
          <p className="text-[14px] absolute z-10 ml-6 mt-2 flex items-start w-1/3">
            $25.00 US
          </p>
          <AudioPlayer
            src={URL.createObjectURL(selectedSong.file)}
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
            ref={audioRef}
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
      <h2 className="text-[13px] text-center mt-1 ">GB63913710211241047</h2>
      <div className="flex justify-center items-center mt-3">
        <div className="h-[268px] w-[268px] object-cover rounded-2xl bg-slate-400 flex">
          {picture && picture.length > 0 && (
            <Image
              width={290}
              height={290}
              src={`data:${picture[0].format};base64,${picture[0].data.toString(
                "base64"
              )}`}
              alt="Album Cover"
              className="object-cover w-full h-full rounded-2xl"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
