const origins = ["left", "right", "top", "bottom"] as const;
export type Origin = typeof origins[number];