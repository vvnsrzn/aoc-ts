export interface Ranking {
  event: string;
  members: Members;
  owner_id: number;
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
  [key: string]: DayDetail;
}

export interface Stars {
  [key: "1" | "2"]: DayDetail;
}

export interface DayDetail {
  star_index: number;
  get_star_ts: number;
}
