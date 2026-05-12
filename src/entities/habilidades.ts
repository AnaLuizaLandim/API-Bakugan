export class Habilidades {
  constructor(
    public id: number,
    public nome: string,
    public descricao: string,
    public bakugan_id: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.bakugan_id = bakugan_id;
  }
}
