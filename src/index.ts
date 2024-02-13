import express from 'express';
import cors from 'cors';
import path from 'path';
import wallet from './services/wallet'
import mint from './services/mint'
import done from './services/done'
import frame from './services/frame'

const app = express();
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: '*'
}));

const port = 8080;

app.use('/', frame);

app.use('/api', wallet); 
app.use('/api', mint); 
app.use('/api', done);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
