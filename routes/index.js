const express = require('express');
const router = express.Router();
const MesaiKayit = require('../model/model'); // Modeli içe aktarın

// Yeni endpoint oluştur
router.get('/toplam-mesai', async (req, res) => {
  try {
    // Tüm kayıtları al ve toplam calismaDk hesapla
    const pipeline = [
      {
        $group: {
          _id: "$name",  // Tüm kayıtları tek bir grupta topla
          toplamCalisma: { $sum: "$calismaDk" } // Tüm calismaDk değerlerini topla
        }
      },
      {
        $project: {
          _id: 0, 
          name:"$_id",                 // _id alanını gizle
          toplamCalisma: 1         // toplamCalisma alanını göster
        }
      }
    ];

    // Pipeline'ı çalıştırın
    const sonuc = await MesaiKayit.aggregate(pipeline);

    res.json(sonuc[0] || { toplamCalisma: 0 }); // Eğer sonuç boşsa 0 döndür
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});



router.get('/veri', async (req, res) => {
  try {
    console.log("girdi")
    const veriler = await MesaiKayit.find(); // Tüm verileri çek
    res.json(veriler); // JSON olarak yanıtla
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});


module.exports = router;
