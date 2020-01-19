export class QuoteModel {
    // mandatory
    id: number;
    text: string;
    author: string;
    faved: boolean;

    // optional
    category?: string;
    name?: string;

    tags?: string[];

    constructor(id, text, author, faved, category?, name?, tags?) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.faved = faved;
        this.category = category;
        this.name = name;
        this.tags = tags;

        if(tags == undefined)
            this.tags = [];

        /* if(name != undefined) {
            this.complete();
        } */
    }

    setFaved(newfaved) {
        this.faved = newfaved;
    }

    getId() {
        return this.id;
    }

    complete(name: string) {
        this.name = name;
        if(this.text)
            this.text = this.text.replace('-n-', this.name);
        return this;
    }
}

/*
export class QuoteModel {
    // all set functions should be used as decorators (return this)



    public constructor(id:number, text:string, faved:boolean) {
        this.id = id;
        this.text = text;
        this.faved = faved;
    }

    public setCategory(category: string) : QuoteModel {
        this.category = category;
        return this;
    }

    //TODO: create PIPE!
    public setName(name: string) :QuoteModel {

        this.name = name;
        this.text = this.text.replace("-n-", name);
        return this;
    }
}*/