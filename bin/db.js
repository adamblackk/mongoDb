const mongoose = require('mongoose');

const mongoURIx = 'mongodb+srv://deneme:lM70sJsIEIbGxNk1@cluster0.2cninsm.mongodb.net/deneme?w=majority&retrywrites=true&authsource=admin&minpoolsize=0';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURIx); // Artık ekstra ayarlar gerekmez
        console.log('MongoDB bağlantısı başarılı');
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error);
        process.exit(1); // Bağlantı başarısızsa uygulamayı sonlandır
    }
};

module.exports = connectDB;
