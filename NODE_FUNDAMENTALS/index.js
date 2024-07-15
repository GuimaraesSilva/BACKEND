import http from 'http';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;


const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    console.log(req.url);
    if (req.url === '/users'){
        res.end(JSON.stringify([{name: 'Sheila Marlene'},{name: 'Jaqueline Fina'}]))
    }
    if (req.url === '/products'){
        res.end(JSON.stringify([{name: 'Completo'},{name: 'Meia Pensão'}]))
    }

});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

