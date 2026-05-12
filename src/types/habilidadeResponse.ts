export type HabilidadeGet = {
  id: number;
  nome: string;
  descricao: string;
  bakugan_id: number;
};

export type HabilidadePost = {
  nome: string;
  descricao: string;
  bakugan_id: number;
};
