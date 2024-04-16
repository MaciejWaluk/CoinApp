export class Cryptocurrency{
    constructor(
        public id: string,
        public name: string,
        public symbol: string,
        public circulatingSupply: number,
        public totalSupply: number,
    ){}
    
}