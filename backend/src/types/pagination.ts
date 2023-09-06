
interface PPagination<T> {
  content: Array<T>;
  /**
   * Ultima pagina?
   */
  last: boolean;
  totalPages: number;
  totalElements: number,
  /**
   * Tamanho da pagina
   */
  size: number,
  /**
   * Qual a pagina do recurso
   */
  number: number,
  /**
   * Primeira pagina?
   */
  first: boolean,
  /** Quantidade de itens */
  numberOfElements: number,
  /**
   * Se `true`, a pagina esta vazia
   */
  empty: boolean
}


class Pagination<T> implements PPagination<T> {

  #data: Array<T>;
  #number: number;
  #size: number;
  content: Array<T> = [];
  first = true;
  last = true;
  totalElements = 0;
  totalPages = 0;
  numberOfElements = 0;
  empty = true;

  constructor(data: Array<T>, number = 1, size = 12) {

    this.size = size;
    if (data) {
      this.#data = data;
      this.totalPages = Math.ceil(this.#data.length / size);
    } else {
      this.#data = [];
    }
    this.#size = size;
    this.#number = number;
    this.number = number;
    this.totalElements = this.#data.length;
  }

  set number(number: number) {

    if (number <= 0) {
      throw new RangeError('Invalid page index!');
    }
    this.#number = number;
    this.content = this.#data.slice((this.number - 1) * this.size, this.number * this.size);

    this.empty = this.content.length === 0;
    this.first = this.number === 1;
    this.last = this.number === this.totalPages;
    this.numberOfElements = this.content.length;
  }

  get number() {
    return this.#number;
  }

  set size(size: number) {
    if(size <= 0) {
      throw new RangeError('Invalid page size!');
    }

    this.#size = size;
  }

  get size() {
    return this.#size;
  }

}

export default Pagination;