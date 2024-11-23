export type CardModel = {
  key?: any;
  type: 'new' | 'info';
  title?: string;
  description?: string;
  action?: () => void;
};
