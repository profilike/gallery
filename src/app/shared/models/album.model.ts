export class Album{
    constructor(
        public name: string,
        public id?: number,
        public images?: number
    ){}
}

export interface Albums {
    albums: Album[]
}