/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

let token, wrongUser;
const wrongToken = '654gyujy5ygre';

chai.use(chaiHttp);
chai.should();
describe('Property', () => {
    before('generate JWT', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
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
    before('generate token for wrong user', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                firstname: 'bonbon',
                lastname: 'vic',
                email: 'bonbo@tasty.com',
                phoneNumber: '+254742087558',
                address: 'kenya',
                password: 'f5e4xhr43dh4t',
            })
            .end((err, res) => {
                // eslint-disable-next-line prefer-destructuring
                wrongUser = res.body.token;
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
        it('should check if token is valid', (done) => {
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
                .set('authorization', `Bearer ${wrongToken}`)
                .end((err, res) => {
                    res.should.have.status(403);
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
                    type: 'apartment',
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
        it('should contain an image url', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: 'apartment',
                    address: 'kenya, 5th street',
                    imageUrl: '',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please fill all the fields');
                    if (err) return done();
                    done();
                });
        });
        it('should contain an image url', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: 'apartment',
                    address: 'kenya, 5th street',
                    imageUrl: 'nyr6754b675xi43',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please fill all the fields');
                    if (err) return done();
                    done();
                });
        });
        it('should successfully upload image from locally', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: 'apartment',
                    address: 'kenya, 5th street',
                    imageUrl: '/home/bon/Pictures/Screenshot_from_2019-07-08_13-30-34.png',
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
    });
    describe('Update advert', () => {
        it('should update advert successfully', (done) => {
            chai.request(app)
                .patch('/api/v1/property/1')
                .send({
                    price: 600,
                    state: 'Rwanda',
                    city: 'Kigali',
                    type: 'two bedroom',
                    address: '5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('successfully updated advert');
                    if (err) return done();
                    done();
                });
        });
        it('should update his/her own posts', (done) => {
            chai.request(app)
                .patch('/api/v1/property/1')
                .send({
                    price: 600,
                    state: 'Rwanda',
                    city: 'Kigali',
                    type: 'two bedroom',
                    address: '5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${wrongUser}`)
                .end((err, res) => {
                    res.should.have.status(406);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('None of the ads with such id belongs to you');
                    if (err) return done();
                    done();
                });
        });
        it('should property should have Valid price', (done) => {
            chai.request(app)
                .patch('/api/v1/property/1')
                .send({
                    price: 't#',
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
                .patch('/api/v1/property/1')
                .send({
                    state: 'K@',
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
                .patch('/api/v1/property/1')
                .send({
                    city: 'N@$',
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
                .patch('/api/v1/property/1')
                .send({
                    type: 'one%#%6',
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
                .patch('/api/v1/property/1')
                .send({
                    address: '5th&%$#',
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
    describe('get all adverts', () => {
        it('should get all advert successfully', (done) => {
            chai.request(app)
                .get('/api/v1/property')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('got all properties successfully');
                    if (err) return done();
                    done();
                });
        });
    });
    describe('get specific adverts', () => {
        it('should get specific advert successfully', (done) => {
            chai.request(app)
                .get('/api/v1/property/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('got property successfully');
                    if (err) return done();
                    done();
                });
        });
        it('should find the property with the id', (done) => {
            chai.request(app)
                .get('/api/v1/property/14')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Property with such id does not exists');
                    if (err) return done();
                    done();
                });
        });
    });
    describe('update property as sold', () => {
        it('should update specific advert successfully as sold', (done) => {
            chai.request(app)
                .patch('/api/v1/property/1/sold')
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('sold property successfully');
                    if (err) return done();
                    done();
                });
        });
        it('should update his/her own posts', (done) => {
            chai.request(app)
                .patch('/api/v1/property/1/sold')
                .set('authorization', `Bearer ${wrongUser}`)
                .end((err, res) => {
                    res.should.have.status(406);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('None of the ads with such id belongs to you');
                    if (err) return done();
                    done();
                });
        });
        it('should check if token available', (done) => {
            chai.request(app)
                .patch('/api/v1/property/1/sold')
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Token required');
                    if (err) return done();
                    done();
                });
        });
    });
    describe('Post fraud report property', () => {
        before('generate new property', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: 'apartment',
                    address: 'kenya, 5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err) => {
                    if (err) return done();
                    done();
                });
        });
        it('should create new report successfully', (done) => {
            chai.request(app)
                .post('/api/v1/property/1/flag')
                .send({
                    reason: 'price',
                    description: 'The price is to high for this property',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('successfully created a report');
                    if (err) return done();
                    done();
                });
        });
        it('should have a reason', (done) => {
            chai.request(app)
                .post('/api/v1/property/1/flag')
                .send({
                    reason: '',
                    description: 'The price is to high for this property',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please fill all fields');
                    if (err) return done();
                    done();
                });
        });
        it('should have a description', (done) => {
            chai.request(app)
                .post('/api/v1/property/1/flag')
                .send({
                    reason: 'price',
                    description: '',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please fill all fields');
                    if (err) return done();
                    done();
                });
        });
        it('should find the property with the id', (done) => {
            chai.request(app)
                .post('/api/v1/property/12/flag')
                .send({
                    reason: 'price',
                    description: 'The price is to high for this property',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Property with such id does not exists');
                    if (err) return done();
                    done();
                });
        });
        it('user should be logged in', (done) => {
            chai.request(app)
                .post('/api/v1/property/12/flag')
                .send({
                    reason: 'price',
                    description: 'The price is to high for this property',
                })
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Token required');
                    if (err) return done();
                    done();
                });
        });
    });
    describe('Get specific property', () => {
        before('generate new property', (done) => {
            chai.request(app)
                .post('/api/v1/property')
                .send({
                    price: 400,
                    state: 'Kenya',
                    city: 'Nairobi',
                    type: 'apartment',
                    address: 'kenya, 5th street',
                    imageUrl: 'https://user-images.githubusercontent.com/46062609/60184047-08807800-9830-11e9-913c-cb55d650f858.PNG',
                })
                .set('authorization', `Bearer ${token}`)
                .end((err) => {
                    if (err) return done();
                    done();
                });
        });
        it('should get properties by specific type', (done) => {
            chai.request(app)
                .get('/api/v1/properties?type=apartment')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('got specific type Successful');
                    if (err) return done();
                    done();
                });
        });
        it('property type should exist should', (done) => {
            chai.request(app)
                .get('/api/v1/properties?type=bedroom')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('adverts with this type does not exists');
                    if (err) return done();
                    done();
                });
        });
        it('should have the query', (done) => {
            chai.request(app)
                .get('/api/v1/properties?type=')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Please ensure there is query type made');
                    if (err) return done();
                    done();
                });
        });
    });
    describe('Delete property', () => {
        it('should delete his/her own posts', (done) => {
            chai.request(app)
                .delete('/api/v1/property/1')
                .set('authorization', `Bearer ${wrongUser}`)
                .end((err, res) => {
                    res.should.have.status(406);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('None of the ads with such id belongs to you');
                    if (err) return done();
                    done();
                });
        });
        it('should delete advert successfully', (done) => {
            chai.request(app)
                .delete('/api/v1/property/1')
                .set('authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('delete property successfully');
                    if (err) return done();
                    done();
                });
        });
        it('confirm the advert is deleted', (done) => {
            chai.request(app)
                .get('/api/v1/property/14')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('Property with such id does not exists');
                    if (err) return done();
                    done();
                });
        });
    });
});
