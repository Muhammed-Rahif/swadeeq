// 'youtube' related onintents

import axios from "axios";
import { getYouTubeSearchApiUrl } from "../../constants/api";
import { htmlDecode } from "../../helpers/string";
import { BrainReply } from "../../types/BrainReply";
import { YouTubeSearchResults } from "../../types/YouTubeSearchResults";

/**
 * To get quran recitation youtube videos; randomly or specific surah.
 * when intent === "youtube.quranReciatation"
 */
export const quranReciatation = async (
  input: BrainReply
): Promise<BrainReply> => {
  const isHaveEntity =
    input.entities.length >= 0 && !Boolean(input.entities[0]);

  const variableRegex = RegExp(`<%[${input.entities[0].option}\\s]+%>`);
  const searchQuery = isHaveEntity
    ? (input.answer as string).replace(
        variableRegex,
        input.entities[0].utteranceText
      )
    : input.utterance;
  const { data: ytSearchResults }: { data: YouTubeSearchResults } =
    await axios.get(
      getYouTubeSearchApiUrl({
        query: searchQuery,
      })
    );

  input.answer = [
    ...ytSearchResults.items.map((item, indx) => {
      const videoData = ytSearchResults.items[indx];
      const videoWidth = videoData.snippet.thumbnails.medium.width;
      const videoHeight = videoData.snippet.thumbnails.medium.height;
      const iframUrl = `https://www.youtube.com/embed/${videoData.id.videoId}`;
      const ytIframe = (
        <>
          <iframe
            className="rounded-lg border max-w-full"
            title={input.entities[0].option}
            width={videoWidth}
            height={videoHeight}
            src={iframUrl}
          ></iframe>
          <p
            className="mt-2"
            style={{ maxWidth: videoData.snippet.thumbnails.medium.width }}
          >
            {htmlDecode(videoData.snippet.title)}
          </p>
        </>
      );

      return ytIframe;
    }),
  ];

  return input;
};

/**
 * To get isalmic ruling yt videos on a spcific topic
 * when intent === "youtube.islamicruling"
 */
export const islamicRuling = async (input: BrainReply): Promise<BrainReply> => {
  input.entities = (input.entities as []).filter(
    ({ entity }) => entity === "subject"
  );
  // if topic is not provided
  if (input.entities.length >= 0 && !Boolean(input.entities[0])) {
    input.answer = "Please enter a valid topic to search for.";
    return input;
  }

  const variableRegex = RegExp(`<%[${input.entities[0].entity}\\s]+%>`);
  const searchQuery = (input.answer as string).replace(
    variableRegex,
    input.entities[0].utteranceText
  );
  const { data: ytSearchResults }: { data: YouTubeSearchResults } =
    await axios.get(
      getYouTubeSearchApiUrl({
        query: searchQuery,
        channel: "assimalhakeem",
      })
    );

  input.answer = [
    searchQuery,
    ...ytSearchResults.items.map((item, indx) => {
      const videoData = ytSearchResults.items[indx];
      const videoWidth = videoData.snippet.thumbnails.medium.width;
      const videoHeight = videoData.snippet.thumbnails.medium.height;
      const iframUrl = `https://www.youtube.com/embed/${videoData.id.videoId}`;
      const ytIframe = (
        <>
          <iframe
            className="rounded-lg border max-w-full"
            title={input.entities[0].option}
            width={videoWidth}
            height={videoHeight}
            src={iframUrl}
          ></iframe>
          <p
            className="mt-2"
            style={{ maxWidth: videoData.snippet.thumbnails.medium.width }}
          >
            {htmlDecode(videoData.snippet.title)}
          </p>
        </>
      );
      return ytIframe;
    }),
  ];

  return input;
};
