export type ModalModel = {
  id: string;
  title: string;
  [key: string]: any;
};

export type ModalFormModel = {
  selectedPluginsIds: string[];
  userId: string;
};
