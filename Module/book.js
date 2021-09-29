const  mongoose  = require('mongoose');

mongoose.connect(`${process.env.REACT_APP_SERVER}`);

const BooksSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String
});

const BooksModel = mongoose.model('Book', BooksSchema);

async function addBookHandler(req,res){
    let { title, description, status, email } = req.body;
    await BooksModel.create({
        title,
        description,
        status,
        email
    })

    BooksModel.find({},(error,data) => {
        if(error) {
            console.log('error in getting data',error);
        } else {
            res.send(data);
        }
    })
}


// http://localhost:3001/books
function getBooksHandler(req,res){
    // let emailin = req.query.emailin
    BooksModel.find({},(error,Data)=> {
        if(error) {
            console.log('error in getting data',error)
        } else {
            res.send(Data)
        }
    })
}

function deleteBookHandler(req, res) {
    let {bookID} = req.query;

    BooksModel.deleteOne({ _id: bookID }).then(() => {
        BooksModel.find({}, function (error, data) {
            if (error) {
                console.log('error in getting data', error)
            } else {
                res.send(data)
            }
        })
    })
}



// function seedBookInformation() {
//     const book1 = new BooksModel({
//         title: 'title 1',
//         description: 'description 1',
//         status: 'status 1',
//         email: 'Sammer@gmail.com'
//     })
//     const book2 = new BooksModel({
//         title: 'title 2',
//         description: 'description 2',
//         status: 'status Book 2',
//         email: 'eng.ahmad090@gmail.com'
//     })
//     const book3 = new BooksModel({
//         title: 'title 3',
//         description: 'description 3',
//         status: 'status 3',
//         email: 'khalled@gmail.com'
//     })
//     const book4 = new BooksModel({
//         title: 'title 4',
//         description: 'description 4',
//         status: 'status 4',
//         email: 'Abd20@gmail.com'
//     })
//     const book5 = new BooksModel({
//         title: 'title 5',
//         description: 'description 5',
//         status: 'status 5',
//         email: 'eng.ahmad090@gmail.com'
//     })

//     book1.save();
//     book2.save();
//     book3.save();
//     book4.save();
//     book5.save();
// }

// seedBookInformation();


updateBookHandler = (req, res) => {
    let { title, description, status, email, _id } = req.body;
    BooksModel.findByIdAndUpdate(_id, { title, description, status }, (error, updatedData) => {
        if (error) { 
            console.log('error in updating') 
        } else {
            BooksModel.find({ email },(error, data) => {
                if (error) {
                    console.log('error in getting data', error)
                } else {
                    res.send(data)
                }
            })
        }
    })
}




module.exports = {getBooksHandler , addBookHandler , deleteBookHandler, updateBookHandler};