/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import jwt from '../../utils/helpers/jwt';
import data from '../Mockdata/property';

let toke, wrongUser;

chai.use(chaiHttp);
chai.should();
before('generate JWT', () => {
    wrongUser = jwt.newToken({ email: 'testtest@test.com', id: 3 });
});
before('generate token', () => {
    toke = jwt.newToken({ email: 'testtest@tes.co', id: 1 });
});
before('generate new property', (done) => {
    chai.request(app)
        .post('/api/v1/property')
        .send(data.property1)
        .set('authorization', `Bearer ${toke}`)
        .end((err) => {
            if (err) return done();
            done();
        });
});
describe('update property as sold', () => {
    it('should update specific advert successfully as sold', (done) => {
        chai.request(app)
            .patch('/api/v1/property/1/sold')
            .set('authorization', `Bearer ${toke}`)
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
    it('should check if toke available', (done) => {
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
