const chai = require('chai');

const expect = chai.expect;
const mongoose = require('../index')({}, { database: 'r2test' });

describe('r2mongoose', () => {
  describe('connection', () => {
    it('should connect to mongodb', () => {
      expect(mongoose).to.not.equal(undefined);
      expect(mongoose.db.s.databaseName).to.equal('r2test');
    });
  });
});
