var config   = require('../config/config.js')
  , mongoose = require('../server/db')(config)
  , async    = require('async');

var Crew     = mongoose.model('Crew');
var Location = mongoose.model('Location');

function dropDb(cb) {
  async.each([Crew, Location], function(model, next) {
      console.log('empty table ' + model.modelName);
      model.remove(next);
    },
    function(err) {
      console.log('dropDb completed');
      cb(err);
    });
}

function loadData(cb) {
  async.each([{model: Crew, data: crew_data}, {model: Location, data: loc_data}], function(item, next) {
      console.log('importing data on table ' + item.model.modelName);
     item.model.create(item.data, next);
    },
    function(err) {
      console.log('loading completed');
      cb(err);
    });
}

function run() {
  async.waterfall([ dropDb, loadData ], function() {
    console.log('run completed !');
    mongoose.connection.close();
  });
}

mongoose.connection.once('open', function() {
  console.log('start init db');
  run();
});





var crew_data = [
  { name: "Philip J. Fry",                  title: "Executive Delivery Boy",                         age: 27,    avatar: "fry.jpg",        species: "Human",       origin: "Earth" }
, { name: "Turanga Leela",                  title: "Captain",                                        age: 37,    avatar: "leela.jpg",      species: "Mutant",      origin: "Earth" }
, { name: "Any Wong",                       title: "Intern",                                         age: 33,    avatar: "amy.jpg",        species: "Human",       origin: "Mars" }
, { name: "Bender Bending Rodriguez",       title: "One of the company's most expensive appliances", age: 17,    avatar: "bender.jpg",     species: "Robot",       origin: "Earth" }
, { name: "Dr. John A. Zoidberg",           title: "Staff Doctor",                                   age: 86,    avatar: "zoidberg.jpg",   species: "Decapodian",  origin: "Decapod 10" }
, { name: "Hermes Conrad",                  title: "Bureaucrat",                                     age: 54,    avatar: "hermes.jpg",     species: "Human",       origin: "Earth" }
, { name: "Lord Nibbler",                   title: "unknown",                                        age: 3285,  avatar: "nibbler.jpg",    species: "Nibblonian",  origin: "Eternium, Vergon 6" }
, { name: "Professor Hubert J. Farnsworth", title: "Owner / CEO",                                    age: 210,   avatar: "farnsworth.jpg", species: "Human",       origin: "Earth" }
, { name: "Scruffy Scruffington",           title: "Janitor",                                        age: 55,    avatar: "scruffy.jpg",    species: "Undead",      origin: "Earth" }
];


var loc_data = [
  { name: "Luna Park, Moon",                description: "An amuesment park located on the Moon. The whole park is covered by a giant dome so humans can breathe.",                                danger: "low" }
, { name: "Chapek 9",                       description: "A planet inhabited entirely by human-hating robots who kill humans on sight.",                                                           danger: "high" }
, { name: "Vergon 6",                       description: "A planet that was mined hollow of the dark matter that filled it for fuel, and is on the verge of collapse",                             danger: "high" }
, { name: "Trisol",                         description: "A desolate, desert world, in a trinary star system with liquid-based inhabitants. ",                                                     danger: "medium" }
, { name: "Cannibalon",                     description: "A planet inhabited by, as its name suggests, Cannibals.",                                                                                danger: "high" }
, { name: "Mars University",                description: "Founded in 2636, with several mottos including \"Knowledge Brings Fear\" and \"A Giant Pulsating Mind is a Terrible Thing to Waste\". ", danger: "low" }
, { name: "Tova 9 ",                        description: "This planet hosted the Miss Universe Pageant in 3001.",                                                                                  danger: "low" }
, { name: "Neptune",                        description: "This planet's main inhabitants are Neptunians. It also is the location of Robot Santa and his Death Fortress.",                          danger: "medium" }
, { name: "Osiris 4",                       description: "A desert planet orbiting a binary system. It has a culture similar to that of ancient Egypt",                                            danger: "low" }
, { name: "Omicron Persei 8",               description: "The home world of the warlike Omicronians, the single greatest threat to Earth and the entire Democratic Order of Planets.",             danger: "high" }
, { name: "Earth",                          description: "The home planet of humans, many animals and plants as well as robots.",                                                                  danger: "low" }
, { name: "Planet XXX",                     description: "A scenic beach planet where visitors are required to be completely naked to enter.",                                                     danger: "low" }
, { name: "Antares 3",                      description: "A planet inhabited by the Antarians, whose children work as slaves and do most of the work, except the whipping. ",                      danger: "medium" }
, { name: "Waldorf Asteroid",               description: "A small asteroid with only 2 residents: Mrs. Astor and Hobsy, who live in the mansion. ",                                                danger: "low" }
, { name: "Aldrin's Gulch Town Jail, Moon", description: "The town jail of Aldrin's Gulch, a city on the Moon. ",                                                                                  danger: "low" }
, { name: "Planet Express, Earth",          description: "Located on the west side of Manhattan on 57th Street in New New York.",                                                                  danger: "low" }
, { name: "Pandora",                        description: "A stereoscopic 3-D planet",                                                                                                              danger: "medium" }
, { name: "Amazonia",                       description: "A planet covered in rain forests and lakes. It is inhabited by giant man-hating women.",                                                 danger: "high" }
, { name: "Colgate 8",                      description: "The toothbrush capitol of the world",                                                                                                    danger: "low" }
, { name: "Near Death Star",                description: "An artificial planet designed to keep 160 year old humans out of the way on Earth.",                                                     danger: "medium" }
, { name: "Omega 3",                        description: "A desert planet where last tapes of Star Trek were kept, along with the crew.",                                                          danger: "medium" }
, { name: "Stumbos 4",                      description: "A planet with extremely high gravity",                                                                                                   danger: "medium" }
, { name: "Wormulon",                       description: "Homeworld of the Slurm Worms and is where the Slurm factory is located.",                                                                danger: "low" }
, { name: "Peebles Alpha",                  description: "The planet of gangs, thugs and hustlers, it is controlled by two rival gangs the Blips and the Cruds.",                                  danger: "medium" }
];


Crew.create([
])

Location.create([
])
