const  mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost:27017/BooksBackend');

const BooksSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String
});

const BooksModel = mongoose.model('Book', BooksSchema);

function seedBookInformation() {
    const book1 = new BooksModel({
        title: 'title 1',
        description: 'description 1',
        status: 'status 1',
        email: 'Sammer@gmail.com'
    })
    const book2 = new BooksModel({
        title: 'title 2',
        description: 'description 2',
        status: 'status Book 2',
        email: 'eng.ahmad090@gmail.com'
    })
    const book3 = new BooksModel({
        title: 'title 3',
        description: 'description 3',
        status: 'status 3',
        email: 'khalled@gmail.com'
    })
    const book4 = new BooksModel({
        title: 'title 4',
        description: 'description 4',
        status: 'status 4',
        email: 'Abd20@gmail.com'
    })
    const book5 = new BooksModel({
        title: 'title 5',
        description: 'description 5',
        status: 'status 5',
        email: 'eng.ahmad090@gmail.com'
    })

    book1.save();
    book2.save();
    book3.save();
    book4.save();
    book5.save();
}

// seedBookInformation();

// http://localhost:3001/books?emailin=
function getBooksHandler(req,res){
    let emailin = req.query.emailin
    BooksModel.find({email:emailin},function(error,Data) {
        if(error) {
            console.log('error in getting data',error)
        } else {
            res.send(Data)
        }
    })
}


module.exports = getBooksHandler;