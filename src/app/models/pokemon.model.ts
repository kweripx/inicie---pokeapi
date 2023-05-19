export class Pokemon {
  name: string;
  description: string;
  type: string[];
  image: string;
  height: number;
  weight: number;
  code: number;
  stats: number[];

  constructor(
    name: string,
    description: string,
    type: string[],
    image: string,
    height: number,
    weight: number,
    code: number,
    stats: number[],
  ) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.image = image;
    this.height = height;
    this.weight = weight;
    this.code = code;
    this.stats = stats;
  }
}
