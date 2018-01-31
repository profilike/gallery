export class Photo{
    constructor(
        public name: string,
        public category: number,
        public date: string,
        public caption: string,
        public url: string,
        public id?: number,
        public catName?: string
    ){}
}