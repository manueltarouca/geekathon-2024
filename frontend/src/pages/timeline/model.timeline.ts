export type TimeLineContentModel = {
  id: string;
  title: string;
  summary: string;
  speakers: number;
  tags: string[];
  createdAt: string;
};

export type TimeLineModel = {
  grouped: [{ date: string; items: TimeLineContentModel[] }];
};
