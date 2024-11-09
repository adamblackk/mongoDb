const mongoose = require('mongoose');

const mesaiKayitSchema = new mongoose.Schema({
  name: { type: String },
  entry: { type: Date },          // giris -> entry
  exit: { type: Date },           // cikis -> exit
  entryNote: { type: String },    // girisNot -> entryNote
  exitNote: { type: String },     // cikisNot -> exitNote
  workMinutes: { type: Number },  // calismaDk -> workMinutes
  lastAction: { type: Date },     // sonIslem -> lastAction
  isActive: { type: Boolean }
},"mesaiKayit");

mesaiKayit = mongoose.model('mesaiKayit', mesaiKayitSchema,"mesaiKayit");

module.exports = mesaiKayit
