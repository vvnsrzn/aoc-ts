import ranking from "./1222761.json";

const members: any[] = [];
for (const member of Object.entries(ranking.members)) {
  const [, detailsMember] = member;
  let completed = 0;
  for (const dayLevel of Object.entries(detailsMember.completion_day_level)) {
    const [, details] = dayLevel;

    const keys = Object.keys(details);
    keys.length === 2 && completed++;
  }
  members.push({ ...detailsMember, completed });
}

// Maillot vert
members.sort((a, b) => b.local_score - a.local_score);

// Maillot jaune
members.sort((a, b) => b.completed - a.completed);
