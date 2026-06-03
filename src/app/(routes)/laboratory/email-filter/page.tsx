"use client";

import PageLayout from "@/components/pageLayout";
import { useMemo, useState } from "react";
import modelsJson from "./models.json";
import {
  type Artifact,
  type EmailInput,
  type Prediction,
  knownSenders,
  predictAll,
} from "./emailModel";

const artifact = modelsJson as unknown as Artifact;

const SAMPLE: EmailInput = {
  subject: "[창업지원단] 2026년 스타트업 액셀러레이션 프로그램 참가 신청 안내 (D-4)",
  body: [
    "안녕하세요. 서울대학교 창업지원단입니다.",
    "",
    "📢 2026년 스타트업 액셀러레이팅 프로그램 참여 기업을 모집합니다.",
    "아이템 검증부터 스케일업까지 창업기업의 전주기 성장을 지원합니다.",
    "",
    "■ 모집기간: 2026년 3월 5일 ~ 4월 15일",
    "■ 신청: https://snubigscaleup.com/",
  ].join("\n"),
  sender: "창업지원단",
  datetime: "2026-04-11T10:14",
  hyperlinkCount: 1,
  fileCount: 0,
};

const EMPTY: EmailInput = {
  subject: "",
  body: "",
  sender: "",
  datetime: "2026-04-11T10:00",
  hyperlinkCount: 0,
  fileCount: 0,
};

function scoreColor(score: number) {
  if (score >= 3.5) return "bg-green-500";
  if (score >= 2.5) return "bg-yellow-500";
  return "bg-gray-400";
}

function Badge({ on, onText, offText }: { on: boolean; onText: string; offText: string }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
        on ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
      }`}
    >
      {on ? onText : offText}
    </span>
  );
}

function SpamBadge({ on, prob }: { on: boolean; prob: number }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
        on ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500"
      }`}
    >
      {on ? "스팸" : "정상"} · {Math.round(prob * 100)}%
    </span>
  );
}

function ResultCard({ p }: { p: Prediction }) {
  return (
    <div className="rounded-xl border p-5 flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-bold">{p.name}</h3>
        <span className="text-sm text-gray-400">{p.code}</span>
      </div>

      <div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold tabular-nums">{p.score.toFixed(2)}</span>
          <span className="text-gray-400 mb-1">/ 5.0</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
          <div
            className={`h-2 rounded-full ${scoreColor(p.score)}`}
            style={{ width: `${(p.score / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge on={p.recommend} onText={`추천 · ${Math.round(p.recommendProb * 100)}%`} offText={`비추천 · ${Math.round(p.recommendProb * 100)}%`} />
        <SpamBadge on={p.spam} prob={p.spamProb} />
      </div>

      {!p.senderKnown && (
        <p className="text-xs text-gray-400">
          ※ 학습 데이터에 없는 보낸 사람입니다 (cold start). 평판 점수는 평균값으로 대체했습니다.
        </p>
      )}
    </div>
  );
}

export default function EmailFilterPage() {
  const [input, setInput] = useState<EmailInput>(SAMPLE);
  const [results, setResults] = useState<Prediction[] | null>(null);

  const senders = useMemo(() => knownSenders(artifact), []);

  const update = (patch: Partial<EmailInput>) => setInput((prev) => ({ ...prev, ...patch }));
  const run = () => setResults(predictAll(input, artifact));

  return (
    <PageLayout
      className="max-w-7xl mx-auto px-6 lg:px-12"
      title="개인화 이메일 필터 (실험실)"
      description="네 명의 라벨러 각각의 취향을 학습한 모델로, 같은 이메일이 사람마다 다르게 평가되는 것을 확인해 보세요."
    >
      <div className="flex flex-col gap-8">
        <div className="rounded-lg border bg-gray-50 p-4 text-sm text-gray-600 leading-relaxed">
          <b>모델</b>: 사람별 feature engineering 모델 (점수 = Ridge 회귀, 추천/스팸 = 로지스틱 회귀).
          임베딩이나 외부 API 없이 브라우저에서 즉시 계산됩니다. 보낸 사람 평판, 제목/본문 길이,
          이모지, 링크 수, 발송 시각, 말머리 주제 등 20개 특징을 사용합니다.
        </div>

        {/* ---------- input form ---------- */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="subject" className="font-semibold">제목</label>
            <input
              id="subject"
              className="border px-3 py-2 rounded"
              value={input.subject}
              onChange={(e) => update({ subject: e.target.value })}
              placeholder="[말머리] 이메일 제목"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="body" className="font-semibold">본문</label>
            <textarea
              id="body"
              className="border px-3 py-2 rounded min-h-40 leading-relaxed"
              value={input.body}
              onChange={(e) => update({ body: e.target.value })}
              placeholder="이메일 본문을 붙여넣으세요"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="sender" className="font-semibold">보낸 사람</label>
              <input
                id="sender"
                list="known-senders"
                className="border px-3 py-2 rounded"
                value={input.sender}
                onChange={(e) => update({ sender: e.target.value })}
                placeholder="예: 창업지원단"
              />
              <datalist id="known-senders">
                {senders.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="datetime" className="font-semibold">발송 시각</label>
              <input
                id="datetime"
                type="datetime-local"
                className="border px-3 py-2 rounded"
                value={input.datetime}
                onChange={(e) => update({ datetime: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="links" className="font-semibold">하이퍼링크 개수</label>
              <input
                id="links"
                type="number"
                min={0}
                className="border px-3 py-2 rounded"
                value={input.hyperlinkCount}
                onChange={(e) => update({ hyperlinkCount: Number(e.target.value) || 0 })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="files" className="font-semibold">첨부파일 개수</label>
              <input
                id="files"
                type="number"
                min={0}
                className="border px-3 py-2 rounded"
                value={input.fileCount}
                onChange={(e) => update({ fileCount: Number(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="bg-gray-900 text-white px-5 py-2 rounded cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={run}
            >
              분석하기
            </button>
            <button
              type="button"
              className="border px-5 py-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => { setInput(SAMPLE); setResults(null); }}
            >
              샘플 채우기
            </button>
            <button
              type="button"
              className="border px-5 py-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => { setInput(EMPTY); setResults(null); }}
            >
              비우기
            </button>
          </div>
        </div>

        {/* ---------- results ---------- */}
        {results && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">사람별 예측 결과</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((p) => (
                <ResultCard key={p.code} p={p} />
              ))}
            </div>
            <p className="text-xs text-gray-400">
              점수는 1~5 척도의 유용성 예측이며, 추천은 점수≥4, 스팸은 점수=1 기준으로 학습된
              별도의 분류기입니다. 같은 메일이라도 사람마다 결과가 다른 것이 핵심입니다.
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
