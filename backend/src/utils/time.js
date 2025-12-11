export const overlaps = (aStart, aEnd, bStart, bEnd) => (aStart < bEnd && aEnd > bStart);

export const hoursBetween = (s, e) => Math.max(1, Math.ceil((e - s) / (1000 * 60 * 60)));
