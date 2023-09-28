const Band = require('./band');
class Bands {
    constructor(){
        this.bands = [];
    }

    addBand(bands = new Band()){
        this.bands.push(bands);
    }

    deleteBand(id = ''){
        this.bands = this.bands.filter(obj=> obj.id != id);
        return this.bands;
    }

    voteBand(id =''){
        this.bands = this.bands.map(obj=>{
            if(obj.id === id) {
                obj.votes++;
                return obj;
                
            } else{
                return obj;
            }
        } );
    }
    getBands(){
        return this.bands;
    }
}

module.exports = Bands;
