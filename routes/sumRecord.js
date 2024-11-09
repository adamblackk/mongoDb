var express = require('express');
var router = express.Router();
var MesaiKayit = require('../model/model')

router.get('/sum-minute', async (req, res) => {
    try {
      // Tüm verileri al ve boşlukları temizle
      const veriler = await MesaiKayit.find();
      const temizlenmisVeriler = veriler.map(item => {
        item.name = item.name.trim().toLowerCase(); // Boşlukları temizle ve küçük harfe dönüştür
        return item;
      });
  
      // Gruplama işlemi
      const pipeline = [
        {
          $group: {
            _id: "$name",  // Artık temizlenmiş ve normalize edilmiş veriyi grupla
            toplamCalisma: { $sum: "$calismaDk" }
          }
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            toplamCalisma: 1
          }
        }
      ];
  
      const sonuc = await MesaiKayit.aggregate(pipeline);
      res.json(sonuc);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Sunucu hatası" });
    }
  });


  module.exports = router