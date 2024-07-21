export namespace main {
	
	export class File {
	    name: string;
	    location: string;
	    is_directory: boolean;
	
	    static createFrom(source: any = {}) {
	        return new File(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.location = source["location"];
	        this.is_directory = source["is_directory"];
	    }
	}

}

