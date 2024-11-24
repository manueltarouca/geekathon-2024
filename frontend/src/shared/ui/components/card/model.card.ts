import { PLUGIN_TYPE } from "../../../../utils/contants";

export type CardModel = {
  id?: string;
  key?: any;
  type: PLUGIN_TYPE;
  title?: string;
  description?: string;
  tags?: string[];
  action?: () => void;
};
