// Get analytics for a specific city with type filter
export const getCityChartsData = (
  votes: any[],
  selectedCity: string,
  filter: "all" | "parcel_locker" | "pop" = "all",
) => {
  if (!selectedCity) return null;

  // Filter votes for selected city AND selected locker type
  const cityVotes = votes.filter((v) => {
    if (v.city !== selectedCity) return false;

    const isPop = (v.locker_id || "").substring(0, 3).toUpperCase() === "POP";

    if (filter === "pop" && !isPop) return false;
    if (filter === "parcel_locker" && isPop) return false;

    return true;
  });

  const counts: Record<string, { likes: number; dislikes: number }> = {};
  let totalLikes = 0;
  let totalDislikes = 0;
  const reasonsRight: Record<string, number> = {};
  const reasonsLeft: Record<string, number> = {};

  // Count likes, dislikes, and reasons for each locker
  cityVotes.forEach((vote) => {
    if (!counts[vote.locker_id])
      counts[vote.locker_id] = { likes: 0, dislikes: 0 };

    if (vote.vote_type === "right") {
      counts[vote.locker_id].likes += 1;
      totalLikes += 1;
      if (vote.reason)
        reasonsRight[vote.reason] = (reasonsRight[vote.reason] || 0) + 1;
    }

    if (vote.vote_type === "left") {
      counts[vote.locker_id].dislikes += 1;
      totalDislikes += 1;
      if (vote.reason)
        reasonsLeft[vote.reason] = (reasonsLeft[vote.reason] || 0) + 1;
    }
  });

  // Calculate score (balance) for each locker
  const lockerScores = Object.keys(counts).map((id) => ({
    name: id,
    likes: counts[id].likes,
    dislikes: counts[id].dislikes,
    score: counts[id].likes - counts[id].dislikes,
  }));

  // Get top 5 and bottom 5 lockers by score
  const top = [...lockerScores].sort((a, b) => b.score - a.score).slice(0, 5);
  const flop = [...lockerScores].sort((a, b) => a.score - b.score).slice(0, 5);

  // Prepare data for pie chart
  const pieData = [
    { name: "Likes", value: totalLikes },
    { name: "Dislikes", value: totalDislikes },
  ];

  // Get top 5 reasons for positive and negative votes
  const topReasonsRight = Object.keys(reasonsRight)
    .map((r) => ({ name: r, count: reasonsRight[r] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topReasonsLeft = Object.keys(reasonsLeft)
    .map((r) => ({ name: r, count: reasonsLeft[r] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return { top, flop, pieData, topReasonsRight, topReasonsLeft };
};

// Get analytics for a specific locker
export const getLockerChartsData = (votes: any[], selectedLocker: string) => {
  if (!selectedLocker) return null;

  // Filter votes for selected locker
  const lockerVotes = votes.filter((v) => v.locker_id === selectedLocker);

  let likes = 0;
  let dislikes = 0;
  const reasonsRight: Record<string, number> = {};
  const reasonsLeft: Record<string, number> = {};

  // Count votes and aggregate reasons
  lockerVotes.forEach((vote) => {
    if (vote.vote_type === "right") {
      likes += 1;
      if (vote.reason)
        reasonsRight[vote.reason] = (reasonsRight[vote.reason] || 0) + 1;
    } else {
      dislikes += 1;
      if (vote.reason)
        reasonsLeft[vote.reason] = (reasonsLeft[vote.reason] || 0) + 1;
    }
  });

  // Prepare pie chart data
  const pieData = [
    { name: "Likes", value: likes },
    { name: "Dislikes", value: dislikes },
  ];

  // Get top reasons
  const topReasonsRight = Object.keys(reasonsRight)
    .map((r) => ({ name: r, count: reasonsRight[r] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topReasonsLeft = Object.keys(reasonsLeft)
    .map((r) => ({ name: r, count: reasonsLeft[r] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return { pieData, topReasonsRight, topReasonsLeft };
};
