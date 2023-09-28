const {io} =require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Arctic Monkeys'));
bands.addBand(new Band('Black Keys'));
bands.addBand(new Band('Bloc Party'));
bands.addBand(new Band('Muse'));
bands.addBand(new Band('Gorillaz'));
bands.addBand(new Band('Fall Out Boy'));
bands.addBand(new Band('Daft Punk'));
bands.addBand(new Band('alt-J'));
bands.addBand(new Band('Cage The Elephant'));
console.log(bands);
//Mensajes de Sockets
io.on('connection',client =>{
    console.log('Cliente conectado');
    client.emit('active-bands',bands.getBands());

    client.on('disconnect',()=>{
    });
    console.log('Cliente desconectado');
    client.on('mensaje',(payload)=>{
        console.clear();
        console.log('Mensaje',payload);
        io.emit('mensaje',{admin:'Nuevo mensaje'});
    });

    // client.on('emitir-mensaje',(payload)=>{
    //     console.log(payload);
    //     //io.emit('nuevo-mensaje',payload);
    //     client.broadcast.emit('nuevo-mensaje',payload)
    // });
    client.on('vote-band',(payload)=>{
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());

    });
    client.on('add-band',(payload)=>{
        bands.addBand(new Band(payload.name));
        io.emit('active-bands',bands.getBands());

    });
    client.on('delete-band',(payload)=>{
        
       bands.deleteBand(payload.id);
       io.emit('active-bands',bands.getBands());

    });
});
