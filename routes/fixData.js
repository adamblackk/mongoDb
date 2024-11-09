const express = require('express');
const router = express.Router();
const MesaiKayit = require('../model/model');
const { Types } = require('mongoose');

router.get('/convert-fields-to-english', async (req, res) => {
    try {
      const pipeline = [
        {
          $addFields: {
            entry: "$giris",
            exit: "$cikis",
            entryNote: "$girisNot",
            exitNote: "$cikisNot",
            workMinutes: { $toInt: "$calismaDk" },
            lastAction: "$sonIslem",
            isActive: { $toBool: "$isActive" }
          }
        },
        {
          $project: {
            giris: 0,
            cikis: 0,
            girisNot: 0,
            cikisNot: 0,
            calismaDk: 0,
            sonIslem: 0
          }
        }
      ];
        ///////////  Modell de data da değişti piplina gerek kalamadı
      const sonuc = await MesaiKayit.aggregate(pipeline);     
      res.json(sonuc);
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ error: "Sunucu hatası" });
    }
  });
  
  

router.get('/getData', async (req, res)=>{

var data = await MesaiKayit.find()

res.json(data)

})
  
  
  

module.exports = router;
