const POSTSEASON_TYPE = 3;
const baseUrl = "https://site.api.espn.com/apis/site/v2/sports/football/nfl";
const allowedPositions = new Set(["QB", "RB", "WR", "TE", "K", "HB", "FB"]);

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} for ${url} :: ${text.slice(0, 200)}`);
  }

  return res.json();
}

export async function getNFLPlayoffSkillPlayers(year = 2025) {
  const teamsData = await fetchJson(`${baseUrl}/teams`);
  const allTeams = teamsData?.sports?.[0]?.leagues?.[0]?.teams ?? [];

  const playoffRosters = [];

  for (const teamEntry of allTeams) {
    const teamId = teamEntry.team.id;
    const teamName = teamEntry.team.displayName;

    const scheduleUrl = `${baseUrl}/teams/${teamId}/schedule?season=${year}&seasontype=${POSTSEASON_TYPE}`;
    const scheduleData = await fetchJson(scheduleUrl);

    if (scheduleData?.events?.length > 0) {
      const rosterUrl = `${baseUrl}/teams/${teamId}/roster`;
      const rosterData = await fetchJson(rosterUrl);

      const athletesGroups = rosterData?.athletes ?? [];

      const skillPlayers = athletesGroups.flatMap((group) =>
        (group.items ?? [])
          .filter((player) => allowedPositions.has(player?.position?.abbreviation))
          .map((player) => ({
            name: player.fullName,
            position: player.position.abbreviation,
            team: teamName,
            jersey: player.jersey ?? null,
            weight: player.displayWeight ?? null,
            height: player.displayHeight ?? null,
            college: player.college?.name ?? "N/A",
          }))
      );

      playoffRosters.push(...skillPlayers);
    }
  }

  // de-dupe
  const seen = new Set();
  const unique = [];
  for (const p of playoffRosters) {
    const key = `${p.name}|${p.team}|${p.position}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(p);
    }
  }

  return unique;
}
