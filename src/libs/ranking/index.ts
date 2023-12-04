import { cookie, day, year, leaderBoardId } from "@/constants";
import type { Ranking } from "./types";

(async function getRankings() {
  const res = await fetch(
    `https://adventofcode.com/${year}/leaderboard/private/view/${leaderBoardId}.json`,
    {
      headers: { cookie },
    }
  );
  const data: Ranking = await res.json();
  const members = [];
  for (const member of Object.entries(data.members)) {
    const [, detailsMember] = member;
    let completed = 0;
    for (const dayLevel of Object.entries(detailsMember.completion_day_level)) {
      const [, details] = dayLevel;
      const keys = Object.keys(details);
      keys.length === 2 && completed++;
    }
    members.push({ ...detailsMember, completed });
  }

  console.log("# CLASSEMENT");

  console.log("## MAILLOT JAUNE");
  const maillotsJaune = members.filter(
    (member) => member.completed === Number(day)
  );
  console.log(
    maillotsJaune.map((el) => el.name).sort((a, b) => a.localeCompare(b))
  );

  console.log("## MAILLOT VERT");
  console.log(
    members
      .sort((a, b) => b.local_score - a.local_score)
      .slice(0, 3)
      .map((el) => el.name)
  );

  console.log("# STATS");

  console.log("## ÉTOILES");
  console.log(members.reduce((prev, curr) => prev + curr.stars, 0));
})();
