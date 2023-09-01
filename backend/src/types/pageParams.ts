
export default interface PageParams {

  /**
   * Tamanho da pagina
   */
  size: number;
  /**
   * Index da pagina
   */
  page: number;

  /**
   * Chave do item pela qual ordenamento deve ser feito
   */
  sort?: string;

  /**
   * Campo de busca
   */
  search?: string;
}