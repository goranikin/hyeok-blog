"use client";
import PageLayout from "@/components/pageLayout";
import { useState } from "react";

type YoutubeInfo = {
  title: string;
  upload_date: string;
  duration: number;
};

type TranscriptResult = {
  youtube_url: string;
  transcript: string;
};

function formatDate(yyyymmdd: string) {
  if (yyyymmdd.length !== 8) return yyyymmdd;
  return `${yyyymmdd.slice(0, 4)}.${yyyymmdd.slice(4, 6)}.${yyyymmdd.slice(6, 8)}`;
}

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const parts = [];
  if (h > 0) parts.push(`${h}시간`);
  if (m > 0) parts.push(`${m}분`);
  parts.push(`${s}초`);
  return parts.join(" ");
}

export default function ExtractTranscriptPage() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeInfo, setYoutubeInfo] = useState<YoutubeInfo | null>(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [infoError, setInfoError] = useState<string | null>(null);

  const [transcript, setTranscript] = useState<string | null>(null);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [transcriptError, setTranscriptError] = useState<string | null>(null);

  const handleCheckInfo = async () => {
    setLoadingInfo(true);
    setInfoError(null);
    setYoutubeInfo(null);
    setTranscript(null);
    try {
      const res = await fetch(
        `/api/youtube-info?youtube_url=${encodeURIComponent(youtubeUrl)}`,
      );
      if (!res.ok) throw new Error("영상 정보를 불러오지 못했습니다.");
      const data: YoutubeInfo = await res.json();
      setYoutubeInfo(data);
    } catch (e) {
      if (e instanceof Error) {
        setInfoError(e.message);
      } else {
        setInfoError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoadingInfo(false);
    }
  };

  const handleExtractTranscript = async () => {
    setLoadingTranscript(true);
    setTranscriptError(null);
    setTranscript(null);
    try {
      const res = await fetch(
        `/api/extract-transcript?youtube_url=${encodeURIComponent(youtubeUrl)}`,
      );
      if (!res.ok) throw new Error("자막 추출에 실패했습니다.");
      const data: TranscriptResult = await res.json();
      setTranscript(data.transcript);
    } catch (e) {
      if (e instanceof Error) {
        setTranscriptError(e.message);
      } else {
        setTranscriptError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setLoadingTranscript(false);
    }
  };
  return (
    <PageLayout
      title="유튜브 영상 자막 추출"
      description="영어 인터뷰 팟캐스트 대본 추출하려고 만든 페이지"
    >
      <div className="flex flex-col">
        <p className="text-lg mb-10">Model: whisper-large-v3-turbo</p>
        <label htmlFor="youtube-url-input" className="text-xl mb-2">
          유튜브 URL을 입력하세요
        </label>
        <input
          id="youtube-url-input"
          className="border px-3 py-3 rounded"
          type="text"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
        />
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-gray-600 transition-colors"
          onClick={handleCheckInfo}
          disabled={loadingInfo || !youtubeUrl}
        >
          {loadingInfo ? "영상 정보 확인 중..." : "영상 정보 확인"}
        </button>
        {infoError && <p className="text-red-500">{infoError}</p>}
        {youtubeInfo && (
          <div className="border rounded p-3 mt-2 bg-gray-50">
            <div className="p-3">
              <b>제목:</b> {youtubeInfo.title}
            </div>
            <div className="p-3">
              <b>업로드 날짜:</b> {formatDate(youtubeInfo.upload_date)}
            </div>
            <div className="p-3">
              <b>길이:</b> {formatDuration(youtubeInfo.duration)}
            </div>
            <button
              type="button"
              className="bg-green-600 text-white px-4 py-2 rounded mt-4 cursor-pointer hover:bg-green-700 transition-colors"
              onClick={handleExtractTranscript}
              disabled={loadingTranscript}
            >
              {loadingTranscript
                ? "자막 추출 중..."
                : "자막을 추출하시겠습니까?"}
            </button>
            {transcriptError && (
              <p className="text-red-500">{transcriptError}</p>
            )}
            {transcript && (
              <div className="mt-4">
                <h3 className="font-bold mb-2">추출된 자막</h3>
                <pre className="bg-gray-100 p-2 rounded max-h-96 overflow-auto">
                  {transcript}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
