export class Cryptocurrency{
    constructor(
        public id: number,
        public name: string,
        public symbol: string,
        public circulatingSupply: number,
        public totalSupply: number,
    ){}
    
}