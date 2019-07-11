/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import jwt from '../../utils/helpers/jwt';

let token, wrongUser;

chai.use(chaiHttp);
chai.should();
before('generate JWT for wronng user', () => {
    wrongUser = jwt.newToken({ email: 'testtest@test.com', id: 6 });
});
before('generate token', () => {
    token = jwt.newToken({ email: 'testtest@tes.co', id: 1 });
});
describe('Update advert', () => {
    it('should update advert successfully', (done) => {
        chai.request(app)
            .patch('/api/v1/property/2')
            .send({
                price: 600,
                state: 'Rwanda',
                city: 'Kigali',
                type: 'two bedroom',
                address: '5th street',
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
            .patch('/api/v1/property/2')
            .send({
                price: 600,
                state: 'Rwanda',
                city: 'Kigali',
                type: 'two bedroom',
                address: '5th street',
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
            .patch('/api/v1/property/2')
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
            .patch('/api/v1/property/2')
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
            .patch('/api/v1/property/2')
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
            .patch('/api/v1/property/2')
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
            .patch('/api/v1/property/2')
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
