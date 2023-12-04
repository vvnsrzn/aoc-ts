export interface Ranking {
  owner_id: number;
  event: string;
  members: Members;
}

export interface Members {
  [key: string]: Member;
}

export interface Member {
  completion_day_level: CompletionDayLevel;
  id: number;
  stars: number;
  local_score: number;
  global_score: number;
  last_star_ts: number;
  name: string;
}

export interface CompletionDayLevel {
  [key: Days[number]?]: DayDetail;
}

export interface DayDetail {
  star_index: number;
  get_star_ts: number;
}

type Days =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25";
