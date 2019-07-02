import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

let token;

chai.use(chaiHttp);
chai.should();
describe('Property', () => {
    before('generate JWT', (done) => {
        chai.request(app)
            .post('/api/v1/login')
            .send({
                email: 'bonbo@test.com',
                password: 'f5e4xhr43dh4t',
            })
            .end((err, res) => {
                // eslint-disable-next-line prefer-destructuring
                token = res.body.token;
                if (err) return done();
                done();
            });
    });
    describe('Create new advert', () => {
        it('should check if token available', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: 'one bedroom',
                    address: 'kenya, 5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Token required');
                    if (err) return done();
                    done();
                });
        });
        it('should create new ad successfully', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: 'one bedroom',
                    address: 'kenya, 5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('successfully created an advert');
                    if (err) return done();
                    done();
                });
        });
        it('should have a price', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: '',
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: 'one bedroom',
                    address: 'kenya, 5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please fill all the fields');
                    if (err) return done();
                    done();
                });
        });
        it('should contain state where the property is', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: '',
                    city: 'Nairobi',
                    type: 'one bedroom',
                    address: 'kenya, 5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please fill all the fields');
                    if (err) return done();
                    done();
                });
        });
        it('should contain a city', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: '',
                    type: 'one bedroom',
                    address: 'kenya, 5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please fill all the fields');
                    if (err) return done();
                    done();
                });
        });
        it('should contain type of property', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: '',
                    address: 'kenya, 5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please fill all the fields');
                    if (err) return done();
                    done();
                });
        });
        it('should property should have an address', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: 'one bedroom',
                    address: '',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please fill all the fields');
                    if (err) return done();
                    done();
                });
        });
        it('should property should have Valid price', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 't#',
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: 'one bedroom',
                    address: '5th street down',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Price should be a number');
                    if (err) return done();
                    done();
                });
        });
        it('should property should have a valid State', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'K@',
                    city: 'Nairobi',
                    type: 'one bedroom',
                    address: '5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please enter valid State');
                    if (err) return done();
                    done();
                });
        });
        it('should property should have a valid city name', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: 'N@$',
                    type: 'one bedroom',
                    address: '5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please enter valid city');
                    if (err) return done();
                    done();
                });
        });
        it('should property should have a valid type that exists', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: 'one%#%6',
                    address: '5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please enter a valid type of property');
                    if (err) return done();
                    done();
                });
        });
        it('should property should have a valid address', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: 'one bedroom',
                    address: '5th&%$#',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please enter a valid address of property');
                    if (err) return done();
                    done();
                });
        });
    });
});
